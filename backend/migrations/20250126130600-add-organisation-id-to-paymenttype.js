'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PaymentTypes', {
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
      payment_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rate:{
          type: Sequelize.FLOAT,
          allowNull:false,
      },
      min_hours:{
        type: Sequelize.INTEGER,
        allowNull:false
      }
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('PaymenTypes');
  }
}; 