
module.exports = (sequelize, DataTypes) => {
    const HolidayType = sequelize.define("HolidayType", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      organisation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Organisations",
          key: "id",
        },
        onDelete: 'CASCADE', 
      },
      holiday_type:{
          type: DataTypes.STRING,
          allowNull:false,
      }
    },
    {
      tableName: "HolidayTypes",
      timestamps: false,
    });
    return HolidayType;
  };
  