const express = require('express');

const { isLoggedIn, protect } = require('../controllers/authController');

const {
  getAccount,
  updateUserData,
  getTour,
  getOverview,
  login,
} = require('../controllers/viewsController');

const router = express.Router();

router.get('/', isLoggedIn, getOverview);
router.get('/tour/:slug', isLoggedIn, getTour);
router.get('/login', isLoggedIn, login);
router.get('/me', protect, getAccount);

router.post('/submit-user-data', protect, updateUserData);

module.exports = router;
