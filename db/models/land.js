'use strict';

const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
  const Land = sequelize.define('Land', {
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    level: {
      type: DataTypes.STRING,       // basic, pledge, conserved
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true
    },
    geom: {
      type: DataTypes.GEOMETRY,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    entity: {
      type: DataTypes.STRING,
      allowNull: true
    },
    year_estab: {
      type: DataTypes.STRING,
      allowNull: true
    },
    use_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    acquisition_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    year_acquisition: {
      type: DataTypes.STRING,
      allowNull: true
    },
    reason_conservation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    photograph: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    coordinates: {
      type: DataTypes.GEOMETRY,
      allowNull: true
    },
    plots_count: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    area_size: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    tableName: 'lands',
    paranoid: true,
  });
  Land.associate = function(models) {
    // associations can be defined here
  };

  // Paginate plugin
  sequelizePaginate.paginate(Land);

  return Land;
};
