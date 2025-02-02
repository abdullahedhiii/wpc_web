module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define(
    "Attendance",
    {
      organisation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Organisations",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      shift_code: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Shifts",
          key: "shift_code",
        },
        onDelete: "CASCADE",
      },
      employee_code: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Employees",
          key: "employee_code",
        },
        onDelete: "CASCADE",
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        primaryKey: true,
      },
      clock_in: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      clock_out: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      clock_out_location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      clock_in_location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      duty_hours: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      grace_period_exceeded :{
        type : DataTypes.STRING,
        allowNull:false
      }
    },
    { tableName: "Attendance", timestamps: false }
  );

  return Attendance;
};
