const db = require('../orm/models');
const session = require('express-session');

export default async function () {
  // Initialize session store in DB
  const SequelizeStore = require('connect-session-sequelize')(session.Store);
  const sessionStore = new SequelizeStore({
    db: db.sequelize,
    tableName: 'BC_Sessions',
  });

  // Sync sequelize models to DB
  await db.sequelize.sync({ force: true });

  return sessionStore;
}
