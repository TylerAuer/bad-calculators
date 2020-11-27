import express from 'express';
const forceHttps = require('express-force-https');
const session = require('express-session');
const passport = require('passport');
const db = require('./orm/models');
import loadNewPuzzlesIntoDb from './loadNewPuzzlesIntoDb';

const port = process.env.PORT || 4000;

export default function () {
  const app = express();

  // Initialize session store in DB
  const SequelizeStore = require('connect-session-sequelize')(session.Store);
  const sessionStore = new SequelizeStore({
    db: db.sequelize,
    tableName: 'BC_Sessions',
  });

  // Sync sequelize models to DB
  db.sequelize.sync();

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

  // Load puzzles into DB
  loadNewPuzzlesIntoDb();

  app.listen(port, () => {
    console.log(`Server open to connections @ http://localhost:${port}`);
  });

  return app;
}
