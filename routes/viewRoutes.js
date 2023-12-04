const express = require('express');

const { protect } = require('../controllers/authController');

const {
  getTour,
  getOverview,
  login,
} = require('../controllers/viewsController');

const router = express.Router();

router.get('/', getOverview);

router.get('/tour/:slug', protect, getTour);

router.get('/login', login);

module.exports = router;
