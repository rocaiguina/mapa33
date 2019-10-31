'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface
      .addColumn('Lands', 'year_estab', {
        type: Sequelize.STRING,
        allowNull: true
      })
      .then(function () {
        return queryInterface.changeColumn('Lands', 'year_acquisition', {
          type: Sequelize.STRING,
          allowNull: true
        });
      })
      .then(function () {
        return queryInterface.changeColumn('Lands', 'status', {
          type: Sequelize.STRING,
          allowNull: true
        });
      })
      .then(function () {
        return queryInterface.changeColumn('Lands', 'createdAt', {
          type: Sequelize.DATE,
          allowNull: true
        });
      })
      .then(function () {
        return queryInterface.changeColumn('Lands', 'updatedAt', {
          type: Sequelize.DATE,
          allowNull: true
        });
      });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
