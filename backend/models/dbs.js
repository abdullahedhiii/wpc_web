

module.exports = (sequelize, DataTypes) => {
    const DBSDetail = sequelize.define(
      "DBSDetails",
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
        type : DataTypes.STRING,
        refernece: DataTypes.STRING,
        nationality: DataTypes.STRING,
        issued: DataTypes.DATEONLY,
        expiry: DataTypes.DATEONLY,
        review_date: DataTypes.DATEONLY,
        document: DataTypes.STRING,
        current: DataTypes.BOOLEAN,
        remarks : DataTypes.STRING,
      },
      { tableName: "DBSDetails", timestamps: false }
    );
  
    return DBSDetail;
  };
  