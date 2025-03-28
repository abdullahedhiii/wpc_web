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
      medical_leaves_in_hand: DataTypes.INTEGER,
      medical_max_leaves : DataTypes.INTEGER,
      holiday_leaves_in_hand: DataTypes.INTEGER,
      holiday_max_leaves : DataTypes.INTEGER,
      maternity_leaves_in_hand: DataTypes.INTEGER,
      maternity_max_leaves : DataTypes.INTEGER,
      year: {
        type: DataTypes.INTEGER,
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
