const {Employee, PersonalDetail, ServiceDetail, ContactInfo, NationalDetail, PassportDetail, PayDetail, UserRole, JobDetail, Department, Designation, VisaDetail, WorkUpdate, Attendance, LeaveAllocation, LeaveRequest, COCOtherDetail, EsusDetail, DBSDetail, LeaveRule, User, EducationDetail, KeyResponsibility, TrainingDetail, KinDetail, Certification, PayStructure, EmployeeOtherDocument, EmployeeOtherDetail, LeaveType}= require("../config/sequelize");
const { Sequelize, DataTypes, Op } = require('sequelize');
const crypto = require('crypto');


module.exports.setFormStatus = async (req, res) => {
  try {
    const employee = await Employee.findOne({
      where: { employee_code: req.params.id }
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    await employee.update({ has_filled_out_form: true });

    res.status(200).json({ message: "Form status updated successfully" });
  } catch (err) {
    console.error("Error updating form status:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const decryptLink = (encryptedData) => {
  try {
    const algorithm = "aes-256-cbc";
    const secretKey = process.env.EMP_SECRET_KEY;

    if (!secretKey || secretKey.length !== 64) {
      throw new Error(
        "Secret key must be 64 hex characters (32 bytes in length)"
      );
    }

    // Extract IV (first 32 characters represent 16 bytes in hex)
    const iv = Buffer.from(encryptedData.slice(0, 32), "hex");
    const encryptedText = encryptedData.slice(32);

    const decipher = crypto.createDecipheriv(
      algorithm,
      Buffer.from(secretKey, "hex"),
      iv
    );

    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  } catch (error) {
    console.error("Decryption Error:", error.message);
    return null;
  }
};

module.exports.getLinkFormDetails = async (req,res) => {
    const code = decryptLink(req.params.id);
    try {
      const employee = await Employee.findOne({
        where : {employee_code : code}
      })
      const personal_details = await PersonalDetail.findOne({
        where: { employee_code: code },
      });
      const service_details = await ServiceDetail.findOne({
        where: { employee_code: code },
      });
      const education_details = await EducationDetail.findAll({
        where: { employee_code: code },
      });
      const job_details = await JobDetail.findOne({
        where: { employee_code: code },
      });
      const key_responsibilities = await KeyResponsibility.findAll({
        where: { employee_code: code },
      });
      const training_details = await TrainingDetail.findAll({
        where: { employee_code: code },
      });
      const kin_details = await KinDetail.findOne({
        where: { employee_code: code },
      });
      const certification = await Certification.findOne({
        where: { employee_code: code },
      });
      const contact_info = await ContactInfo.findOne({
        where: { employee_code: code },
      });
      const other_documents = await EmployeeOtherDocument.findAll({
        where: { employee_code: code },
      });
      const passport_details = await PassportDetail.findOne({
        where: { employee_code: code },
      });
      const esus = await EsusDetail.findOne({ where: { employee_code: code } });
      const dbs = await DBSDetail.findOne({ where: { employee_code: code } });
      const visa = await VisaDetail.findOne({ where: { employee_code: code } });
      const national = await NationalDetail.findOne({
        where: { employee_code: code },
      });
      const pay_details = await PayDetail.findOne({
        where: { employee_code: code },
      });
      const other_details = await EmployeeOtherDetail.findAll({
        where: { employee_code: code },
      });
      const pay_structure = await PayStructure.findOne({
        where: { employee_code: code },
      });
  
      // Format pay_structure to match frontend state
      const formatted_pay_structure = pay_structure
        ? {
            payments: {
              dearnessAllowance: pay_structure.dearnessAllowance || false,
              houseRentAllowance: pay_structure.houseRentAllowance || false,
              conveyanceAllowance: pay_structure.conveyanceAllowance || false,
              performanceAllowance: pay_structure.performanceAllowance || false,
              monthlyFixedAllowance: pay_structure.monthlyFixedAllowance || false,
            },
            deductions: {
              niDeduction: pay_structure.niDeduction || false,
              incomeTaxDeduction: pay_structure.incomeTaxDeduction || false,
              incomeTaxCess: pay_structure.incomeTaxCess || false,
              esi: pay_structure.esi || false,
              profTax: pay_structure.profTax || false,
            },
          }
        : {
            payments: {
              dearnessAllowance: false,
              houseRentAllowance: false,
              conveyanceAllowance: false,
              performanceAllowance: false,
              monthlyFixedAllowance: false,
            },
            deductions: {
              niDeduction: false,
              incomeTaxDeduction: false,
              incomeTaxCess: false,
              esi: false,
              profTax: false,
            },
          };
  
      // Construct response object
      const response = {
        company_id : employee.organisation_id,
        personal_details,
        service_details,
        education_details,
        job_details,
        key_responsibilities,
        training_details,
        kin_details,
        certification,
        contact_info,
        other_documents,
        passport_details,
        esus,
        dbs,
        visa,
        national,
        pay_details,
        other_details,
        pay_structure: formatted_pay_structure,
      };
  
      return res.status(200).json(response);
    } catch (err) {
      console.error("Error fetching employee data:", err);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: err.message,decrypted_code : code });
    }
};


module.exports.getProfile = async(req,res) =>{
    const employee_code = req.params.id;
    const {user_id} = req.query;
    try{
        const employee = await Employee.findOne({
            where : {employee_code : employee_code},
            include :[
                {
                    model : PersonalDetail,
                    as : 'personaldetail',
                },
                {
                    model : JobDetail,
                    as : 'jobdetails',
                }, 
                {
                    model : ServiceDetail,
                    as : 'servicedetail',
                },
                {
                    model : ContactInfo,
                    as : 'contact',
                },
                {
                    model : NationalDetail,
                    as : 'nationaldetail',
                },
                {
                    model : PassportDetail,
                    as : 'passportdetail'
                },
                {
                    model : VisaDetail,
                    as : 'visadetail'
                },
                {
                    model : PayDetail,
                    as : 'paydetail',
                },
            ]
        });
        
        const userRoles = await UserRole.findAll({
            where: { user_id },
            attributes: ["sub_module_id", "feature_id", "right"],
          });        
          
          const formattedData = {
            profile_details : {
                name :[ employee.personaldetail.fname, employee.personaldetail.mname, employee.personaldetail.lname].filter(Boolean).join(' '),
                department : employee.servicedetail.department,
                designation : employee.servicedetail.designation,
                phone : employee.personaldetail.contact_1,
                dob : employee.personaldetail.dob,
                employee_code :employee.personaldetail.employee_code
            },
            service_details : {
                type : employee.servicedetail.type,
                start : employee.servicedetail.start
            },
            address_details : {
                line1 :employee.contact?.line1,
                city_county : employee.contact.city,
                post_code :  employee.contact?.post_code,
                country :employee.contact?.country
              
            },
            bank_details : {
                bank_name: employee.paydetail.bank_name,
                branch_name:  employee.paydetail.branch_name,
                account_no:  employee.paydetail.account_no,
                sort_code:  employee.paydetail.sort_code,
            },
            immigration_details :{
                 national_id : employee.nationaldetail.national_id,
                 nationality : employee.nationaldetail.nationality,
                 passport_no : employee.passportdetail.passport_no,
                 passport_issue : employee.passportdetail.issue_date,
                 passport_expiry : employee.passportdetail.expiry_date,
                 passport_by : employee.passportdetail.issued_by,
                 passport_review : employee.passportdetail.review_date,
                 visa_issue : employee.visadetail.issue_date,
                 visa_expiry : employee.visadetail.expiry_date,
                 visa_by : employee.visadetail.issued_by,
                 visa_review : employee.visadetail.review_date,


            },
        };
        return res.status(200).json(formattedData);
    }
    catch(err){
       return res.status(500).json({message : 'Internal server error'});
    }
}

module.exports.addWorkUpdate = async(req,res) => {
    try{
        const [organisationId, employeeCode] = req.params.id.split(".");
        const fileUrl = req.file
          ? `${process.env.BACKEND_URL}/uploads/${organisationId}/${employeeCode}/${req.file.filename}`
          : null;
      const update =await  WorkUpdate.create({
        employee_code : employeeCode,
        file : fileUrl,
        ...req.body
      });
      return res.status(200).json({message : 'Update added'});
    }
    catch(err){
        console.log('errorr ',err);
        return res.status(500).json({message : 'Internal server error'});
    }
}

module.exports.getWorkUpdates = async(req,res) => {
try{
   const updates = await WorkUpdate.findAll({
    where : {employee_code : req.params.id}
   });
   const formattedData = updates.map((update, index) => ({
    "Sl. No.": index + 1,
    "Date": update.update_date,
    "From Time": update.fromTime,
    "To Time": update.toTime,
    "Time": `${update.hours} hrs ${update.minutes} mins`, // Proper string formatting
    "Remarks": update.update,
    "Attachment": update.file
}));

   return res.status(200).json(formattedData);

}
catch(err){
        return res.status(500).json({message : 'Internal server error'});

}
}

module.exports.getAttendance = async(req,res) =>{
    const { employeeCode, fromDate, toDate } = req.query;
    try {
      const records = await Attendance.findAll({
        where: {
          employee_code: employeeCode,
          date: {
            [Op.between]: [fromDate, toDate], 
          },
        },
      });
  
      let formattedResponse = [];
  
      if (records.length === 0) {
        formattedResponse = [];
      } else {
        formattedResponse = records.map((record, index) => ({
          "Sl No.": index + 1,
          Date: record.date,
          "Clock In": record?.clock_in || "N/A",
          "Clock In Location": record?.clock_in_location || "N/A",
          "Clock Out": record?.clock_out || "N/A",
          "Clock Out Location": record?.clock_out_location || "N/A",
          "Duty Hours": record?.duty_hours || "N/A",
        }));
      }
  
      return res.status(200).json(formattedResponse);
    } catch (err) {
      console.error("Error fetching attendance", err);
      return res.status(500).json({ error: "Server error", details: err.message });
    }
}

module.exports.getInHand = async (req, res) => {
  const [code, id] = req.params.id.split('.');
  try {
    const serviceDetail = await ServiceDetail.findOne({
      where: { employee_code: code },
      attributes: ['employment_type_id']
    });

    if (!serviceDetail) {
      return res.status(404).json({ message: "Service detail not found" });
    }
    const leaveAllocation = await LeaveAllocation.findOne({
      where: {
        employee_code: code,
        leave_type_id: id,
      }
    });
    
    const leaveRule = await LeaveRule.findOne({
      where: {
        leave_type_id: id,
        employment_type_id: serviceDetail.employment_type_id,
      }
    });

    if (!leaveRule) {
      return res.status(404).json({ message: "Leave rule not found" });
    }

    const now = new Date();
    const fromDate = new Date(leaveRule.from);
    const toDate = new Date(leaveRule.to);

    if (now < fromDate || now > toDate) {
      return res.status(200).json({ message: "Cannot apply for this leave as it is not effective right now." });
    }

    const if_requested = await LeaveRequest.findAll({
      where: {
        employeeCode: code,
        leave_type_id: id,
      },
      attributes: [[Sequelize.fn("SUM", Sequelize.col("days")), "total_days"]],
      raw: true, 
    });

    if (!leaveAllocation) {
      return res.status(200).json(0);
    } else {
      return res.status(200).json(Math.max(leaveAllocation.leave_in_hand - (if_requested?.total_days || 0), 0));
    }
  } catch (err) {
    return res.status(500).json({ error: "Server error", details: err.message });
  }
};

module.exports.getApplications = async (req, res) => {
  try {
    const { employee_code } = req.query;

    const requests = await LeaveRequest.findAll({
      where: { employeeCode: employee_code },
      order: [['applicationDate', 'DESC']],
    });

    const formattedLeaves = await Promise.all(
      requests.map(async (request) => {
        const leaveType = await LeaveType.findOne({
          where: { id: request.leave_type_id },
          attributes: ['leave_type'],
        });

        return {
          "Leave Type": leaveType ? leaveType.leave_type : "N/A",
          "Requested On": request.applicationDate,
          "Number of days": request.days,
          "Dates": `${request.fromDate} to ${request.toDate}`,
          "Status": request.status,
        };
      })
    );

    res.json({ success: true, data: formattedLeaves });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports.applyLeave = async (req, res) => {
  try {
    const { employeeCode, leaveType, fromDate, toDate } = req.body;
    
    const check_if_already_applied = await LeaveRequest.findOne({
      where: {
        employeeCode,
        leave_type_id: leaveType,
        [Op.or]: [
          {
            fromDate: {
              [Op.between]: [req.body.fromDate, req.body.toDate],
            },
          },
          {
            toDate: {
              [Op.between]: [req.body.fromDate, req.body.toDate],
            },
          },
          {
            [Op.and]: [
              {
                fromDate: { [Op.lte]: req.body.fromDate },
              },
              {
                toDate: { [Op.gte]: req.body.toDate },
              },
            ],
          },
        ],
      },
    });

    if(check_if_already_applied){
        return res.status(200).json({message : 'You have already applied for the same leave type,during the same period'});

    }
    
    const serviceDetail = await ServiceDetail.findOne({
      where: { employee_code: employeeCode },
      attributes: ['employment_type_id']
    });

    if (!serviceDetail) {
      return res.status(404).json({ message: "Service detail not found" });
    }

    const leaveRule = await LeaveRule.findOne({
      where: {
        leave_type_id : leaveType,
        employment_type_id: serviceDetail.employment_type_id,
      }
    });
   

    const requestedFromDate = new Date(fromDate);
    const requestedToDate = new Date(toDate);
    const ruleFromDate = new Date(leaveRule.from);
    const ruleToDate = new Date(leaveRule.to);

    if (requestedFromDate < ruleFromDate || requestedToDate > ruleToDate) {
      return res.status(200).json({ message: "Cannot apply for this leave as it is not effective during the requested period." });
    }
 
    await LeaveRequest.create({
      ...req.body,
      leave_type_id : leaveType,
      applicationDate: new Date()
    });

    return res.status(200).json({ message: "Leave request submitted successfully" });

  } catch (err) {
    console.error("Error applying for leave:", err);
    return res.status(500).json({ error: "Server error", details: err.message });
  }
};

module.exports.getCOC = async (req, res) => {
  const id = req.params.id;
  try {
    const emp = await Employee.findOne({
      where: { 
        employee_code : id
      },
      include: [
        {
          model: COCOtherDetail,
          as: 'cocdetails',
          attributes: ['changeDate', 'remarks', 'awareContact', 'awareInterview'],
        },
        {
          model: PersonalDetail,
          as: 'personaldetail',
          attributes: [
            'Nationality',
            'fname',
            'lname',
            'mname','contact_1'
          ],
        },
        {
            model : ContactInfo,
            as : 'contact',
            attributes : [
              'line1',
              'line2',
              'line3',
              'country',
              'city',]
        },
        {
          model: ServiceDetail,
          as: 'servicedetail',
          attributes: ['type'],
        },
        {
          model: JobDetail,
          as: 'jobdetails',
          attributes: ['title'],
        },
        {
          model: VisaDetail,
          as: 'visadetail',
          attributes: ['visa_no', 'expiry_date'],
        },
        {
          model: PassportDetail,
          as: 'passportdetail',
          attributes: ['passport_no'],
        },
      ],
    });

    const formattedData = {
        'Updated Date': emp.cocdetails?.changeDate,
        'Employment Type': emp.servicedetail?.type,
        'Employee ID': emp.employee_code,
        'Name Of Member Of The Staff': [emp.personaldetail.fname, emp.personaldetail.mname, emp.personaldetail.lname]
          .filter(Boolean)
          .join(' '),
        'Job Title': emp.jobdetails?.title,
        'Address': [
          emp.contact?.line1,
          emp.contact?.line2,
          emp.contact?.line3,
          emp.contact?.city,
          emp.contact?.country,
        ]
          .filter(Boolean)
          .join(' '),
        'Contact Number': emp.personaldetail.contact_1,
        Nationality: emp.personaldetail.Nationality,
        'BRP Number': emp.visadetail?.visa_no,
        'Visa Expired': emp.visadetail?.expiry_date,
        'Remarks/Restriction to work': emp.cocdetails?.remarks,
        'Passport No': emp.passportdetail?.passport_no,
        'ESUS Details': 'no',
        'DBS Details': 'no',
        'National Id Details': 'no',
        'Other Documents': 'no',
        'Are Sponsored migrants aware that they must inform[HR/line manager] promptly of changes in contact Details?':
          emp.cocdetails?.awareContact ? 'Yes' : 'No',
        'Are Sponsore migrants aware that they need to cooperate Home Office interview by presenting original passports during the Interview(In applicable cases)?':
          emp.cocdetails?.awareInterview ? 'Yes' : 'No',
        "Annual Reminder Date": '', 
    };

    return res.status(200).json([formattedData]);
  } catch (err) {
    console.log(err,'coc');
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

  module.exports.getCOCFormEmp = async (req, res) => {
    
    try {
      const emp = await Employee.findOne({
        where: { 
          employee_code : req.params.id
        },
        include: [
          {
            model: COCOtherDetail,
            as: 'cocdetails',
          },
          {
            model: PersonalDetail,
            as: 'personaldetail',
          },
          
          {
              model : ContactInfo,
              as : 'contact',
          },
          {
            model: ServiceDetail,
            as: 'servicedetail',
          },
          {
            model: JobDetail,
            as: 'jobdetails',
          },
          {
            model: VisaDetail,
            as: 'visadetail',
          },
          {
            model: PassportDetail,
            as: 'passportdetail',
          },
          {
            model: EsusDetail,
            as: 'esusdetail',
          },
          {
            model: DBSDetail,
            as: 'dbsdetail',
          },
          {
            model: NationalDetail,
            as: 'nationaldetail',
          },
        ],
      });

      const formattedData = {
        employee: {
          full_name: [emp.personaldetail?.fname,emp.personaldetail?.mname,emp.personaldetail?.lname,'(' ,emp.personaldetail.employee_code,')'].filter(Boolean).join(' ') || '',
          employee_code: emp.employee_code || '',
          name:  [emp.personaldetail?.fname,emp.personaldetail?.mname,emp.personaldetail?.lname].filter(Boolean).join(' '),
          fname: emp.personaldetail?.fname || '',
          lname: emp.personaldetail?.lname || '',
          mname: emp.personaldetail?.mname || '',
          title: emp.jobdetails?.title,
          contact_1: emp.personaldetail?.contact_1 || '',
          Nationality: emp.passportdetail?.nationality  || '',
          nationality_no: emp.personaldetail?.nationality_no || ''
        },
        contact_info: {
          post_code: emp.contact?.post_code || '',
          address: emp.contact?.address || '',
          line1: emp.contact?.line1 || '',
          line2: emp.contact?.line2 || '',
          line3: emp.contact?.line3 || '',
          city: emp.contact?.city || '',
          country: emp.contact?.country || '',
          proof: emp.contact?.proof || null
        },
        passport_details: {
          passport_no: emp.passportdetail?.passport_no || '',
          nationality: emp.passportdetail?.nationality || '',
          place: emp.passportdetail?.place || '',
          issued_by: emp.passportdetail?.issued_by || '',
          issue_date: emp.passportdetail?.issue_date || '',
          expiry_date: emp.passportdetail?.expiry_date || '',
          review_date: emp.passportdetail?.review_date || '',
          picture: emp.passportdetail?.picture || null,
          current: emp.passportdetail?.current ? 'Yes' : 'No',
          remarks: emp.passportdetail?.remarks || ''
        },
        visa: {
          visa_no: emp.visadetail?.visa_no || 0,
          nationality: emp.visadetail?.nationality || '',
          country: emp.visadetail?.country || '',
          issued_by: emp.visadetail?.issued_by || '',
          issue_date: emp.visadetail?.issue_date || '',
          expiry_date: emp.visadetail?.expiry_date || '',
          review_date: emp.visadetail?.review_date || '',
          front: emp.visadetail?.front || null,
          back: emp.visadetail?.back || null,
          current: emp.visadetail?.current ?? true,
          remarks: emp.visadetail?.remarks ? 'Yes' : 'No'
        },
        esus: {
          reference: emp.esusdetail?.reference || '',
          nationality: emp.esusdetail?.nationality || '',
          issued: emp.esusdetail?.issued || '',
          expiry: emp.esusdetail?.expiry || '',
          review_date: emp.esusdetail?.review_date || '',
          remarks: emp.esusdetail?.remarks || '',
          document: emp.esusdetail?.document || null,
          current: emp.esusdetail?.current ? 'Yes' : 'No'
        },
        dbs: {
          type: emp.dbsdetail?.type || '',
          reference: emp.dbsdetail?.reference || '',
          nationality: emp.dbsdetail?.nationality || '',
          issued: emp.dbsdetail?.issued || '',
          expiry: emp.dbsdetail?.expiry || '',
          review_date: emp.dbsdetail?.review_date || '',
          remarks: emp.dbsdetail?.remarks || '',
          document: emp.dbsdetail?.document || null,
          current: emp.dbsdetail?.current ? 'Yes' : 'No'
        },
        national: {
          national_id: emp.nationaldetail?.national_id || '',
          nationality: emp.nationaldetail?.nationality || '',
          country: emp.nationaldetail?.country || '',
          issued: emp.nationaldetail?.issued || '',
          expiry: emp.nationaldetail?.expiry || '',
          review_date: emp.nationaldetail?.review_date || '',
          remarks: emp.nationaldetail?.remarks || '',
          document: emp.nationaldetail?.document || null,
          current: emp.nationaldetail?.current ? 'Yes' : 'No'
        },
        other_details: {
          changeDate: emp.cocdetails?.changeDate || '',
          remarks: emp.cocdetails?.remarks || '',
          awareContact: emp.cocdetails?.awareContact ? 'Yes' : 'No' || '',
          awareInterview: emp.cocdetails?.awareInterview ? 'Yes' : 'No'|| ''
        }
      };
      
  
      return res.status(200).json(formattedData);
    } catch (err) {
      console.log(err,'coc');
      return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
  };
