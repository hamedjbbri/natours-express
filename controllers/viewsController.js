const Tour = require('../models/tourModel');

exports.getOverview = async (req, res, next) => {
  //1) get data from collection
  const tours = await Tour.find();

  res.status(200).render('overview', {
    title: 'All tours',
    tours,
  });
};

exports.getTour = async (req, res, next) => {
  //1) get the data, for the requested tour
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating',
  });

  res.status(200).render('tour', {
    title: tour.name,
    tour,
  });
};

exports.login = (req, res) => {
  res.status(200).render('login', {
    title: 'Login',
  });
};
