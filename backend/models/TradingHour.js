module.exports = (sequelize, DataTypes) => {
    const TradingHour = sequelize.define(
      'TradingHour',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        day: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        openingTime: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        closingTime: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        organisation_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Organisations',
            key: 'id',
          },
        },
      },
      {
        tableName: 'TradingHours',
        timestamps: false,
      }
    );
  
    return TradingHour;
  };
  