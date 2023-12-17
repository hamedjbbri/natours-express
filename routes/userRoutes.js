const express = require('express');
const router = express.Router();

const {
  protect,
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword,
  restrictTo,
} = require('../controllers/authController');

const {
  resizeUserPhoto,
  getMe,
  deleteMe,
  updateMe,
  uploadUserPhoto,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  createUser,
} = require('../controllers/userController');

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.patch('/resetPassword/:token', resetPassword);
router.post('/forgotPassword', forgotPassword);

router.use(protect);

router.get('/me', getMe, getUser);
router.patch('/updateMe', uploadUserPhoto, resizeUserPhoto, updateMe);

router.delete('/deleteMe', deleteMe);
router.patch('/updateMyPassword', updatePassword);

router.use(restrictTo('admin'));

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
