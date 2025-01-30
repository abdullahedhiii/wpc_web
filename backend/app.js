require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { sequelize } = require('./config/sequelize');
const userRoutes = require('./routes/user.routes');
const adminRoutes = require('./routes/admin.routes');
const visitorRoutes = require('./routes/visitor.route');
const employeeAdd = require('./routes/employee-submission.routes');

const app = express();
app.use(express.json());  
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], 
  credentials: true,
}));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/',userRoutes);
app.use('/',adminRoutes);
app.use('/',visitorRoutes);
app.use('/',employeeAdd);
app.use('/uploads', express.static('uploads'));

sequelize.sync({ force: false }).then(() => {
  app.listen(process.env.PORT, () => {
    console.log('Server is running');
  });
}).catch((error) => {
  console.error('Error syncing the database:', error);
});
