
module.exports = (sequelize, DataTypes) => {
    const EmploymentType = sequelize.define("EmploymentType", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      organisation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Organisations",
          key: "id",
        },
        onDelete: 'CASCADE', 
      },
      employment_type:{
          type: DataTypes.STRING,
          allowNull:false,
      },
    },
    {
      tableName: "EmploymentTypes",
      timestamps: false,
    });
    return EmploymentType;
  };
  