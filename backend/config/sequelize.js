require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// Import models
const User = require('../models/User')(sequelize, DataTypes);
const Module = require('../models/Module')(sequelize, DataTypes);
const SubModule = require('../models/SubModule')(sequelize, DataTypes);
const Organisation = require('../models/Organisation')(sequelize, DataTypes);

module.exports = { sequelize, User,Organisation };
