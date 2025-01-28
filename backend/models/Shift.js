module.exports = (sequelize, DataTypes) => {
    const Shift = sequelize.define(
      "Shifts",
      {
        shift_code: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
        },
        department_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "Departments",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        designation_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "Designations",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        work_in: {
          type: DataTypes.TIME,
          allowNull: false,
        },
        work_out: {
          type: DataTypes.TIME,
          allowNull: false,
        },
        break_start: {
          type: DataTypes.TIME,
          allowNull: false,
        },
        break_end: {
          type: DataTypes.TIME,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: "Shifts",
        timestamps: false,
        hooks: {
          async beforeValidate(shift) {
            const lastShift = await Shift.findOne({
              order: [["shift_code", "DESC"]],
            });
  
            if (lastShift) {
              const lastCodeNumber = parseInt(lastShift.shift_code.split("-")[1], 10);
              const newCodeNumber = (lastCodeNumber + 1).toString().padStart(3, "0");
              shift.shift_code = `SHIFT-${newCodeNumber}`;
            } else {
              shift.shift_code = "SHIFT-001";
            }
          },
        },
      }
    );
  
    return Shift;
  };
  