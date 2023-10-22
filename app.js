const fs = require('fs');

const express = require('express');

const app = express();
const port = 3000;

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'hello from the server', app: 'natours' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
