'use strict';

module.exports = (sequelize, DataTypes) => {
  const LandLikes = sequelize.define('LandLikes', {
    land_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    liked_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
    },
  }, {
    tableName: 'land_likes',
    paranoid: false,
    createdAt: false,
    updatedAt: false,
  });
  LandLikes.associate = function(models) {
    // associations can be defined here
  };
  return LandLikes;
};
