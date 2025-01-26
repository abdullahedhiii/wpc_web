
module.exports = (sequelize, DataTypes) => {
    const AnnualPay = sequelize.define("AnnualPay", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      paygroup_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "PayGroup",
          key: "id",
        },
        onDelete: 'CASCADE', 
      },
      annual_pay:{
          type: DataTypes.FLOAT,
          allowNull:false,
      },
    },
    {
      tableName: "AnnualPays",
      timestamps: false,
    });
    return AnnualPay;
  };
  