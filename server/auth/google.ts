require('dotenv').config();
import passport from 'passport';
import handleSignIn from './handleSignIn';
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

console.log('env. var. PORT from server.ts is:', process.env.PORT, '.');
console.log(
  'GOOGLE_CLIENT_ID TRIMMED',
  process.env.GOOGLE_CLIENT_ID?.substring(0, 3),
  '.'
);

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
