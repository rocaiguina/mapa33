'use strict';

require('dotenv-safe').config({
  allowEmptyValues: true,
  example: 'config/.env.config',
});
module.exports = {
  development: {
    dialect: 'postgres',
    use_env_variable: 'DATABASE_URL',
    dialectOptions: {},
  },
  test: {
    username: 'postgres',
    password: 'dbroot',
    database: 'mapa33-test',
    host: '127.0.0.1',
    dialect: 'postgres',
    use_env_variable: 'DATABASE_URL',
    //logging: false,
  },
  production: {
    dialect: 'postgres',
    use_env_variable: 'DATABASE_URL',
    ssl: true,
    dialectOptions: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};
