const Tour = require('../models/tourModel');

exports.getOverview = async (req, res, next) => {
  //1) get data from collection
  const tours = await Tour.find();

  res.status(200).render('overview', {
    title: 'All tours',
    tours,
  });
};

exports.getTour = (req, res) => {
  res.status(200).render('tour', {
    title: ' tour',
  });
};
