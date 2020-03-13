'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('lands', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      level: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      photograph: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      coordinates: {
        type: Sequelize.GEOMETRY,
        allowNull: true,
      },
      geom: {
        type: Sequelize.GEOMETRY,
        allowNull: true,
      },
      metadata: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      plots_count: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      area_size: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      entity: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      use_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      acquisition_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      year_stab: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      year_acquisition: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      reason_conservation: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    })
    .then(function () {
      return queryInterface.addConstraint('lands', ['user_id'], {
        type: 'foreign key',
        name: 'land_user_fkey_constraint',
        references: {
          table: 'users',
          field: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      });
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('lands');
  }
};