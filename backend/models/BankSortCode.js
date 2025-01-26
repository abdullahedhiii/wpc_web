
module.exports = (sequelize, DataTypes) => {
    const BankSortCode = sequelize.define("BankSortCode", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      bank_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Bank",
          key: "id",
        },
        onDelete: 'CASCADE', 
      },
      sort_code:{
          type: DataTypes.STRING,
          allowNull:false,
      },
    },
    {
      tableName: "BankSortCodes",
      timestamps: false,
    });
    return BankSortCode;
  };
  