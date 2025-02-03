
module.exports = (sequelize, DataTypes) => {
    const LeaveRule = sequelize.define("LeaveRule", {
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
      employment_type_id : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            model : 'EmploymentTypes',
            key : 'id'
        }
      },
      leave_type_id:{
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            model : 'LeaveTypes',
            key : 'id'
        }
      },
      max:{
        type: DataTypes.STRING,
        allowNull:false,
    },
      from: {
        type : DataTypes.DATEONLY,
        allowNull:false
      }, to: {
        type : DataTypes.DATEONLY,
        allowNull:false
      },
    },
    {
      tableName: "LeaveRules",
      timestamps: false,
    });
    return LeaveRule;
  };
  