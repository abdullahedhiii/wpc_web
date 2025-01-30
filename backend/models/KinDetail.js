module.exports = (sequelize, DataTypes) => {
    const KinDetail = sequelize.define(
      "KinDetails",
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
        name: DataTypes.STRING,
        relation: DataTypes.STRING,
        email: DataTypes.STRING,
        contact: DataTypes.STRING,

      },
      { tableName: "KinDetails", timestamps: false }
    );
  
    return KinDetail;
  };
  