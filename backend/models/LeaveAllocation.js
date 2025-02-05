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
      employment_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "EmploymentTypes",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      leave_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "LeaveTypes",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      leave_in_hand: DataTypes.INTEGER,
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
          fields: ["employee_code", "year","leave_type_id"],
        },
      ],
    }
  );

  return LeaveAllocation;
};
