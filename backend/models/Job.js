module.exports = (sequelize, DataTypes) => {
    const Job = sequelize.define(
      "Job",
      {
        id: {
          type : DataTypes.INTEGER,
         primaryKey : true,
         autoIncrement:true,
        },
        organisation_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "Organisations",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        socCode: DataTypes.STRING,
        jobCode :DataTypes.STRING,
        jobType: DataTypes.STRING,
        department: DataTypes.STRING,
        jobTitle: DataTypes.STRING,
        jobDescription: DataTypes.STRING(1000),
        status : DataTypes.STRING,
        jobContractType: DataTypes.STRING,
        workingHours: DataTypes.STRING,
        jobExperienceMin:  DataTypes.STRING,
        jobExperienceMax:  DataTypes.STRING,
        basicSalaryMin:  DataTypes.STRING,
        basicSalaryMax:  DataTypes.STRING,
        salaryPeriod:  DataTypes.STRING,
        numVacancies:  DataTypes.STRING,
        jobLocation:  DataTypes.STRING,
        qualifications: DataTypes.STRING(500),
        skillSet: DataTypes.STRING(500),
        ageMin: DataTypes.STRING,
        ageMax: DataTypes.STRING,
        gender: DataTypes.STRING,
        newRole : DataTypes.STRING,
        language : DataTypes.STRING,
        jobPostingDate : DataTypes.DATEONLY,
        jobClosingDate: DataTypes.DATEONLY,
        authorisingOfficer :  DataTypes.STRING,
        authorisingOfficerDesignation :  DataTypes.STRING,
        contactNumber:  DataTypes.STRING,
        email : DataTypes.STRING
      },
      { tableName: "Jobs", timestamps: false }
    );
  
    return Job;
  };
  