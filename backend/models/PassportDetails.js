module.exports = (sequelize, DataTypes) => {
    const PassportDetails = sequelize.define(
      "PassportDetails",
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
        passport_no: DataTypes.STRING,
        nationality: DataTypes.STRING,
        place: DataTypes.STRING,
        issued_by: DataTypes.STRING,
        issue_date: DataTypes.DATEONLY,
        expiry_date: DataTypes.DATEONLY,
        review_date: DataTypes.DATEONLY,
        picture: DataTypes.STRING,
        current: DataTypes.BOOLEAN,
        remarks: DataTypes.STRING,
      },
      { tableName: "PassportDetails", timestamps: false }
    );
  
    return PassportDetails;
  };
  