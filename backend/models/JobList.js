module.exports = (sequelize, DataTypes) => {
    const JobList = sequelize.define(
      "JobDetail",
      {
        organisation_id: {
          type: DataTypes.STRING,
          allowNull: false,
          references: {
            model: "Organisations",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        socCode: DataTypes.STRING,
        jobType: DataTypes.STRING,
        department: DataTypes.STRING,
        jobTitle: DataTypes.STRING,
        jobDescription: DataTypes.STRING,
      },
      { tableName: "JobLists", timestamps: false }
    );
  
    return JobList;
  };
  