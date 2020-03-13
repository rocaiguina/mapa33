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
        isEmail: true,
      }
    },
    password: DataTypes.STRING,
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    estate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zip_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    advs_by_email: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    advs_by_zip: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    interested_volunteer: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'users',
    paranoid: true
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasOne(models.Survey, { as: 'Survey', foreignKey: 'user_id' });
    User.hasOne(models.ResetPassword, { as:'ResetPassword', foreignKey: 'user_id' });
  };
  sequelizePaginate.paginate(User);
  return User;
};
