module.exports = (sequelize, DataTypes) => {
    const TrainingDetail = sequelize.define(
      "TrainingDetail",
      {    id: {
        type : DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
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
        title: DataTypes.STRING,
        start: DataTypes.DATEONLY,
        end: DataTypes.DATEONLY,
        description: DataTypes.STRING,
      },
      { tableName: "TrainingDetails", timestamps: false }
    );
  
    return TrainingDetail;
  };
  