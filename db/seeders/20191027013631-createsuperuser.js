'use strict';

const encryptor = require('../../server/utils/encryptor');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('users', [{
      first_name: 'Super',
      last_name: 'Administrator',
      email: 'admin@mapa33.com',
      password: encryptor.encrypt('admin123'),
      role: 'administrator',
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('users', { email: 'admin@mapa33.com' }, {});
  }
};
