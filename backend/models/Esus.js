
module.exports = (sequelize, DataTypes) => {
    const EsusDetail = sequelize.define(
      "EsusDetail",
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
        reference: DataTypes.STRING,
        nationality: DataTypes.STRING,
        issued: DataTypes.DATEONLY,
        expiry: DataTypes.DATEONLY,
        review_date: DataTypes.DATEONLY,
        document: DataTypes.STRING,
        current: DataTypes.BOOLEAN,
        remarks : DataTypes.STRING,
      },
      { tableName: "EsusDetails", timestamps: false }
    );
  
    return EsusDetail;
  };
  