
module.exports = (sequelize, DataTypes) => {
    const Designation = sequelize.define("Designation", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      department_id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        allowNull: false,
        references: {
          model: "Departments",
          key: "id",
        },
        onDelete: 'CASCADE', 
      },
      designation_name:{
          type: DataTypes.STRING,
          allowNull:false,
      },
    },
    {
      tableName: "Designations",
      timestamps: false,
    });
    return Designation;
  };
  