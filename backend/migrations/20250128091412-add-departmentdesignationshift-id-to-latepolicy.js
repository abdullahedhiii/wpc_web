'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('LatePolicies', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      shift_code: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Shifts', 
          key: 'shift_code',
        },
        onDelete: 'CASCADE', 
      },
      period: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      days: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      salary_days: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('LatePolicies');
  }
}; 