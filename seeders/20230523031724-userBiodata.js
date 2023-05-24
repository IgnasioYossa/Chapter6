'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const currentDate = new Date();

    
    await queryInterface.bulkInsert('UserGameBiodata', [
      {
        full_name: 'Jono sukamti',
        date_of_birth: '1998-07-01',
        sex: 'Male',
        game_id: '981',
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        full_name: 'Joni sukamto',
        date_of_birth: '1998-07-02',
        sex: 'Male',
        game_id: '982',
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        full_name: 'Jona sukamta',
        date_of_birth: '1998-07-03',
        sex: 'Male',
        game_id: '983',
        createdAt: currentDate,
        updatedAt: currentDate,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Add commands to revert seed here
  },
};


/**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */