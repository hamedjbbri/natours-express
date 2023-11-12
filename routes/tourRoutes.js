const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');

const {
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

router.route('/monthly-plan/:year').get(getMonthlyPlan);

router.route('/tour-stats').get(getTourStats);

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

router.route('/').get(protect, getAllTours).post(addTour);

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

module.exports = router;
