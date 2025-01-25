// models/module.js
module.exports = (sequelize, DataTypes) => {
  const Module = sequelize.define('Module', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    button_title : {
      type : DataTypes.STRING(255),
      allowNull:false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    icon_image: {
       type : DataTypes.STRING(255),
       allowNull:false,
    },
    next_route: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  });

  // Define associations here
  Module.associate = function(models) {
    Module.hasMany(models.Dashboard, { foreignKey: 'module_id', onDelete: 'CASCADE' });
    Module.hasMany(models.Submodule, { foreignKey: 'module_id', onDelete: 'CASCADE' });
  };

  return Module;
};
