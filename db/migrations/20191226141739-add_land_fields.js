'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return Promise.all([
      queryInterface.addColumn(
        'lands',
        'photograph', {
          type: Sequelize.TEXT,
          allowNull: true
        }
      ),
      queryInterface.addColumn(
        'lands',
        'coordinates', {
          type: Sequelize.GEOMETRY,
          allowNull: true
        }
      ),
      queryInterface.addColumn(
        'lands',
        'plots_count', {
          type: Sequelize.INTEGER,
          allowNull: true
        }
      ),
      queryInterface.addColumn(
        'lands',
        'area_size', {
          type: Sequelize.DOUBLE,
          allowNull: true
        }
      )
    ]);    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return Promise.all([
      queryInterface.removeColumn('lands', 'photograph'),
      queryInterface.removeColumn('lands', 'coordinates'),
      queryInterface.removeColumn('lands', 'plots_count'),
      queryInterface.removeColumn('lands', 'area_size')
    ]);
  }
};
