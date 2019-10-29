'use strict';
const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
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
  sequelizePaginate.paginate(User);
  return User;
};
