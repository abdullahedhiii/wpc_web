'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AnnualPays', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      paygroup_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'PayGroups', 
          key: 'id',
        },
        onDelete: 'CASCADE', 
      },
      annual_pay: {
        type: Sequelize.FLOAT,
        allowNull: false,
      }
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('AnnualPays');
  }
}; 