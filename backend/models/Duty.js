
module.exports = (sequelize, DataTypes) => {
    const Duty = sequelize.define("Duty", {
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
      shift_code: {
        type: DataTypes.STRING,
        references: {
          model: "Shifts",
          key: "shift_code",
        },
        onDelete: 'CASCADE', 
      },
      department_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Departments",
          key: "id",
        },
        onDelete: 'CASCADE', 
      },
      designation_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Designations",
          key: "id",
        },
        onDelete: 'CASCADE', 
      },
      fromDate:{
          type: DataTypes.DATEONLY,
          allowNull:false,
      },
      toDate:{
        type: DataTypes.DATEONLY,
        allowNull:false,
    },
      duty_assigned_to : {
        type: DataTypes.STRING,
        allowNull:false,
      }
    },
    {
      tableName: "Duties",
      timestamps: false,
    });
    return Duty;
  };
  