'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGame extends Model {
    static associate(models) {
      UserGame.hasOne(models.UserGameBiodata, {
        foreignKey: 'userGameId',
        onDelete: 'CASCADE',
      });
    }
  }
  UserGame.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserGame',
  });
  return UserGame;
};
