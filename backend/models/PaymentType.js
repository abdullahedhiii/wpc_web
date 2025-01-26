
module.exports = (sequelize, DataTypes) => {
    const PaymentType = sequelize.define("PaymentType", {
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
      payment_type:{
          type: DataTypes.STRING,
          allowNull:false,
      },
      min_hours:{
        type : DataTypes.INTEGER,
        allowNull:false,
      },
      rate:{
        type : DataTypes.FLOAT,
        allowNull:false
      }
    },
    {
      tableName: "PaymentTypes",
      timestamps: false,
    });
    return PaymentType;
  };
  