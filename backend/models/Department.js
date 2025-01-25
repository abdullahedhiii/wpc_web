
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define("Department", {
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
    department_name:{
        type: DataTypes.STRING,
        allowNull:false,
    }
  },
  {
    tableName: "Departments",
    timestamps: false,
  });
  return Department;
};
