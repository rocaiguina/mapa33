'use strict';
const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    full_name: {
      type: DataTypes.VIRTUAL,
      set: function(value) {
        const names = value.split(' ');
        this.setDataValue('first_name', names.slice(0, -1).join(' '));
        this.setDataValue('last_name', names.slice(-1).join(' '));
      },
      get: function() {
        let full_name = this.getDataValue('first_name');
        let last_name = this.getDataValue('last_name');
        if (last_name) {
          full_name += ' ' + last_name;
        }
        return full_name;
      }
    },
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
      type: DataTypes.STRING, // administrator, subscriptor
      allowNull: true,
    },
  }, {
    tableName: 'users',
    paranoid: true
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasOne(models.Survey, { as: 'Survey', foreignKey: 'user_id' });
  };
  sequelizePaginate.paginate(User);
  return User;
};
