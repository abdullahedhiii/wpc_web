const express = require('express');
const {orgUpload} = require("../config/multerConfig");
const {authenticateUser} = require('../middleware/Authenticate');

const router = express.Router();
const {submitCompanyForm, getOrganisations, getFormDetails,
  updateCompany,uploadDocuments,addDepartment,
  getDepartments,addEmployeeType,getEmployeeTypes,
  addDesignation,
  getDesignations,
  addPayGroup,
  getPayGroups,
  getAnnualPays,
  addAnnualPay,
  getCompanyBanks,
  addCompanyBank,
  getBankSortCodes,addBankSortCode,
  getTaxMasters,
  addTaxMaster,
  getPaymentTypes,
  addPaymentType,
  getHolidayTypes,
  addHolidayType,
  getHolidayList,
  addHoliday,
  getVisitors,
  getShifts,
  addShift,
  addLatePolicy,
  getLatePolicies,
  addOffDay,
  get_next_id,
  getAllEmployees,
  getEmployeePage,getEmployeeData,
  getCOCData,
  getCOCTable,
  addLeaveType,
  getLeaveTypes,
  getLeaveRules,
  addLeaveRule,
  getCOCEmployee,
  allocateLeave,
  getLeaveAllocated,
  getLeavesAllocated,
  getOrgDocuments,
  createUser,
  grantRights,
  getUsers,
  getUserData,
  getUserRoles,
  getJobOpen,
  addForm,
  assignDuty,
  getDuties,
  getTasks,
  getForms,
  getJobForm,
  getLeavesRequested,
  updateLeaveRequest,
  getLeaveReportEmployee,
  getPastStaffData,
  processAttendance,
  processAbsentReport,
  deleteUser
} = require('../controllers/admin.controller');

router.post('/submitCompanyForm',authenticateUser,orgUpload.fields([
    { name: 'Company_Logo', maxCount: 1 },
    { name: 'KeyContact_proof_id', maxCount: 1 },
    { name: 'Authorizing_proof_id', maxCount: 1 },
    { name: 'Level1_proof_id', maxCount: 1 }
  ]), submitCompanyForm,submitCompanyForm);
router.get('/getOrganisation/:id',getOrganisations);
router.get('/getCompanyDetails',getFormDetails);

router.post('/updateCompany/:id', orgUpload.fields([
  { name: 'Company_Logo', maxCount: 1 },
  { name: 'KeyContact_proof_id', maxCount: 1 },
  { name: 'Authorizing_proof_id', maxCount: 1 },
  { name: 'Level1_proof_id', maxCount: 1 }
]), updateCompany);

router.post('/uploadDocument/:id',authenticateUser,orgUpload.single('document'),uploadDocuments);

router.post('/addDepartment/:id',addDepartment);
router.get('/getDepartments/:id',authenticateUser,getDepartments);

router.post('/addDesignation/:id',addDesignation);
router.get('/getDesignations/:id',authenticateUser,getDesignations);

router.post('/addEmployeeType/:id',addEmployeeType);
router.get('/getEmployeeTypes/:id',authenticateUser,getEmployeeTypes);

router.post('/addPayGroup/:id',authenticateUser,addPayGroup);
router.get('/getPayGroups/:id',authenticateUser,getPayGroups);

router.get('/getAnnualPays/:id',authenticateUser,getAnnualPays);
router.post('/addAnnualPay/:id',authenticateUser,addAnnualPay);

router.get('/getCompanyBanks/:id',authenticateUser,getCompanyBanks);
router.post('/addCompanyBank/:id',authenticateUser,addCompanyBank);

router.get('/getBankCodes/:id',authenticateUser,getBankSortCodes);
router.post('/addBankSortCode/:id',authenticateUser,addBankSortCode);

router.get('/getTaxMasters/:id',authenticateUser,getTaxMasters);
router.post('/addTaxMaster/:id',authenticateUser,addTaxMaster);

router.get('/getPaymentTypes/:id',authenticateUser,getPaymentTypes);
router.post('/addPaymentType/:id',authenticateUser,addPaymentType);

router.get('/getHolidayTypes/:id',authenticateUser,getHolidayTypes);
router.post('/addHolidayType/:id',authenticateUser,addHolidayType);

router.get('/getHolidayList/:id',authenticateUser,getHolidayList);
router.post('/addHoliday/:id',authenticateUser,addHoliday);

router.get('/getVisitors/:id',authenticateUser,getVisitors);


router.get('/getShifts/:id',authenticateUser,getShifts);
router.post('/addShift/:id',authenticateUser,addShift);

router.post('/setOffDays/:id',authenticateUser,addOffDay);

router.post('/addLatePolicy/:id',authenticateUser,addLatePolicy);
router.get('/getLatePolicies/:id',authenticateUser,getLatePolicies);

router.get('/getEmployees/:id',authenticateUser,getAllEmployees);
router.get('/getNextEmployeeCode',authenticateUser,get_next_id);
router.get('/getEmployeePage/:id',authenticateUser,getEmployeePage);
router.get('/getEmployeeDetails/:id',authenticateUser,getEmployeeData);

router.get('/getCOCDetails/:id',authenticateUser,getCOCData);
router.get('/getCOCTable/:id',authenticateUser,getCOCTable);
router.get('/getSpecificCOC/:id',authenticateUser,getCOCEmployee);

router.post('/addLeaveType/:id',authenticateUser,addLeaveType)
router.get('/getLeaveTypes/:id',authenticateUser,getLeaveTypes)

router.get('/getLeaveRules/:id',authenticateUser,getLeaveRules);
router.post('/addLeaveRule/:id',authenticateUser,addLeaveRule);

router.post(`/allocateLeave/:id`,authenticateUser,allocateLeave);
router.get('/getLeaveAllocation/:id',authenticateUser,getLeaveAllocated);
router.get('/getLeavesAllocated/:id',authenticateUser,getLeavesAllocated);

router.get('/getOrganisationDocuments/:id',authenticateUser,getOrgDocuments);

router.post('/createUser/:id',authenticateUser,createUser);
router.post('/grantRights',authenticateUser,grantRights);
router.get('/getUsers/:id',authenticateUser,getUsers);
router.get('/getUserData/:id',authenticateUser,getUserData);
router.get('/getUserRoles/:id',authenticateUser,getUserRoles);

router.get('/getJobsOpen/:id',authenticateUser,getJobOpen);
router.post('/addForm',authenticateUser,addForm);
router.get('/getForms/:id',authenticateUser,getForms);
router.get('/getFormOfJob/:id',authenticateUser,getJobForm);

router.post('/assignDuty',authenticateUser,assignDuty);
router.get('/getDutiesAssigned',authenticateUser,getDuties);

router.get('/getTasks',authenticateUser,getTasks);
router.get('/getLeavesList/:id',authenticateUser,getLeavesRequested);
router.post('/updateLeaveRequest',authenticateUser,updateLeaveRequest);
router.get('/getLeaveReportEmployee',authenticateUser,getLeaveReportEmployee);
router.get('/getPastStaffData/:id',authenticateUser,getPastStaffData);

router.get('/processAttendance',authenticateUser,processAttendance);
router.get('/absentReport',authenticateUser,processAbsentReport);

router.post('/deleteUser/:id',authenticateUser,deleteUser);
module.exports = router;