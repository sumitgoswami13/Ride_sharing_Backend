const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const jwt = require('jsonwebtoken');
const { sendToQueue } = require('./sendMessage');
require('dotenv').config()

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    const user = {
      id: profile.id,
      displayName: profile.displayName,
      email: profile.emails[0].value
    };
    console.log(user);
    //sendToQueue('signup_queue', JSON.stringify({ email: 'user@example.com', userId: '12345' }));
    return done(null, user);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


module.exports = {
  passport
};