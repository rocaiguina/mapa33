'use strict';

module.exports = (sequelize, DataTypes) => {
  const SurveyAnswer = sequelize.define('SurveyAnswer', {
    question: DataTypes.STRING,
    answer: DataTypes.STRING,
    points: DataTypes.INTEGER,
    survey_id: DataTypes.INTEGER
  }, {
    paranoid: false,
  });
  SurveyAnswer.associate = function(models) {
    // associations can be defined here
  };
  return SurveyAnswer;
};
