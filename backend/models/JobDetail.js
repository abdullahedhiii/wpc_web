module.exports = (sequelize, DataTypes) => {
    const JobDetail = sequelize.define(
      "JobDetail",
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
        experience: DataTypes.STRING(500),
        description: DataTypes.STRING(1000),
      },
      { tableName: "JobDetails", timestamps: false }
    );
  
    return JobDetail;
  };
  