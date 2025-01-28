
module.exports = (sequelize, DataTypes) => {
    const ShiftOffDay = sequelize.define("ShiftOffDay", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      shift_code: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Shifts",
          key: "shift_code",
        },
        onDelete: 'CASCADE', 
      },
      monday:{
          type: DataTypes.BOOLEAN,
          allowNull:false,
      },
      tuesday:{
        type: DataTypes.BOOLEAN,
        allowNull:false,
    },
    wednesday:{
        type: DataTypes.BOOLEAN,
        allowNull:false,
    },
    thursday:{
        type: DataTypes.BOOLEAN,
        allowNull:false,
    },
    friday:{
        type: DataTypes.BOOLEAN,
        allowNull:false,
    },
    saturday:{
        type: DataTypes.BOOLEAN,
        allowNull:false,
    },
    sunday:{
        type: DataTypes.BOOLEAN,
        allowNull:false,
    },
    },
    {
      tableName: "ShiftOffDays",
      timestamps: false,
    });
    return ShiftOffDay;
  };
  