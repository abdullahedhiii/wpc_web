
module.exports = (sequelize, DataTypes) => {
    const EmployeeOtherDetail = sequelize.define(
      "EmployeeOtherDetails",
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
        name : DataTypes.STRING,
        reference: DataTypes.STRING,
        nationality: DataTypes.STRING,
        issued: DataTypes.DATEONLY,
        expiry: DataTypes.DATEONLY,
        review_date: DataTypes.DATEONLY,
        document: DataTypes.STRING,
        current: DataTypes.BOOLEAN,
        remarks : DataTypes.STRING,
      },
      { tableName: "EmployeeOtherDetails", timestamps: false }
    );
  
    return EmployeeOtherDetail;
  };
  