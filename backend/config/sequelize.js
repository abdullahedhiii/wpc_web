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

Module.hasMany(Dashboard, { as: 'dashboard', foreignKey: 'module_id' });
Dashboard.belongsTo(Module, { as: 'module', foreignKey: 'module_id' });

Module.hasMany(SubModule, { as: 'subModules', foreignKey: 'module_id' });
SubModule.belongsTo(Module, { as: 'module', foreignKey: 'module_id' });

SubModule.hasMany(Feature, { as: 'features', foreignKey: 'submodule_id' });
Feature.belongsTo(SubModule, { as: 'submodule', foreignKey: 'submodule_id' });

Organisation.hasMany(TradingHour, { as: 'tradingHours', foreignKey: 'organisation_id' });
TradingHour.belongsTo(Organisation, { as: 'organisation', foreignKey: 'organisation_id' });

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

Department.hasMany(Shift, { as: "shifts", foreignKey: "department_id" });

Designation.hasMany(Shift, { as: "shifts", foreignKey: "designation_id" });

module.exports = { sequelize, User,Organisation, Module,
                   Dashboard, SubModule, Feature,TradingHour,
                   Department,Designation,EmploymentType,
                   PayGroup,AnnualPay,Bank,BankSortCode,
                   TaxMaster,PaymentType,HolidayType,Holiday,Visitor,Shift,LatePolicy,ShiftOffDay,OrgDocument
                  };
