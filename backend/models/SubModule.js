module.exports = (sequelize, DataTypes) => {
    const SubModule = sequelize.define(
      'SubModule',
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        moduleId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Modules', 
            key: 'id',  
          },
        },
      },
      {
        tablename: 'SubModules',
      }
    );
  
    SubModule.associate = function (models) {
      SubModule.belongsTo(models.Module, {
        foreignKey: 'moduleId',
        as: 'module',
      });
    };
  
    return SubModule;
  };
  