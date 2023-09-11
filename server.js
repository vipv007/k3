const express = require('express');
const app = express();
const port = 3000;

app.get('/', (_req, res) => {
  res.send('Hello, World!');
});

const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = server;
