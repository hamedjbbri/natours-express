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
  getMe,
  deleteMe,
  updateMe,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  createUser,
} = require('../controllers/userController');

router.post('/signup', signup);
router.post('/login', login);
router.patch('/resetPassword/:token', resetPassword);
router.post('/forgotPassword', forgotPassword);

router.use(protect);

router.get('/me', getMe, getUser);
router.patch('/updateMe', updateMe);
router.delete('/deleteMe', deleteMe);
router.patch('/updateMyPassword', updatePassword);

router.use(restrictTo('admin'));

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
