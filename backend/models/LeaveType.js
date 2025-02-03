
module.exports = (sequelize, DataTypes) => {
    const LeaveType = sequelize.define("LeaveType", {
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
      leave_type:{
          type: DataTypes.STRING,
          allowNull:false,
      },
      sort_code:{
        type: DataTypes.STRING,
        allowNull:false,
    },
      remarks: {
        type : DataTypes.STRING
      }
    },
    {
      tableName: "LeaveTypes",
      timestamps: false,
    });
    return LeaveType;
  };
  