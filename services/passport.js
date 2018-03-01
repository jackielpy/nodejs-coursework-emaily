const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('Users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({
        googleId: profile.id
      })
      .then(existingUser => {
        if (existingUser) {
          // User exist, no db action needed
          done(null, existingUser);
        } else {
          // New user, create db record
          new User({
            googleId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName
          }).save().then(user => done(null, user));
        }
      })
  })
);
