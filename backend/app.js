require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { sequelize } = require('./config/sequelize');
const userRoutes = require('./routes/user.routes');
const adminRoutes = require('./routes/admin.routes');
const visitorRoutes = require('./routes/visitor.route');
const employeeAdd = require('./routes/employee-submission.routes');
const JobRoutes = require('./routes/job.routes');
const AttendanceRoutes = require('./routes/attendance.routes');
const PdfRoutes = require('./routes/pdf.routes');
const employeeRoutes = require('./routes/employee-routes');

// require('./jobs/sponsor-fetch');

const app = express();
app.use(express.json());  
app.use(cors({
  origin: [process.env.FRONTEND_URL,], 
  credentials: true,
}));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api',userRoutes);
app.use('/api',adminRoutes);
app.use('/api',visitorRoutes);
app.use('/api',employeeAdd);
app.use('/api',JobRoutes);
app.use('/api',AttendanceRoutes);
app.use('/api',PdfRoutes);
app.use('/api',employeeRoutes);

app.use('/uploads', express.static('uploads'));


sequelize.sync({ force: false }).then(() => {
  app.listen(process.env.PORT, () => {
    console.log('Server is running');
  });
}).catch((error) => {
  console.error('Error syncing the database:', error);
});

module.exports = app;