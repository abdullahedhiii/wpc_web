module.exports = (sequelize, DataTypes) => {
  const LeaveAllocation = sequelize.define(
    "LeaveAllocation",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      employee_code: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Employees",
          key: "employee_code",
        },
        onDelete: "CASCADE",
      },
      medical_leaves_in_hand: DataTypes.STRING,
      medical_max_leaves : DataTypes.STRING ,
      holiday_leaves_in_hand: DataTypes.STRING,
      holiday_max_leaves : DataTypes.STRING,
      maternity_leaves_in_hand: DataTypes.STRING,
      maternity_max_leaves : DataTypes.STRING,
      year: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "LeaveAllocation",
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ["employee_code", "year"],
        },
      ],
    }
  );

  return LeaveAllocation;
};
