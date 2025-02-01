module.exports = (sequelize, DataTypes) => {
    const EmployeeOtherDocument = sequelize.define(
      "EmployeeOtherDocument",
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
        type: DataTypes.STRING,
        doc_url: DataTypes.STRING,
      },
      { tableName: "EmployeeOtherDocuments", timestamps: false }
    );
  
    return EmployeeOtherDocument;
  };
  