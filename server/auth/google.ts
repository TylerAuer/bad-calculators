require('dotenv').config();
import passport from 'passport';
import handleSignIn from './handleSignIn';
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      handleSignIn(profile);
      return done(null, profile);
    }
  )
);
