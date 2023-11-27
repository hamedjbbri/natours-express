const User = require('../models/userModel');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};

  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = async (req, res, next) => {
  if (req.body.password || req.passwordConfirm) {
    return res.status(401).json({
      error: "You can't update your password this way",
    });
  }

  const filteredBody = filterObj(req.body, 'name', 'email');

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    message: 'Successfully updated user!',
    data: {
      user: updatedUser,
    },
  });
};

exports.deleteMe = async (req, res) => {
  // delete the current logged in user
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(200).json({
    success: true,
    data: null,
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not defined. Please use signup instead',
  });
};

// DO not update password with this

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
