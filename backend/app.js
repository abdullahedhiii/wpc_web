require('dotenv').config();
const express = require('express');
const { sequelize } = require('./config/sequelize');

const app = express();
app.use(express.json());  

sequelize.sync({ force: false }).then(() => {
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
}).catch((error) => {
  console.error('Error syncing the database:', error);
});
