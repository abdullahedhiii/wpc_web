// In your migration file (e.g., 20250125105843-add-organisation-id-to-department.js)
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Departments', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      organisation_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey:true,
        references: {
          model: 'Organisations', // Ensure the correct table name for Organisations
          key: 'id',
        },
        onDelete: 'CASCADE', // Optional, in case you want to delete departments when the organization is deleted
      },
      department_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Departments');
  },
};
