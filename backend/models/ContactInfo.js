module.exports = (sequelize, DataTypes) => {
    const ContactInfo = sequelize.define(
      "ContactInfo",
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
        post_code: DataTypes.STRING,
        address: DataTypes.STRING,
        line1: DataTypes.STRING,
        line2: DataTypes.STRING,
        line3: DataTypes.STRING,
        city: DataTypes.STRING,
        country: DataTypes.STRING,
        proof: DataTypes.STRING,
      },
      { tableName: "ContactInfos", timestamps: false }
    );
  
    return ContactInfo;
  };
  