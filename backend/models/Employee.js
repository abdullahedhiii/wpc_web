module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define(
      "Employee",
      {
        employee_code: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
        },
        organisation_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "Organisations",
            key: "id",
          },
          onDelete: "CASCADE",
        },

      },
      {
        tableName: "Employees",
        timestamps: false,
        hooks: {
          async beforeValidate(employee) {
            const lastCode = await Employee.findOne({
              order: [["employee_code", "DESC"]],
            });
  
            if (lastCode) {
              const lastCodeNumber = parseInt(lastCode.employee_code.split("-")[1], 10);
              const newCodeNumber = (lastCodeNumber + 1).toString().padStart(3, "0");
              employee.employee_code = `MAR-${newCodeNumber}`;
            } else {
              employee.employee_code = "MAR-001";
            }
          },
        },
      }
    );
  
    return Employee;
  };
  