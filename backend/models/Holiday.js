
module.exports = (sequelize, DataTypes) => {
    const Holiday = sequelize.define("Holiday", {
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
      year : {
        type : DataTypes.INTEGER,
        allowNull:false,
      },
      start_date: {
         type: DataTypes.DATEONLY,
         allowNull:false
      },
      end_date: {
        type: DataTypes.DATEONLY,
        allowNull:false
      },
      day : {
        type : DataTypes.STRING,
        allowNull:false,
      },
      holiday_type:{
          type: DataTypes.STRING,
          allowNull:false,
      },
      description : {
        type : DataTypes.STRING,
        allo : false,
      }
    },
    {
      tableName: "Holidays",
      timestamps: false,
    });
    return Holiday;
  };
  