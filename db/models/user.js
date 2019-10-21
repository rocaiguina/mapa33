'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    password: DataTypes.STRING
  }, {
    paranoid: true
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
