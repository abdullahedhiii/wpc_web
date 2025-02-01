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
        jobDescription: DataTypes.STRING,
        status : DataTypes.STRING,
        jobContractType: DataTypes.STRING,
        workingHours: DataTypes.FLOAT,
        jobExperienceMin:  DataTypes.INTEGER,
        jobExperienceMax:  DataTypes.INTEGER,
        basicSalaryMin:  DataTypes.FLOAT,
        basicSalaryMax:  DataTypes.FLOAT,
        salaryPeriod:  DataTypes.STRING,
        numVacancies:  DataTypes.INTEGER,
        jobLocation:  DataTypes.STRING,
        qualifications: DataTypes.STRING,
        skillSet: DataTypes.STRING,
        ageMin: DataTypes.INTEGER,
        ageMax: DataTypes.INTEGER,
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
  