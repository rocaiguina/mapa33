'use strict';

const sequelizePaginate = require('sequelize-paginate');
const FileStorage = require('../../server/utils/file-storage');

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
    social_photograph: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    land_shape: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    main_attributes: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [],
    },
    other_main_attributes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    main_uses: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [],
    },
    other_main_uses: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    proposed_uses: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [],
    },
    protection_reasons: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [],
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
        if (this.photograph) {
          return FileStorage.getUrl(this.photograph);
        }
        return process.env.SERVER_URL +  '/images/no-land-image.jpg';
      },
      landShapeURL() {
        if (this.land_shape) {
          return FileStorage.getUrl(this.land_shape);
        }
        return '';
      },
      socialPhotographURL() {
        if (this.social_photograph) {
          return FileStorage.getUrl(this.social_photograph);
        }
        return '';
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
