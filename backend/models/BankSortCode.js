
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
          unique : true,
      },
    },
    {
      tableName: "BankSortCodes",
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['bank_id', 'sort_code'], // Unique constraint on both fields
        },
      ]
    });
    return BankSortCode;
  };
  