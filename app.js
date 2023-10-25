const express = require('express');
const morgan = require('morgan');
const app = express();

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
// middleware
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  console.log('test from middelware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// route handlers

// 3) Routes

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// 4) Start Server
const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
