'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TaxMasters', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      organisation_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Organisations', 
          key: 'id',
        },
        onDelete: 'CASCADE', 
      },
      tax_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      percentage:{
          type: Sequelize.FLOAT,
          allowNull:false,
      },
      reference:{
        type: Sequelize.STRING,
        allowNull:false
      }
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('TaxMasters');
  }
}; 