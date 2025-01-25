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

Designation.belongsTo(Department, { as: "department", foreignKey: "department_id" });
Department.hasMany(Designation, { as: "designations", foreignKey: "department_id" });

Organisation.hasMany(EmploymentType, {foreignKey: "organisation_id",as: "employmentTypes",});
EmploymentType.belongsTo(Organisation, {foreignKey: "organisation_id",as: "organisation",});


Organisation.hasMany(PayGroup, {foreignKey: "organisation_id",as: "paygroups",});
PayGroup.belongsTo(Organisation, {foreignKey: "organisation_id",as: "organisation",});


module.exports = { sequelize, User,Organisation, Module, Dashboard, SubModule, Feature,TradingHour,Department,Designation,EmploymentType,PayGroup};
