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
      /*queryInterface.addColumn(
        'Lands',
        'name', {
          type: Sequelize.STRING,
          allowNull: true
        }
      ),*/
      /*queryInterface.addColumn(
        'Lands',
        'location', {
          type: Sequelize.STRING,
          allowNull: true
        }
      ),
      queryInterface.addColumn(
        'Lands',
        'entity', {
          type: Sequelize.STRING,
          allowNull: true
        }
      ),
      */queryInterface.addColumn(
        'Lands',
        'geom', {
          type: Sequelize.GEOMETRY,
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
      queryInterface.removeColumn('Lands', 'name'),
      queryInterface.removeColumn('Lands', 'location'),
      queryInterface.removeColumn('Lands', 'entity'),
      queryInterface.removeColumn('Lands', 'geom')
    ]);
  }
};
