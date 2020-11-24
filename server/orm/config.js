module.exports = {
  development: {
    username: 'tylerauer',
    password: null,
    database: 'fruit',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false,
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    port: process.env.POSTGRES_PORT,
    host: process.env.DATABASE_URL || 'postgres',
    dialect: 'postgres',
    operatorsAliases: 0,
    logging: false,
  },
};
