module.exports = (sequelize, DataTypes) => {
    const COCOtherDetail = sequelize.define(
      "COCOtherDetail",
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
        changeDate: DataTypes.DATEONLY,
        remarks : DataTypes.STRING,
        awareContact : DataTypes.BOOLEAN,
        awareInterview : DataTypes.BOOLEAN
      },
      { tableName: "COCOtherDetails", timestamps: false }
    );
  
    return COCOtherDetail;
  };
  