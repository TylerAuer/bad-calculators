import express from 'express';
import staticRouter from '../routers/static';
const forceHttps = require('express-force-https');
const passport = require('passport');
const session = require('express-session');

export default async function (sessionStore) {
  const app = express();

  // Force HTTPS - Needed for HTTPS on Heroku
  app.use(forceHttps);

  // Parse requests with JSON in the body
  app.use(express.json());

  // Add sessions middleware and connect to DB
  app.use(
    session({
      secret: process.env.COOKIE_SESSIONS_SECRET,
      store: sessionStore,
      secure: false,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      },
    })
  );

  // Set up app as source of static files
  app.use(express.static(__dirname + '/../app'));

  // Load Routers
  app.use('/', staticRouter);

  return app;
}
