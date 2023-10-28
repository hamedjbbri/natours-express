const express = require('express');

const {
  checkBody,
  getAllTours,
  getTour,
  addTour,
  deleteTour,
  updateTour,
} = require('../controllers/tourController');

const router = express.Router();

router.param('id', (req, res, next, val) => {
  console.log(`Tour id is: ${id}`);
  next();
});

router.route('/').get(getAllTours).post(checkBody, addTour);

router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
