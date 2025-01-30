module.exports = (sequelize, DataTypes) => {
    const JobDetails = sequelize.define(
      "JobDetails",
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
        experience: DataTypes.INTEGER,
        description: DataTypes.STRING,
      },
      { tableName: "JobDetails", timestamps: false }
    );
  
    return JobDetails;
  };
  