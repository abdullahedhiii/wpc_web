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
        experience: DataTypes.STRING,
        description: DataTypes.STRING,
      },
      { tableName: "JobDetails", timestamps: false }
    );
  
    return JobDetail;
  };
  