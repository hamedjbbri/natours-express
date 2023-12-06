const express = require('express');

const { isLoggedIn } = require('../controllers/authController');

const {
  getTour,
  getOverview,
  login,
} = require('../controllers/viewsController');

const router = express.Router();

router.use(isLoggedIn);

router.get('/', getOverview);
router.get('/tour/:slug', getTour);
router.get('/login', login);

module.exports = router;
