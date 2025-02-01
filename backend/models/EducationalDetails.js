module.exports = (sequelize, DataTypes) => {
    const EducationDetail = sequelize.define(
      "EducationDetail",
      {
        id: {
          type : DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement:true,
        },
        employee_code: {
          type: DataTypes.STRING,
          allowNull: false,
          references: {
            model: "Employees",
            key: "employee_code",
          },
          onDelete: "CASCADE",
        },
        qualification: DataTypes.STRING,
        subject: DataTypes.STRING,
        institution_name: DataTypes.STRING,
        awarding_body: DataTypes.STRING,
        year_of_passing: DataTypes.STRING,
        percentage: DataTypes.STRING,
        grade_division: DataTypes.STRING,
        transcript_document: DataTypes.STRING,
        certificate_document: DataTypes.STRING,
      },
      { tableName: "EducationDetails", timestamps: false }
    );
  
    return EducationDetail;
  };
  