'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Add the "userGameId" column to the "UserGameBiodata" table
    await queryInterface.addColumn('UserGameBiodata', 'userGameId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      unique: true,
      references: {
        model: 'UserGames',
        key: 'id',
      },
      onDelete: 'CASCADE',
    });

    const userGameBiodatas = await queryInterface.sequelize.query('SELECT * FROM "UserGameBiodata"');

    const updatePromises = userGameBiodatas[0].map(async (userGameBiodata) => {
      const userGame = await queryInterface.sequelize.query(`SELECT id FROM "UserGames" WHERE id = ${userGameBiodata.game_id}`);
      if (userGame[0].length > 0) {
        await queryInterface.sequelize.query(`UPDATE "UserGameBiodata" SET "userGameId" = ${userGame[0][0].id} WHERE id = ${userGameBiodata.id}`);
      }
    });

    await Promise.all(updatePromises);
  },

  async down(queryInterface, Sequelize) {
    // Remove the "userGameId" column from the "UserGameBiodata" table
    await queryInterface.removeColumn('UserGameBiodata', 'userGameId');
  }
};
