const express = require('express');

const {
  getAllTours,
  getTour,
  addTour,
  deleteTour,
  updateTour,
} = require('../controllers/tourController');

const router = express.Router();

router.route('/').get(getAllTours).post(addTour);

router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
