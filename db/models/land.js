'use strict';

const sequelizePaginate = require('sequelize-paginate');
const Numeral = require('numeral');
const FileStorage = require('../../src/utils/file-storage');
const SequelizeSlugify = require('sequelize-slugify');

module.exports = (sequelize, DataTypes) => {
  const Land = sequelize.define('Land', {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
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
      defaultValue: {},
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
    photographURL: {
      type: DataTypes.VIRTUAL(DataTypes.STRING, ['photograph']),
      get: function() {
        if (this.get('photograph')) {
          return FileStorage.getUrl(this.get('photograph'));
        }
        return process.env.SERVER_URL +  '/images/no-land-image.jpg';
      }
    },
    landShapeURL: {
      type: DataTypes.VIRTUAL(DataTypes.STRING, ['land_shape']),
      get: function() {
        if (this.get('land_shape')) {
          return FileStorage.getUrl(this.get('land_shape'));
        }
        return process.env.SERVER_URL +  '/images/no-land-image.jpg';
      }
    },
    socialPhotographURL: {
      type: DataTypes.VIRTUAL(DataTypes.STRING, ['social_photograph']),
      get: function() {
        if (this.get('social_photograph')) {
          return FileStorage.getUrl(this.get('social_photograph'));
        }
        return process.env.SERVER_URL +  '/images/no-land-image.jpg';
      }
    },
    humanCoordinates: {
      type: DataTypes.VIRTUAL(DataTypes.STRING, ['coordinates']),
      get: function() {
        var coordinates = this.get('coordinates');
        if (coordinates && coordinates.coordinates) {
          return `${Numeral(coordinates.coordinates[0]).format('0,0.00')},${Numeral(coordinates.coordinates[1]).format('0,0.00')}`;
        }
        return '';
      }
    }
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
        return process.env.SERVER_URL +  '/images/no-land-image.jpg';
      },
      socialPhotographURL() {
        if (this.social_photograph) {
          return FileStorage.getUrl(this.social_photograph);
        }
        return process.env.SERVER_URL +  '/images/no-land-image.jpg';
      },
      humanCoordinates() {
        if (this.coordinates && this.coordinates.coordinates) {
          return `${Numeral(this.coordinates.coordinates[0]).format('0,0.00')},${Numeral(this.coordinates.coordinates[1]).format('0,0.00')}`;
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

  SequelizeSlugify.slugifyModel(Land, {
    source: ['id', 'name'],
    suffixSource: ['id'],
  });

  return Land;
};
