'use strict';

require('dotenv-safe').config({
  allowEmptyValues: true,
  example: 'config/.env.config',
});
module.exports = {
  development: {
    dialect: 'postgres',
    operatorsAliases: false,
    use_env_variable: 'DATABASE_URL',
  },
  test: {
    username: 'postgres',
    password: 'dbroot',
    database: 'mapa33-test',
    host: '127.0.0.1',
    dialect: 'postgres',
    operatorsAliases: false,
    use_env_variable: 'DATABASE_URL',
    //logging: false,
  },
  production: {
    dialect: 'postgres',
    operatorsAliases: false,
    use_env_variable: 'DATABASE_URL',
    ssl: true,
    dialectOptions: {
      ssl: true,
    },
  },
};
