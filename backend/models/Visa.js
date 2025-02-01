module.exports = (sequelize, DataTypes) => {
    const VisaDetail = sequelize.define(
      "VisaDetail",
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
        visa_no: DataTypes.STRING,
        nationality: DataTypes.STRING,
        country: DataTypes.STRING,
        issued_by: DataTypes.STRING,
        issue_date: DataTypes.DATEONLY,
        expiry_date: DataTypes.DATEONLY,
        review_date: DataTypes.DATEONLY,
        front: DataTypes.STRING,
        back: DataTypes.STRING,
        current: DataTypes.BOOLEAN,
        remarks: DataTypes.STRING,
      },
      { tableName: "VisaDetails", timestamps: false }
    );
  
    return VisaDetail;
  };
  