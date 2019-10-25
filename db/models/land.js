'use strict';

const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
  const Land = sequelize.define('Land', {
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    level: {
      type: DataTypes.ENUM,
      values: ['basic', 'pledge', 'conserved']
    },
    status: {
      type: DataTypes.ENUM,
      values: ['new', 'denied', 'approved']
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
    use_type: DataTypes.STRING,
    acquisition_type: DataTypes.STRING,
    year_acquisition: DataTypes.INTEGER,
    reason_conservation: DataTypes.STRING
  }, {
    paranoid: true
  });
  Land.associate = function(models) {
    // associations can be defined here
  };

  // Paginate plugin
  sequelizePaginate.paginate(Land);

  return Land;
};
