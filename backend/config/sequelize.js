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
const Dashboard = require('../models/Dashboard')(sequelize, DataTypes);
const Feature = require('../models/Feature')(sequelize, DataTypes);
const SubModule = require('../models/SubModule')(sequelize, DataTypes);
const Organisation = require('../models/Organisation')(sequelize, DataTypes);
const TradingHour = require('../models/TradingHour')(sequelize,DataTypes);
const Department = require('../models/Department')(sequelize,DataTypes);
const Designation = require('../models/Designation')(sequelize,DataTypes);
const EmploymentType = require('../models/EmploymentType')(sequelize,DataTypes);
const PayGroup = require('../models/PayGroup')(sequelize,DataTypes);
const AnnualPay = require('../models/AnnualPay')(sequelize,DataTypes);
const Bank = require('../models/Bank')(sequelize,DataTypes);
const BankSortCode = require('../models/BankSortCode')(sequelize,DataTypes);
const TaxMaster = require('../models/TaxMaster')(sequelize,DataTypes);
const PaymentType = require('../models/PaymentType')(sequelize,DataTypes);
const HolidayType = require('../models/HolidayType')(sequelize,DataTypes);
const Holiday = require('../models/Holiday')(sequelize,DataTypes);
const Visitor = require('../models/Visitor')(sequelize,DataTypes);
const Shift = require('../models/Shift')(sequelize,DataTypes);
const LatePolicy = require('../models/LatePolicy')(sequelize,DataTypes);
const ShiftOffDay = require('../models/ShiftOffDay')(sequelize,DataTypes);
const OrgDocument = require('../models/OrgDocument')(sequelize,DataTypes);
const Job = require('../models/Job')(sequelize,DataTypes);
const LeaveType = require('../models/LeaveType')(sequelize,DataTypes);
const LeaveRule = require('../models/LeaveRule')(sequelize,DataTypes);
const LeaveAllocation = require('../models/LeaveAllocation')(sequelize,DataTypes);
const Candidate = require('../models/Candidate')(sequelize,DataTypes);



const Employee = require('../models/Employee')(sequelize,DataTypes);
const PersonalDetail = require('../models/PersonalDetail')(sequelize,DataTypes);
const EducationDetail = require('../models/EducationalDetails')(sequelize,DataTypes);
const ServiceDetail = require('../models/ServiceDetail')(sequelize,DataTypes);
const JobDetail = require('../models/JobDetail')(sequelize,DataTypes);
const Certification = require('../models/Certification')(sequelize,DataTypes);
const ContactInfo = require('../models/ContactInfo')(sequelize,DataTypes);
const EmployeeOtherDetail = require('../models/EmployeeOtherDetail')(sequelize,DataTypes);
const EmployeeOtherDocument= require('../models/EmployeeOtherDocument')(sequelize,DataTypes);
const KeyResponsibility= require('../models/KeyResponsibility')(sequelize,DataTypes);
const KinDetail= require('../models/KinDetail')(sequelize,DataTypes);
const NationalDetail= require('../models/NationalDetail')(sequelize,DataTypes);
const PassportDetail= require('../models/PassportDetails')(sequelize,DataTypes);
const VisaDetail= require('../models/Visa')(sequelize,DataTypes);
const DBSDetail= require('../models/dbs')(sequelize,DataTypes);
const EsusDetail= require('../models/esus')(sequelize,DataTypes);
const COCOtherDetail = require('../models/COCOtherDetail')(sequelize,DataTypes);
const PayDetail= require('../models/PayDetail')(sequelize,DataTypes);
const PayStructure= require('../models/PayStructure')(sequelize,DataTypes);
const TrainingDetail = require('../models/TrainingData')(sequelize,DataTypes);
const Attendance = require('../models/Attendance')(sequelize,DataTypes);

Module.hasMany(Dashboard, { as: 'dashboard', foreignKey: 'module_id' });
Dashboard.belongsTo(Module, { as: 'module', foreignKey: 'module_id' });

Module.hasMany(SubModule, { as: 'subModules', foreignKey: 'module_id' });
SubModule.belongsTo(Module, { as: 'module', foreignKey: 'module_id' });

SubModule.hasMany(Feature, { as: 'features', foreignKey: 'submodule_id' });
Feature.belongsTo(SubModule, { as: 'submodule', foreignKey: 'submodule_id' });

Organisation.hasMany(TradingHour, { as: 'tradingHours', foreignKey: 'organisation_id' });
TradingHour.belongsTo(Organisation, { as: 'organisation', foreignKey: 'organisation_id' });

Organisation.hasMany(LeaveType, { as: 'leavetypes', foreignKey: 'organisation_id' });
LeaveType.belongsTo(Organisation, { as: 'organisation', foreignKey: 'organisation_id' });

Organisation.hasMany(LeaveRule, { as: 'leaverules', foreignKey: 'organisation_id' });
LeaveRule.belongsTo(Organisation, { as: 'organisation', foreignKey: 'organisation_id' });

LeaveType.hasMany(LeaveRule,{as : 'leaverules',foreignKey : 'id'})
LeaveRule.belongsTo(LeaveType, { as: 'leavetype', foreignKey: 'id' });

EmploymentType.hasMany(LeaveRule, { as: 'leaverules', foreignKey: 'id' });
LeaveRule.belongsTo(EmploymentType, { as: 'employeetypes', foreignKey: 'id' });


Organisation.hasMany(Department, {foreignKey: "organisation_id",as: "departments",});
Department.belongsTo(Organisation, {foreignKey: "organisation_id",as: "organisation",});

Organisation.hasMany(OrgDocument, {foreignKey: "organisation_id",as: "org_documents",});
OrgDocument.belongsTo(Organisation, {foreignKey: "organisation_id",as: "organisation",});

Designation.belongsTo(Department, { as: "department", foreignKey: "department_id" });
Department.hasMany(Designation, { as: "designations", foreignKey: "department_id" });

Organisation.hasMany(EmploymentType, {foreignKey: "organisation_id",as: "employmentTypes",});
EmploymentType.belongsTo(Organisation, {foreignKey: "organisation_id",as: "organisation",});

Organisation.hasMany(PayGroup, {foreignKey: "organisation_id",as: "paygroups",});
PayGroup.belongsTo(Organisation, {foreignKey: "organisation_id",as: "organisation",});

PayGroup.hasMany(AnnualPay, {foreignKey: "paygroup_id",as: "annualpays",});
AnnualPay.belongsTo(PayGroup, {foreignKey: "paygroup_id",as: "paygroups",});

Organisation.hasMany(Bank, {foreignKey: "organisation_id",as: "banks",});
Bank.belongsTo(Organisation, {foreignKey: "organisation_id",as: "organisation",});

Bank.hasMany(BankSortCode, {foreignKey: "bank_id",as: "banksortcodes",});
BankSortCode.belongsTo(Bank, {foreignKey: "bank_id",as: "bank",});

Organisation.hasMany(TaxMaster, {foreignKey: "organisation_id",as: "taxmasters",});
TaxMaster.belongsTo(Organisation, {foreignKey: "organisation_id",as: "organisation",});

Organisation.hasMany(PaymentType, {foreignKey: "organisation_id",as: "paymenttypes",});
PaymentType.belongsTo(Organisation, {foreignKey: "organisation_id",as: "organisation",});

Organisation.hasMany(HolidayType, {foreignKey: "organisation_id",as: "holidaytypes",});
HolidayType.belongsTo(Organisation, {foreignKey: "organisation_id",as: "organisation",});

Organisation.hasMany(Holiday, {foreignKey: "organisation_id",as: "holidays",});
Holiday.belongsTo(Organisation, {foreignKey: "organisation_id",as: "organisation",});

Organisation.hasMany(Visitor, {foreignKey: "organisation_id",as: "visitors",});
Visitor.belongsTo(Organisation, {foreignKey: "organisation_id",as: "organisation",});
Shift.belongsTo(Department, { as: "department", foreignKey: "department_id" });
Shift.belongsTo(Designation, { as: "designation", foreignKey: "designation_id" });

Shift.hasOne(LatePolicy,{foreignKey:"shift_code",as : "latepolicy"});

Department.hasMany(Shift, { as: "shifts", foreignKey: "department_id" });
Designation.hasMany(Shift, { as: "shifts", foreignKey: "designation_id" });

Organisation.hasMany(Employee, {foreignKey: "organisation_id",as: "employees",});
Employee.belongsTo(Organisation, {foreignKey: "organisation_id",as: "organisation",});

PersonalDetail.belongsTo(Employee,{foreignKey : "employee_code",as:"employee"});
Employee.hasOne(PersonalDetail, {foreignKey: "employee_code",as: "personaldetail",});


LeaveAllocation.belongsTo(Employee,{foreignKey : "employee_code",as:"employee"});
Employee.hasMany(LeaveAllocation, {foreignKey: "employee_code",as: "leavesallocated",});


EducationDetail.belongsTo(Employee,{foreignKey : "employee_code",as:"employee"});
Employee.hasMany(EducationDetail, {foreignKey: "employee_code",as: "educationaldetails",});

ServiceDetail.belongsTo(Employee,{foreignKey : "employee_code",as:"employee"});
Employee.hasOne(ServiceDetail, {foreignKey: "employee_code",as: "servicedetail",});

Certification.belongsTo(Employee,{foreignKey : "employee_code",as:"employee"});
Employee.hasOne(Certification, {foreignKey: "employee_code",as: "certification",});

 ContactInfo.belongsTo(Employee,{foreignKey : "employee_code",as:"employee"});
 Employee.hasOne(ContactInfo, {foreignKey: "employee_code",as: "contact",});

 EmployeeOtherDetail.belongsTo(Employee,{foreignKey : "employee_code",as:"employee"});
 EmployeeOtherDocument.belongsTo(Employee,{foreignKey : "employee_code",as:"employee"});
 KeyResponsibility.belongsTo(Employee,{foreignKey : "employee_code",as:"employee"});
 KinDetail.belongsTo(Employee,{foreignKey : "employee_code",as:"employee"});
 
 NationalDetail.belongsTo(Employee,{foreignKey : "employee_code",as:"employee"});
 Employee.hasOne(NationalDetail,{foreignKey:"employee_code",as : 'nationaldetail'});

 COCOtherDetail.belongsTo(Employee,{foreignKey :"employee_code",as : "employee"})
 Employee.hasOne(COCOtherDetail,{foreignKey:"employee_code",as : 'cocdetails'});

 PassportDetail.belongsTo(Employee,{foreignKey : "employee_code",as:"employee"});
 Employee.hasOne(PassportDetail, {foreignKey: "employee_code",as: "passportdetail",});

 PayDetail.belongsTo(Employee,{foreignKey : "employee_code",as:"employee"});
 
 PayStructure.belongsTo(Employee,{foreignKey : "employee_code",as:"employee"});
 
 TrainingDetail.belongsTo(Employee,{foreignKey : "employee_code",as:"employee"});

 VisaDetail.belongsTo(Employee,{foreignKey : "employee_code",as:"employee"});
 Employee.hasOne(VisaDetail, {foreignKey: "employee_code",as: "visadetail",});

 EsusDetail.belongsTo(Employee,{foreignKey : "employee_code",as:"employee"});
 Employee.hasOne(EsusDetail, {foreignKey: "employee_code",as: "esusdetail",});

 DBSDetail.belongsTo(Employee,{foreignKey : "employee_code",as:"employee"});
 Employee.hasOne(DBSDetail, {foreignKey: "employee_code",as: "dbsdetail",});

JobDetail.belongsTo(Employee,{foreignKey:"employee_code",as:"employee"});
Employee.hasOne(JobDetail, {foreignKey: "employee_code",as: "jobdetails",});


Organisation.hasMany(Job,{foreignKey : 'organisation_id',as : 'jobs'});
Job.belongsTo(Organisation,{foreignKey : 'organisation_id',as : 'organisation'});

Employee.hasMany(Attendance, { foreignKey: "employee_code", as: "employeesAttendance" });
Attendance.belongsTo(Employee, { foreignKey: "employee_code", as: "employee" });

Attendance.belongsTo(PersonalDetail, { foreignKey: "employee_code", as: "employeePersonalDetail" });

Job.hasMany(Candidate,{as : 'candidates',foreignKey : 'id'});
Candidate.belongsTo(Job,{as : 'job',foreignKey:'id'});

module.exports = { sequelize, User,Organisation, Module,
                   Dashboard, SubModule, Feature,TradingHour,
                   Department,Designation,EmploymentType,
                   PayGroup,AnnualPay,Bank,BankSortCode,
                   TaxMaster,PaymentType,HolidayType,Holiday,Visitor,Shift,LatePolicy,ShiftOffDay,OrgDocument, Job,Attendance
                   ,LeaveType,LeaveRule,LeaveAllocation,Candidate,
                   Employee,PersonalDetail,EducationDetail,ServiceDetail,JobDetail,
                   Certification,ContactInfo,EmployeeOtherDetail,EmployeeOtherDocument,KeyResponsibility,KinDetail,
                   NationalDetail,PassportDetail,PayDetail,PayStructure,TrainingDetail,VisaDetail,EsusDetail,DBSDetail,COCOtherDetail
                  };
