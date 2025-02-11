import express from 'express';

const app = express();

app.get('/info', (req, res) => {
  res.json({
    code: 200,
    port: process.argv[2],
  });
});

app.get('/', (req, res) => {
  res.json({
    code: 200,
  });
});

app.listen(process.argv[2], () =>
  console.log(`Server running on port ${process.argv[2]}`),
);
