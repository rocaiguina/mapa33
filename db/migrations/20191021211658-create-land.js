'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Lands', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      level: {
        type: Sequelize.ENUM,
        values: ['basic', 'pledge', 'conserved']
      },
      status: {
        type: Sequelize.ENUM,
        values: ['new', 'denied', 'approved']
      },
      use_type: {
        type: Sequelize.STRING,
        allowNull: true
      },
      acquisition_type: {
        type: Sequelize.STRING,
        allowNull: true
      },
      year_acquisition: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      reason_conservation: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Lands');
  }
};