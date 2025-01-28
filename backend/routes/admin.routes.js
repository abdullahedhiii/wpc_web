const express = require('express');
const upload = require("../config/multerConfig");

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
  addOffDay
} = require('../controllers/admin.controller');

router.post('/submitCompanyForm',upload.fields([
    { name: 'Company_Logo', maxCount: 1 },
    { name: 'KeyContact_proof_id', maxCount: 1 },
    { name: 'Authorizing_proof_id', maxCount: 1 },
    { name: 'Level1_proof_id', maxCount: 1 }
  ]), submitCompanyForm,submitCompanyForm);
router.get('/getOrganisations',getOrganisations);
router.get('/getCompanyDetails',getFormDetails);
router.post('/updateCompany/:id', upload.fields([
  { name: 'Company_Logo', maxCount: 1 },
  { name: 'KeyContact_proof_id', maxCount: 1 },
  { name: 'Authorizing_proof_id', maxCount: 1 },
  { name: 'Level1_proof_id', maxCount: 1 }
]), updateCompany);

router.post('/uploadDocument/:id',upload.single('document'),uploadDocuments);

router.post('/addDepartment/:id',addDepartment);
router.get('/getDepartments/:id',getDepartments);

router.post('/addDesignation/:id',addDesignation);
router.get('/getDesignations/:id',getDesignations);

router.post('/addEmployeeType/:id',addEmployeeType);
router.get('/getEmployeeTypes/:id',getEmployeeTypes);

router.post('/addPayGroup/:id',addPayGroup);
router.get('/getPayGroups/:id',getPayGroups);

router.get('/getAnnualPays/:id',getAnnualPays);
router.post('/addAnnualPay/:id',addAnnualPay);

router.get('/getCompanyBanks/:id',getCompanyBanks);
router.post('/addCompanyBank/:id',addCompanyBank);

router.get('/getBankCodes/:id',getBankSortCodes);
router.post('/addBankSortCode/:id',addBankSortCode);

router.get('/getTaxMasters/:id',getTaxMasters);
router.post('/addTaxMaster/:id',addTaxMaster);

router.get('/getPaymentTypes/:id',getPaymentTypes);
router.post('/addPaymentType/:id',addPaymentType);

router.get('/getHolidayTypes/:id',getHolidayTypes);
router.post('/addHolidayType/:id',addHolidayType);

router.get('/getHolidayList/:id',getHolidayList);
router.post('/addHoliday/:id',addHoliday);

router.get('/getVisitors/:id',getVisitors);


router.get('/getShifts/:id',getShifts);
router.post('/addShift/:id',addShift);

router.post('/setOffDays/:id',addOffDay);

router.post('/addLatePolicy/:id',addLatePolicy);
router.get('/getLatePolicies/:id',getLatePolicies);

module.exports = router;