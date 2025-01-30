module.exports = (sequelize, DataTypes) => {
    const Certification = sequelize.define(
      "Certifications",
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
        title: DataTypes.STRING,
        start: DataTypes.DATEONLY,
        end: DataTypes.DATEONLY,
        license: DataTypes.STRING,
      },
      { tableName: "Certifications", timestamps: false }
    );
  
    return Certification;
  };
  