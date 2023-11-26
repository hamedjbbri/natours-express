const User = require('../models/userModel');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};

  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    data: users,
  });
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

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not defined',
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not defined.please use signup instead',
  });
};

// DO not update password with this
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
