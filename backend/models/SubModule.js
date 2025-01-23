// models/submodule.js
module.exports = (sequelize, DataTypes) => {
  const Submodule = sequelize.define('Submodule', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    module_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    icon : {
      type : DataTypes.STRING(255),
      allowNull:true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    main_route: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  });

  // Define associations here
  Submodule.associate = function(models) {
    Submodule.belongsTo(models.Module, { foreignKey: 'module_id', onDelete: 'CASCADE' });
    Submodule.hasMany(models.Feature, { foreignKey: 'submodule_id', onDelete: 'CASCADE' });
  };

  return Submodule;
};
