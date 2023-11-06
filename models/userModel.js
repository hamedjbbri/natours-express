const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please tell us your name'],
  },
  email: {
    type: String,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid e-mail address'],
    required: [true, 'please provide an email'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'please add a password'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'confirm your password'],
  },
});

const User = mongoose.model('user', userSchema);

module.exports = User;
