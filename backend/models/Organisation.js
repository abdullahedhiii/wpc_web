
module.exports = (sequelize, DataTypes) => {
    const Organisation = sequelize.define(
      'Organisation',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        Name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        Type: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'Private Company Limited by shares',
        },
        RegNo: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        Contact: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        OrganisationEmail: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        Website: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        Landline: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        TradingName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        Period: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'Over 12 to 18 months',
        },
        Sector: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'Other service activities',
        },
        NameChanged: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'No',
        },
        Penalty: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'No',
        },
        Logo: {
          type: DataTypes.STRING, //file path
          allowNull: true,
        },
        admin_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Users', 
            key: 'id',
          },
        },
      },
      {
        tableName: 'Organisations',
        timestamps: true,
      }
    );
  
    Organisation.belongsTo(sequelize.models.User, {
      foreignKey: 'admin_id',
      as: 'admin', 
    });
  
    return Organisation;
  };
  