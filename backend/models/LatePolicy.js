module.exports = (sequelize, DataTypes) => {
    const LatePolicy = sequelize.define(
      "LatePolicies",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement:true,
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
        shift_code: {
            type: DataTypes.STRING,
            allowNull: true,
            references: {
              model: "Shifts",
              key: "shift_code",
            },
            onDelete: "CASCADE",
        },
        period: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        days: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        salary_days: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        tableName: "LatePolicies",
        timestamps: false,
      }
    );
  
    return LatePolicy;
  };
  