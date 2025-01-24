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
      action_route:{
        type : DataTypes.STRING(255),
        allowNull:true,
      },
      icon: {
        type: DataTypes.STRING(255),
        allowNull:true,
      }
    });
  
    Feature.associate = function(models) {
      Feature.belongsTo(models.Submodule, { foreignKey: 'submodule_id', onDelete: 'CASCADE' });
    };
  
    return Feature;
  };
  