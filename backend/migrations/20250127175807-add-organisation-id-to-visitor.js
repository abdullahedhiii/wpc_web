'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Visitors', {
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
      name: {
          type : Sequelize.STRING,
          allowNull:false
      },
      designation : {
         type: Sequelize.STRING,
         allowNull:false,
      },
      email : {
        type: Sequelize.STRING,
        allowNull:false,
      },
      contact : {
        type: Sequelize.STRING,
        allowNull:false,
      },
      description : {
        type: Sequelize.STRING,
        allowNull:false,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      time : {
        type :Sequelize.TIME,
        allowNull:false,
      },
      reference : {
        type: Sequelize.STRING,
        allowNull:false,
      }, address : {
        type: Sequelize.STRING,
        allowNull:false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('Visitors');
  }
}; 