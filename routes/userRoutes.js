const express = require('express');

const router = express.Router();
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');

const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  createUser,
} = require('../controllers/userController');

router.post('/signup', signup);
router.post('/login', login);

router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword', resetPassword);

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
