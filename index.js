// Environment setup
const PORT = process.env.PORT || 5000;

// App constants
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send({
    hi: 'there',
    bye: 'buddy'
  });
});

app.listen(PORT);
