// models/dashboard.js
module.exports = (sequelize, DataTypes) => {
    const Dashboard = sequelize.define('Dashboard', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      module_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      color: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      percentage:{
        type : DataTypes.INTEGER,
        allowNull: true,
      },
      icon: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      count: {
        type: DataTypes.INTEGER,
        defaultValue: -1,
        allowNull: false
      },
      view_route:{
        type : DataTypes.STRING,
        allowNull:true,
      }
    });
  
    // Define associations here
    Dashboard.associate = function(models) {
      Dashboard.belongsTo(models.Module, { foreignKey: 'module_id', onDelete: 'CASCADE' });
    };
  
    return Dashboard;
  };
  