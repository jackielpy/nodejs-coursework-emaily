// Environment setup
const PORT = process.env.PORT || 5000;

// App constants
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

// Model Classes
require('./models/User');

// App modules
require('./services/passport');

// DB connection
mongoose.connect(keys.mongoUri, {
  user: keys.mongoUser,
  pass: keys.mongoPassword
}, function(err, db) {
  console.log(err)
});

const app = express();

// Cookie and session setup
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milisecond
  keys: [keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());

// Include routes
require('./routes/authRoutes')(app);

app.get('/', (req, res) => {
  res.send({
    hi: 'there',
    bye: 'buddy'
  });
});

app.listen(PORT);
