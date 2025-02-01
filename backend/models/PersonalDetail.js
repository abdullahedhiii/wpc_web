module.exports = (sequelize, DataTypes) => {
    const PersonalDetail = sequelize.define(
      "PersonalDetail",
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
        fname: {type : DataTypes.STRING,allowNull : false},
        mname: DataTypes.STRING,
        lname: {type : DataTypes.STRING,allowNull : false},
        Gender: DataTypes.STRING,
        dob: DataTypes.DATEONLY,
        nationality_no: DataTypes.STRING,
        Nationality: DataTypes.STRING,
        email:{type : DataTypes.STRING,allowNull : false},
        contact_1:{type : DataTypes.STRING,allowNull : false},
        contact_2: DataTypes.STRING,
      },
      { tableName: "PersonalDetails", timestamps: false }
    );
  
    return PersonalDetail;
  };
  