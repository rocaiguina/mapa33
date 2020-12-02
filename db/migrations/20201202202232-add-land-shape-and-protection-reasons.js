'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.addColumn(
      'lands',
      'land_shape',
      {
        type: Sequelize.TEXT,
        allowNull: true,
      }
    ).then(function() {
      return queryInterface.addColumn(
        'lands',
        'protection-reasons',
        {
          type: Sequelize.ARRAY(Sequelize.STRING),
          allowNull: true,
          defaultValue: [],
        }
      );
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.removeColumn('lands', 'land_shape')
      .then(function() {
        return queryInterface.removeColumn('lands', 'protection-reasons');
      });
  }
};
