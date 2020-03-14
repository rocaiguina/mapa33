'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('reset_passwords', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      token: {
        type: Sequelize.STRING
      },
      expired: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    .then(function () {
      return queryInterface.addConstraint('reset_passwords', ['user_id'], {
        type: 'foreign key',
        name: 'reset_password_user_fkey_constraint',
        references: {
          table: 'users',
          field: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('reset_passwords');
  }
};