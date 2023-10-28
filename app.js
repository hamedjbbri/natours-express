const express = require('express');
const morgan = require('morgan');
const app = express();

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); //log every request in console
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('test from middelware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) Routes

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// 4) Start Server
module.exports = app;
