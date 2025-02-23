
module.exports = (sequelize, DataTypes) => {
    const WorkUpdate = sequelize.define("WorkUpdate", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      employee_code: {
        type: DataTypes.STRING,
        references: {
          model: "Employees",
          key: "employee_code",
        },
        onDelete: 'CASCADE', 
      },
      fromTime:{
          type: DataTypes.TIME,
          allowNull:false,
      },
      toTime:{
        type: DataTypes.TIME,
        allowNull:false,
    },
      update_date:{
        type: DataTypes.DATEONLY,
        allowNull:false,
    },
      hours : {
        type: DataTypes.INTEGER,
        allowNull:false,
      },
      minutes : {
        type: DataTypes.INTEGER,
        allowNull:false,
      },
      file:{
        type : DataTypes.STRING,
        allowNull : false
      },
      update:{
        type : DataTypes.STRING,
      }
    },
    {
      tableName: "WorkUpdates",
      timestamps: false,
    });
    return WorkUpdate;
  };
  