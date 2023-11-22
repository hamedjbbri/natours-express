const Review = require('../models/reviewModel');

exports.getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find();

    res.status(200).json({
      success: true,
      results: reviews.length,
      data: {
        reviews,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.createReview = async (req, res, next) => {
  const newReview = await Review.create(req.body);
  res.status(201).json({
    success: true,
    data: newReview,
  });
};
