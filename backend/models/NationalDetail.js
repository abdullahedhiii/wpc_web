

module.exports = (sequelize, DataTypes) => {
    const NationalDetail = sequelize.define(
      "NationalDetails",
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
        national_id : DataTypes.STRING,
        country: DataTypes.STRING,
        nationality: DataTypes.STRING,
        issued: DataTypes.DATEONLY,
        expiry: DataTypes.DATEONLY,
        review_date: DataTypes.DATEONLY,
        document: DataTypes.STRING,
        current: DataTypes.BOOLEAN,
        remarks : DataTypes.STRING,
      },
      { tableName: "NationalDetails", timestamps: false }
    );
  
    return NationalDetail;
  };
  