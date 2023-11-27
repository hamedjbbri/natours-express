const express = require('express');
const { protect, restrictTo } = require('./../controllers/authController');
const router = express.Router({
  mergeParams: true, // allows us to access req.params from parent routes
});

const {
  getReview,
  deleteReview,
  getAllReviews,
  createReview,
  updateReview,
  setTourUserIds,
} = require('../controllers/reviewController');

router.use(protect);

router
  .route('/')
  .get(getAllReviews)
  .post(restrictTo('user'), setTourUserIds, createReview);

router
  .route('/:id')
  .get(getReview)
  .patch(restrictTo('user', 'admin'), updateReview)
  .delete(restrictTo('user', 'admin'), deleteReview);

module.exports = router;
