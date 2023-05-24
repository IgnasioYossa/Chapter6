'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserGameBiodata extends Model {
    static associate(models) {
      UserGameBiodata.belongsTo(models.UserGame, {
        foreignKey: 'userGameId',
        onDelete: 'CASCADE',
      });
    }
  }
  UserGameBiodata.init(
    {
      full_name: DataTypes.STRING,
      date_of_birth: DataTypes.DATE,
      sex: DataTypes.STRING,
      game_id: DataTypes.INTEGER,
      userGameId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true,
        references: {
          model: 'UserGames',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'UserGameBiodata',
    }
  );

  return UserGameBiodata;
};
