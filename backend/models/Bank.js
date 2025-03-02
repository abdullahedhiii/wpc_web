
module.exports = (sequelize, DataTypes) => {
    const Bank = sequelize.define("Bank", {
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
      bank_name:{
          type: DataTypes.STRING,
          allowNull:false,
      }
    },
    {
      tableName: "Banks",
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['organisation_id', 'bank_name'], // Unique constraint on both fields
        },
      ]
    });
    return Bank;
  };
  