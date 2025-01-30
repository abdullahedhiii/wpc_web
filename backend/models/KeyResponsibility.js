module.exports = (sequelize, DataTypes) => {
    const KeyResponsibility = sequelize.define(
      "KeyResponsibilities",
      {
        employee_code: {
          type: DataTypes.STRING,
          allowNull: false,
          references: {
            model: "Employees",
            key: "employee_code",
          },
          onDelete: "CASCADE",
        },
        responsibility : DataTypes.STRING,
      },
      { tableName: "JobDetails", timestamps: false }
    );
  
    return KeyResponsibility;
  };
  