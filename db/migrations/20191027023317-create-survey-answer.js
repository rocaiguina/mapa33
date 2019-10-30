'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SurveyAnswers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      question: {
        type: Sequelize.STRING,
        allowNull: false
      },
      answer: {
        type: Sequelize.STRING,
        allowNull: false
      },
      points: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      survey_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    })
    .then(function () {
      return queryInterface.addConstraint('SurveyAnswers', ['survey_id'], {
        type: 'foreign key',
        name: 'survey_answers_fkey_constraint',
        references: {
          table: 'Surveys',
          field: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface
      .dropTable('SurveyAnswers');
  }
};