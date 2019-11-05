'use strict';

module.exports = (sequelize, DataTypes) => {
  const Survey = sequelize.define('Survey', {
    score: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    user_id: DataTypes.INTEGER
  }, {
    paranoid: true,
  });
  Survey.associate = function(models) {
    // associations can be defined here
    Survey.hasMany(models.SurveyAnswer, { as: 'Answers', foreignKey: 'survey_id' });
  };
  return Survey;
};
