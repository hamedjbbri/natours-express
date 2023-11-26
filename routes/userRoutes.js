const express = require('express');

const router = express.Router();

const {
  protect,
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  restrictTo,
} = require('../controllers/authController');

const {
  deleteMe,
  updateMe,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  createUser,
} = require('../controllers/userController');

router.patch('/updateMe', protect, updateMe);
router.delete('/deleteMe', protect, deleteMe);

router.post('/signup', signup);
router.post('/login', login);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

router.patch('/updateMyPassword', protect, updatePassword);

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
