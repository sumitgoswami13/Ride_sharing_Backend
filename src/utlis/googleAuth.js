const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const jwt = require('jsonwebtoken');

passport.use(new GoogleStrategy({
    clientID: '127872321003-1inuu11n93v9evo8aef7kbkjmlfvmuvu.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    const user = {
      id: profile.id,
      displayName: profile.displayName,
      email: profile.emails[0].value
    };
    console.log(user);
    return done(null, user);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

function generateToken(user) {
  return jwt.sign(user, 'your_jwt_secret', { expiresIn: '1h' }); 
}

module.exports = {
  passport,
  generateToken
};
