'use strict';
module.exports = (sequelize, DataTypes) => {
  const ResetPassword = sequelize.define('ResetPassword', {
    user_id: DataTypes.INTEGER,
    token: {
      type: DataTypes.STRING,
      unique: true,
      validate:{
        notEmpty: true
      }
    },
    expired: {
      type:DataTypes.DATE,
      calidate: {
        notEmpty: true
      }
    }
  }, {
    tableName: 'reset_passwords',
    paranoid: false
  });
  ResetPassword.associate = function(models) {
    // associations can be defined here
  };
  return ResetPassword;
};