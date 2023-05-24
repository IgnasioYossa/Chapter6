module.exports = {
  async up(queryInterface, Sequelize) {
    // Add the userGameId column to the UserGameBiodata table
    await queryInterface.addColumn('UserGameBiodata', 'userGameId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'UserGames',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove the userGameId column from the UserGameBiodata table
    await queryInterface.removeColumn('UserGameBiodata', 'userGameId');
  },
};
