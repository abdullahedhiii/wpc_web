module.exports = (sequelize, DataTypes) => {
    const EmployeeOtherDocument = sequelize.define(
      "EmployeeOtherDocuments",
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
        type: DataTypes.STRING,
        doc_url: DataTypes.STRING,
      },
      { tableName: "EmployeeOtherDocuments", timestamps: false }
    );
  
    return EmployeeOtherDocument;
  };
  