const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'Max group size is required'],
  },
  difficulty: {
    type: String,
    required: [true, 'Difficulty level is required'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price '],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'Summary field cannot be empty'],
  },
  description: {
    type: String,
    required: [true, 'Description field cannot be empty'],
  },
  imageCover: {
    type: String,
    required: [true, 'Image cover is required'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  startDates: [Date],
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
