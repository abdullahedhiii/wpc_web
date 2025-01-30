module.exports = (sequelize, DataTypes) => {
    const ServiceDetail = sequelize.define(
      "ServiceDetails",
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
        department: DataTypes.STRING,
        designation: DataTypes.STRING,
        joining: DataTypes.DATEONLY,
        type: DataTypes.STRING,
        confirmation: DataTypes.DATEONLY,
        start: DataTypes.DATEONLY,
        end_if: DataTypes.DATEONLY,
        location: DataTypes.STRING,
        reportingauth: DataTypes.STRING,
        leaveauth: DataTypes.STRING,
        profile_pic: DataTypes.STRING,
      },
      { tableName: "ServiceDetails", timestamps: false }
    );
  
    return ServiceDetail;
  };
  