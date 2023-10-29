const Tour = require('./../models/tourModel');

exports.getAllTours = async (req, res) => {
  const tours = await Tour.find();

  res.status(200).json({
    status: 'success',
    data: tours,
  });
};

exports.getTour = async (req, res) => {
  const id = req.params.id;
  const tour = await Tour.findById(id);

  res.status(200).json({
    status: 'success',
    data: tour,
  });
};

exports.addTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failure',
      message: 'Invalid data send',
    });
  }
};

exports.updateTour = (req, res) => {};

exports.deleteTour = (req, res) => {};
