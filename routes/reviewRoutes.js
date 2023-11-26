const express = require('express');
const { protect, restrictTo } = require('./../controllers/authController');
const router = express.Router({
  mergeParams: true, // allows us to access req.params from parent routes
});

const {
  deleteReview,
  getAllReviews,
  createReview,
  updateReview,
  setTourUserIds,
} = require('../controllers/reviewController');

router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), setTourUserIds, createReview);

router.route('/:id').patch(updateReview).delete(deleteReview);

module.exports = router;
