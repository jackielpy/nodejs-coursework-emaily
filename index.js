// Environment setup
const PORT = process.env.PORT || 5000;

// App constants
const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');

// App modules
require('./services/passport');

// App setup
mongoose.connect(keys.mongoUri, {
  user: "admin",
  pass: "Pa$$w0rd"
}, function(err, db) {});

const app = express();

require('./routes/authRoutes')(app);

app.get('/', (req, res) => {
  res.send({
    hi: 'there',
    bye: 'buddy'
  });
});

app.listen(PORT);
