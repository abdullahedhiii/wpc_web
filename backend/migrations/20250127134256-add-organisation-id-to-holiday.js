'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Holidays', {
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
      year: {
          type : Sequelize.INTEGER,
          allowNull:false
      },
      holiday_type : {
         type: Sequelize.STRING,
         allowNull:false,
      },
      start_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      end_date : {
        type :Sequelize.DATEONLY,
        allowNull:false,
      },
      holiday_description : {
        type: Sequelize.STRING,
        allowNull:false,
      },
      day : {
        type: Sequelize.STRING,
        allowNull:false
      }
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('Holidays');
  }
}; 