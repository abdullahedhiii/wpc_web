
module.exports = (sequelize, DataTypes) => {
    const TaxMaster = sequelize.define("TaxMaster", {
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
      tax_code:{
          type: DataTypes.STRING,
          allowNull:false,
      },
      percentage:{
        type : DataTypes.FLOAT,
        allowNull:false,
      },
      reference:{
        type : DataTypes.STRING,
        allowNull:false
      }
    },
    {
      tableName: "TaxMasters",
      timestamps: false,
    });
    return TaxMaster;
  };
  