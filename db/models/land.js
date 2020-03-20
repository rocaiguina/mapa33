'use strict';

const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
  const Land = sequelize.define('Land', {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    level: {
      type: DataTypes.STRING, // basic, pledge, conserved
      allowNull: true,
    },
    photograph: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    attributes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    current_situation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    proposed_uses: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    coordinates: {
      type: DataTypes.GEOMETRY,
      allowNull: true,
    },
    geom: {
      type: DataTypes.GEOMETRY,
      allowNull: true,
    },
    metadata: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    plots_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    area_size: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    area_type: {
      type: DataTypes.STRING, // marina, terrestre
      allowNull: true,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    entity: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    use_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    acquisition_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    year_estab: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    year_acquisition: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reason_conservation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ownership: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING, // new, approved, rejected
      allowNull: true,
    },
  }, {
    tableName: 'lands',
    paranoid: true,
    getterMethods: {
      photographURL() {
        return process.env.SERVER_URL + this.photograph;
      }
    }
  });
  Land.associate = function(models) {
    // associations can be defined here
    Land.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
  };

  // Paginate plugin
  sequelizePaginate.paginate(Land);

  return Land;
};
