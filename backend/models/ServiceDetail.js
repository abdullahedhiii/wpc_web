module.exports = (sequelize, DataTypes) => {
    const ServiceDetail = sequelize.define(
      "ServiceDetail",
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
        department_id: {
          type: DataTypes.INTEGER,
          references: {
            model: "Departments",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        designation_id: {
          type: DataTypes.INTEGER,
          references: {
            model: "Designations",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        employment_type_id : {
          type : DataTypes.INTEGER,
          references : {
            model : "EmploymentTypes",
            key : "id",
          },
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
  