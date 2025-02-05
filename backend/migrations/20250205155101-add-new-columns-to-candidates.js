module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Candidates', 'interviewDate', {
      type: Sequelize.DATEONLY,
      allowNull: true, // Adjust as needed
    });

    await queryInterface.addColumn('Candidates', 'timeFrom', {
      type: Sequelize.TIME,
      allowNull: true, // Adjust as needed
    });

    await queryInterface.addColumn('Candidates', 'timeTo', {
      type: Sequelize.TIME,
      allowNull: true, // Adjust as needed
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Candidates', 'interviewDate');
    await queryInterface.removeColumn('Candidates', 'timeFrom');
    await queryInterface.removeColumn('Candidates', 'timeTo');
  },
};
