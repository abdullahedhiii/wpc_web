
module.exports = (sequelize, DataTypes) => {
    const EsusDetail = sequelize.define(
      "EsusDetails",
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
        refernece: DataTypes.STRING,
        nationality: DataTypes.STRING,
        issued: DataTypes.DATEONLY,
        expiry: DataTypes.DATEONLY,
        review_date: DataTypes.DATEONLY,
        document: DataTypes.STRING,
        current: DataTypes.BOOLEAN,
      },
      { tableName: "EsusDetails", timestamps: false }
    );
  
    return EsusDetail;
  };
  