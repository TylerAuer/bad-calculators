import express from 'express';
import path from 'path';
import appRouter from '../routers/app';
import authRouter from '../routers/auth';
import levelRouter from '../routers/level';
import logRouter from '../routers/log';
import puzzleRouter from '../routers/puzzle';
import statsRouter from '../routers/stats';
const forceHttps = require('express-force-https');
const session = require('express-session');
const passport = require('passport');

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

  // Initialize Passport JS to handle Auth
  app.use(passport.initialize());
  app.use(passport.session());

  // Set up app as source of static files
  app.use(express.static(path.resolve(__dirname + '/../../app')));

  // Load Routers
  app.use('/', appRouter);
  app.use('/auth', authRouter);
  app.use('/level', levelRouter);
  app.use('/log', logRouter);
  app.use('/puzzle', puzzleRouter);
  app.use('/stats', statsRouter);

  return app;
}
