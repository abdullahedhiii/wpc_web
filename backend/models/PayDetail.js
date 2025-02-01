module.exports = (sequelize, DataTypes) => {
    const PayDetail = sequelize.define(
      "PayDetail",
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
        group: DataTypes.STRING,
        pay: DataTypes.STRING,
        wedges: DataTypes.STRING,
        payment_type: DataTypes.STRING,
        basic_wedges: DataTypes.STRING,
        min_hours: DataTypes.INTEGER,
        rate: DataTypes.FLOAT,
        tax_code: DataTypes.STRING,
        tax_reference: DataTypes.STRING,
        tax_percentage: DataTypes.FLOAT,
        pay_mode: DataTypes.STRING,
        bank_name: DataTypes.STRING,
        branch_name: DataTypes.STRING,
        account_no: DataTypes.STRING,
        sort_code: DataTypes.STRING,
        currency: DataTypes.STRING,
      },
      { tableName: "PayDetails", timestamps: false }
    );
  
    return PayDetail;
  };
  