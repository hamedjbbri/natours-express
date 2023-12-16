const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const reviewRouter = require('./../routes/reviewRoutes');

// const {
//   getAllReviews,
//   createReview,
// } = require('./../controllers/reviewController');

const {
  uploadTourImages,
  resizeTourImages,
  getDistances,
  getToursWithin,
  getMonthlyPlan,
  getAllTours,
  getTourStats,
  getTour,
  addTour,
  deleteTour,
  updateTour,
  aliasTopTours,
} = require('../controllers/tourController');

const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);
//protect, restrictTo('admin', 'lead-guide'),
router
  .route('/monthly-plan/:year')
  .get(protect, restrictTo('admin', 'lead-guide', 'guide'), getMonthlyPlan);

router.route('/tour-stats').get(getTourStats);

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

router
  .route('/tours-within/:distances/center/:latlng/unit/:unit')
  .get(getToursWithin);

router.route('/distances/:latlng/unit/:unit').get(getDistances);

router
  .route('/')
  .get(getAllTours)
  .post(protect, restrictTo('admin', 'lead-guide'), addTour);

router
  .route('/:id')
  .get(getTour)
  .patch(
    protect,
    uploadTourImages,
    resizeTourImages,
    restrictTo('admin', 'lead-guide'),
    updateTour
  )
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

module.exports = router;
