const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
    role: req.body.role,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'Please provide an email and a password',
    });
  }

  const user = await User.findOne({ email }).select('+password');

  // console.log(!user.correctPassword(password, user.password));

  // console.log(user);

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({
      status: 'error',
      message: 'Email or Password is incorrect',
    });
  }

  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
};

exports.protect = async (req, res, next) => {
  // 1) getting token and check if its there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  // console.log(token);

  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'You are not logged in',
    });
  }
  // 2) validate the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // console.log(decoded);

  // 3) Check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return res.status(401).json({
      status: 'error',
      message: 'no fresh user exist',
    });
  }

  // 4) Check if user change password after the token was issue
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return res.sendStatus(401);
  }

  // grant access to protected route
  req.user = freshUser;

  next();
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        message: 'you have no permission for this action',
      });
    }
    next();
  };
};

exports.forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  // console.log(req.body);
  // console.log(user);

  if (!user) {
    return res.status(400).json({
      status: 'error',
      message: 'Email does not exist',
    });
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}. \nIf you didn't make this request, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'A token has been sent to the provided email address',
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save({ validateBeforeSave: false });

    return res.json({
      status: 'fail',
      message: 'There was an error sending your password reset request',
    });
  }
};

exports.resetPassword = async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).send({
      status: 'fail',
      message: 'Password reset token is invalid or expired',
    });
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetExpires = undefined;
  user.passwordResetToken = undefined;

  await user.save();

  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
  });
};
