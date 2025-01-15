const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');  

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  company_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true,
  },
  phone_number:{
    type: DataTypes.STRING,
    allowNull:false,
    unique:true,
  },
  password:{
    type: DataTypes.STRING,
    allowNull:false
  }
}, {
  tableName: 'Users',
  timestamps: true,
  hooks: {
     beforeCreate : async(user) => {
        if (user.password) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
          }
     },
     beforeUpdate: async (user) => {
       if (user.changed('password')) {
         const hashedPassword = await bcrypt.hash(user.password, 10);
         user.password = hashedPassword;
       }
     },
  }
});

module.exports = User;
