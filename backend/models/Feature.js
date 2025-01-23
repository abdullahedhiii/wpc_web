module.exports = (sequelize, DataTypes) => {
    const Feature = sequelize.define('Feature', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      submodule_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      next_route: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      plus_icon_route:{
        type : DataTypes.STRING(255),
        allowNull : true,
      },
      icon: {
        type: DataTypes.ENUM('la-building', 'la-user', 'la-cogs', 'la-user-shield', 'la-clock', 'la-calendar', 'la-edit', 'la-trash', 'la-file-alt', 
          'la-check-circle', 'la-tasks','la-user-plus','la-users','la-sitemap','la-calendar-times'),
      }
    });
  
    Feature.associate = function(models) {
      Feature.belongsTo(models.Submodule, { foreignKey: 'submodule_id', onDelete: 'CASCADE' });
    };
  
    return Feature;
  };
  