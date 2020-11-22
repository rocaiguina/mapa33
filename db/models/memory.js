'use strict';

const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
  const Memory = sequelize.define('Memory', {
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    media_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING, // new, approved, rejected
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    land_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: 'memories',
  });
  Memory.associate = function(models) {
    // associations can be defined here
    Memory.belongsTo(models.Land, { as: 'land', foreignKey: 'land_id' });
    Memory.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
    Memory.hasMany(models.Multimedia, {
      foreignKey: 'multimediable_id',
      as: 'multimedias',
      constraints: false,
      scope: {
        multimediable: 'MEMORY',
      },
    });
  };

  // Paginate plugin
  sequelizePaginate.paginate(Memory);

  return Memory;
};
