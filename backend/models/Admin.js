const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    'Admin',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      company_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'Admins',
      timestamps: true,
      hooks: {
        beforeCreate: async (admin) => {
          if (admin.password) {
            const hashedPassword = await bcrypt.hash(admin.password, 10);
            admin.password = hashedPassword;
          }
        },
        beforeUpdate: async (admin) => {
          if (Admin.changed('password')) {
            const hashedPassword = await bcrypt.hash(admin.password, 10);
            admin.password = hashedPassword;
          }
        },
      },
    }
  );

  return Admin;
};
