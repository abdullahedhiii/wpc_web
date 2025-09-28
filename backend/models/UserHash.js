// models/UserHash.js

module.exports = (sequelize, DataTypes) => {
    const UserHash = sequelize.define("UserHash", {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expiry: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    }, {
      timestamps:false,
      indexes: [
        {
          unique: true,
          fields: ['email', 'expiry'],
        },
      ],
    });
  
    return UserHash;
  };
  