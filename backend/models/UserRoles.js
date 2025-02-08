module.exports = (sequelize, DataTypes) => {
    const UserRole = sequelize.define(
      "UserRole",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true, 
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "Users",
            key: "id",
          },
        },
        sub_module_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "Submodules",
            key: "id",
          },
        },
        feature_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "Features",
            key: "id",
          },
        },
        right: {
          type: DataTypes.STRING,
          allowNull: false, 
        },
      },
      {
        tableName: "UserRoles",
        timestamps: false,
      }
    );
  
    return UserRole;
  };
  