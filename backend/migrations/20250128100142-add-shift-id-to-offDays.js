"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ShiftOffDays", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      shift_code: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Shifts",
          key: "shift_code",
        },
        onDelete: "CASCADE",
      },
      monday: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      tuesday: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      wednesday: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      thursday: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      friday: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      saturday: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      sunday: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ShiftOffDays");
  },
};
