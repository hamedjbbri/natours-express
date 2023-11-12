const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

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

  console.log(!user.correctPassword(password, user.password));

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
  console.log(token);

  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'You are not logged in',
    });
  }
  // 2) validate the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);

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
