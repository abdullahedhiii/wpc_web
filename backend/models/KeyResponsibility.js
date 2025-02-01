module.exports = (sequelize, DataTypes) => {
    const KeyResponsibility = sequelize.define(
      "KeyResponsibility",
      {    id: {
        type : DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
      },
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
      { tableName: "KeyResponsibilities", timestamps: false }
    );
  
    return KeyResponsibility;
  };
  