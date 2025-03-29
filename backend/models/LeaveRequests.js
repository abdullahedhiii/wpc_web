module.exports = (sequelize, DataTypes) => {
    const LeaveRequest = sequelize.define(
      "LeaveRequests",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        employeeCode: {
          type: DataTypes.STRING,
          allowNull: false,
          references: {
            model: "Employees",
            key: "employee_code",
          },
          onDelete: "CASCADE",
        },
        company_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "Organisations",
            key: "id",
          },
        },
        applicationDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        fromDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        toDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        leave_type:{
          type : DataTypes.STRING(255),
          allowNull :false,
        },
        leave_in_hand: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        days: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        status: {
          type: DataTypes.ENUM("Pending", "Approved", "Rejected"),
          defaultValue: "Pending",
        },
      },
      {
        tableName: "LeaveRequests",
        timestamps: false,
        indexes: [
          {
            unique: true,
            fields: ["employeeCode", "leave_type", "fromDate", "toDate"],
          },
        ],
      }
    );
  
    return LeaveRequest;
  };
  