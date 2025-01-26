'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BankSortCodes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      bank_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Banks', 
          key: 'id',
        },
        onDelete: 'CASCADE', 
      },
      sort_code: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('BankSortCodes');
  }
}; 