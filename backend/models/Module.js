module.exports = (sequelize, DataTypes) => {
    const Module = sequelize.define(
      'Module',
      {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: 'Modules',
      }
    );
  
    Module.associate = function (models) {
      Module.hasMany(models.SubModule, {
        foreignKey: 'moduleId',
        as: 'subModules',
      });
    };
  
    return Module;
  };
  