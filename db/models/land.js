'use strict';

module.exports = (sequelize, DataTypes) => {
  const Land = sequelize.define('Land', {
    level: {
      type: DataTypes.ENUM,
      values: ['basic', 'pledge', 'conserved']
    },
    status: {
      type: DataTypes.ENUM,
      values: ['new', 'denied', 'approved']
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
  return Land;
};
