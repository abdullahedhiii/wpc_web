module.exports = (sequelize, DataTypes) => {
    const PayStructure = sequelize.define(
      "PayStructure",
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
        dearnessAllowance: DataTypes.BOOLEAN,
        houseRentAllowance: DataTypes.BOOLEAN,
        conveyanceAllowance: DataTypes.BOOLEAN,
        performanceAllowance: DataTypes.BOOLEAN,
        monthlyFixedAllowance: DataTypes.BOOLEAN,
        niDeduction: DataTypes.BOOLEAN,
        incomeTaxDeduction: DataTypes.BOOLEAN,
        incomeTaxCess: DataTypes.BOOLEAN,
        esi: DataTypes.BOOLEAN,
        profTax: DataTypes.BOOLEAN,
      },
      { tableName: "PayStructures", timestamps: false }
    );
  
    return PayStructure;
  };
  