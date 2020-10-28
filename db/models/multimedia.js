'use strict';

const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
  const Multimedia = sequelize.define('Multimedia', {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING, // image, video, youtube, sound, spotify
      allowNull: true,
    },
    utl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    multimediable: {
      type: DataTypes.STRING, // land, etc
      allowNull: true,
    },
    multimediable_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: 'multimedias',
    timestamps: false,
  });
  Multimedia.associate = function(models) {
    // associations can be defined here
  };

  // Paginate plugin
  sequelizePaginate.paginate(Multimedia);

  return Multimedia;
};
