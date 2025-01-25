'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Designations', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      department_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey:true,
        references: {
          model: 'Departments', 
          key: 'id',
        },
        onDelete: 'CASCADE', 
      },
      designation_name: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('Designations');
  }
}; 