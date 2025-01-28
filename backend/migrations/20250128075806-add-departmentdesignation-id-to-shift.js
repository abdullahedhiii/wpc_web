'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Shifts', {
      shift_code: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull:false
      },
      department_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Departments', 
          key: 'id',
        },
        onDelete: 'CASCADE', 
      },
      designation_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Designations', 
          key: 'id',
        },
        onDelete: 'CASCADE', 
      },
      work_in: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      work_out: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      break_start: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      break_end: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('Shifts');
  }
}; 