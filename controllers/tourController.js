const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.json({
      status: 'fail',
      message: 'Name or price not given',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAT: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'failed',
      Message: 'invalid Id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.addTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'created',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'updated',
    data: {
      tour: '<Updated Tour here ...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  const id = req.params.id;
  const index = tours.findIndex((item) => item.id === id);
  const deleted = tours.splice(index, 1);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'created',
        data: {
          tour: newTour,
        },
      });
    }
  );
};
