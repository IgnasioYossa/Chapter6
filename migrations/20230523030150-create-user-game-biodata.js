'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserGameBiodata', {
      id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: false,
        type: Sequelize.INTEGER
      },
      full_name: {
        type: Sequelize.STRING
      },
      date_of_birth: {
        type: Sequelize.DATE
      },
      sex: {
        type: Sequelize.STRING
      },
      game_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserGameBiodata');
  }
};
