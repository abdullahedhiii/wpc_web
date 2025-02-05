const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Candidate = sequelize.define(
      "Candidate",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        job_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "Jobs",
            key: "id",
          },
          onDelete: "CASCADE",
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
        name: {
          type: DataTypes.STRING,
          allowNull: false, // Required field
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false, // Required field
          unique: true, // Ensure email is unique
          validate: {
            isEmail: true, // Validate email format
          },
        },
        contactNo: {
          type: DataTypes.STRING,
          allowNull: false, // Required field
          validate: {
            len: [10, 15], // Assuming phone number length constraints
          },
        },
        gender: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        dob: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        experienceYear: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        experienceMonth: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        education: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        recentPosition: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        nextJobTitle: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        currentCode: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        currentLocation: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        expectedSalary: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        resume: {
          type: DataTypes.STRING, 
          allowNull: false,
        },
        coverLetter: {
          type: DataTypes.STRING,
          allowNull: false, 
        },
        status : {
          type : DataTypes.STRING,
          allowNull:false,
        },
        applyDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          defaultValue: Sequelize.NOW
        }  ,
        interviewDate: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
        timeFrom: {
          type : DataTypes.TIME,
          allowNull:true,
        },
        timeTo: {
          type : DataTypes.TIME,
          allowNull:true,
        }        
      },
      {
        tableName: "Candidates",
        timestamps: false,
      }
    );

  
    return Candidate;
  };
  