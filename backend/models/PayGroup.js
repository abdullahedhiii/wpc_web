
module.exports = (sequelize, DataTypes) => {
    const PayGroup = sequelize.define("PayGroup", {
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
      paygroup:{
          type: DataTypes.STRING,
          allowNull:false,
      },
      status:{
          type: DataTypes.STRING,
          allowNull:false
      }
    },
    {
      tableName: "PayGroups",
      timestamps: false,
    });
    return PayGroup;
  };
  