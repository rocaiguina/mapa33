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
    password: DataTypes.STRING,
    role: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    paranoid: true
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasOne(models.Survey, { as: 'Survey', foreignKey: 'user_id' });
  };
  sequelizePaginate.paginate(User);
  return User;
};
