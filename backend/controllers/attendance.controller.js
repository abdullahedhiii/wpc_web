const fs = require("fs");
const csvParser = require("csv-parser");
const { Attendance, Shift, LatePolicy,Employee,PersonalDetail, ServiceDetail, Department, Designation, Holiday } = require("../config/sequelize"); // Import models
const { Sequelize, DataTypes, Op } = require('sequelize');
const moment = require("moment");

function parseTimeString(timeString) {
  const parsedTime = moment(timeString, ["h:mm A", "hh:mm A"], true);
  if (!parsedTime.isValid()) {
      
      return null;
  }
  return parsedTime.toDate().getTime(); // Returns timestamp
}

function parseDateString(dateString) {
  const formats = [
      "DD-MM-YYYY", "YYYY-MM-DD", "MM-DD-YYYY", 
      "DD-MM-YYYY HH:mm:ss", "YYYY-MM-DD HH:mm:ss"
  ];

  if (!/^\d{1,2}-\d{1,2}-\d{4}(\s\d{2}:\d{2}:\d{2})?$/.test(dateString)) {
    return "Invalid";
}

  const parsedDate = moment(dateString, formats, true);
  
  if (!parsedDate.isValid()) return "Invalid"; 
  
  const today = moment().startOf("day");
  if (parsedDate.isAfter(today)) {
      return "Invalid"; 
  }

  return parsedDate.format("YYYY-MM-DD"); // Convert to PostgreSQL format
}

// function parseDateString(dateString) {
//   if (!dateString) return "Invalid";

//   let cleanedDate = dateString.trim();

//   const parsedDate = moment(new Date(cleanedDate));  

//   if (!parsedDate.isValid()) return "Invalid";

//   const today = moment().startOf("day");
//   if (parsedDate.isAfter(today)) return "Invalid"; 

//   return parsedDate.format("YYYY-MM-DD"); 
// }

module.exports.submitCSV = async (req, res) => {
  try {
      const organisation_id = req.params.id;
      if (!req.file) {
          return res.status(400).json({ error: "No file uploaded" });
      }

      const filePath = req.file.path;
      let recordCount = 0;
      let errorDetails = {
          missingHeaders: [],
          invalidRows: 0,
          invalidDates: 0,
          holidays: 0,
          employeeNotFound: 0,
          invalidTimes: 0,
          duplicateRecords: 0
      };

      const requiredHeaders = [
          "Employee Code",
          "Employee Name",
          "Date",
          "Clock in",
          "Clock out",
          "Location"
      ];

      const holidayList = await Holiday.findAll({ where: { organisation_id } });
      let headersChecked = false;

      const stream = fs.createReadStream(filePath).pipe(csvParser());

      for await (const row of stream) {
          if (!headersChecked) {
              const csvHeaders = Object.keys(row);
              const missingHeaders = requiredHeaders.filter(header => !csvHeaders.includes(header));

              if (missingHeaders.length > 0) {
                  errorDetails.missingHeaders = missingHeaders;
                  return res.status(400).json({ 
                      message: `Invalid CSV format. Missing columns: ${missingHeaders.join(", ")}` 
                  });
              }
              headersChecked = true;
          }

          try {
              const { 
                  "Employee Code": employee_code, 
                  "Employee Name": employee_name,
                  "Date": date, 
                  "Clock in": clock_in, 
                  "Clock out": clock_out,
                  "Location": location
              } = row;

              if (!employee_code || !date || !clock_in || !clock_out) {
                  errorDetails.invalidRows++;
                  continue;
              }

              const parsedDate = parseDateString(date);
              if (parsedDate === 'Invalid') {
                  errorDetails.invalidDates++;
                  continue;
              }

              const isHoliday = holidayList.some(holiday => {
                  const holidayStart = new Date(holiday.start_date);
                  const holidayEnd = new Date(holiday.end_date);
                  return parsedDate >= holidayStart && parsedDate <= holidayEnd;
              });

              if (isHoliday) {
                  errorDetails.holidays++;
                  continue;
              }

              const employee_check = await Employee.findOne({ where: { employee_code, organisation_id } });

              if (!employee_check) {
                  errorDetails.employeeNotFound++;
                  continue;
              }

              const clockInTime = parseTimeString(clock_in);
              const clockOutTime = parseTimeString(clock_out);

              if (!clockInTime || !clockOutTime) {
                  errorDetails.invalidTimes++;
                  continue;
              }

              if (await Attendance.findOne({
                where: {
                  organisation_id,
                  employee_code,
                  date: parsedDate
                }
              })) {
                errorDetails.duplicateRecords++;
                continue;
              }

              const duty_hours = (clockOutTime - clockInTime) / (1000 * 60 * 60);
              const service_d = await ServiceDetail.findOne({
                where: {
                  employee_code: employee_code
                }
              });
              const workInTime = new Date(`1970-01-01T${service_d.work_in}`);
              const workOutTime = new Date(`1970-01-01T${service_d.work_out}`);
              const requiredDutyHours = (workOutTime - workInTime) / (1000 * 60 * 60);

              const dutyHoursMet = duty_hours >= requiredDutyHours;
              const status = dutyHoursMet ? "Present" : "Incomplete Hours";

              await Attendance.create({
                  organisation_id,
                  employee_code,
                  employee_name,
                  date: parsedDate,
                  clock_in,
                  clock_out,
                  location,
                  status,
                  duty_hours: Math.round(duty_hours)
              });

              recordCount++;
          } catch (rowError) {
              console.error(`Error processing row: ${rowError}`);
          }
      }

      if (recordCount === 0) {
          return res.status(400).json({ 
              message: "No valid records found in CSV",
              details: errorDetails
          });
      }

      return res.status(200).json({ 
          message: `Attendance records uploaded successfully, Valid row count: ${recordCount}`,
          details: errorDetails
      });

  } catch (error) {
      return res.status(500).json({ error: "Server error", message: error });
  }
};

// function parseTimeString(timeString) {
//     const dateTimeString = `1970-01-01 ${timeString}`;
//     const date = new Date(dateTimeString);
//     if (isNaN(date.getTime())) {
//       
//       return null;
//     }
//     return date.getTime();
//   }
// function parseDateString(dateString) {
//     const parts = dateString.split("-");
//     if (parts.length !== 3) {
//       
//       return null;
//     }
    
//     const [day, month, year] = parts.map(Number); 
//     if (!day || !month || !year) {
//       
//       return null;
//     }
  
//     const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
//     return formattedDate;
// }

// module.exports.submitCSV = async (req, res) => {
//   try {
//     

//     const organisation_id = req.params.id;
//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     const filePath = req.file.path;
//     let recordCount = 0;

//     const requiredHeaders = [
//       "Employee Code",
//       "Shift Code",
//       "Date",
//       "Clock in",
//       "Clock out",
//       "Clock out location",
//       "Clock in location"
//     ];
//  // Fetch all holidays for this organization
//  const holidayList = await HolidayList.findAll({
//   where: { organisation_id }
// });
//     let headersChecked = false;

//     const stream = fs.createReadStream(filePath).pipe(csvParser());

//     for await (const row of stream) {
//       if (!headersChecked) {
//         const csvHeaders = Object.keys(row);
//         const missingHeaders = requiredHeaders.filter(header => !csvHeaders.includes(header));

//         if (missingHeaders.length > 0) {
//           return res.status(400).json({ 
//             message: `Invalid CSV format. Missing columns: ${missingHeaders.join(", ")}` 
//           });
//         }

//         headersChecked = true;
//       }

//       try {
//         const { 
//           "Employee Code": employee_code, 
//           "Shift Code": shift_code, 
//           "Date": date, 
//           "Clock in": clock_in, 
//           "Clock out": clock_out,
//           "Clock out location": clock_out_location,
//           "Clock in location": clock_in_location
//         } = row;

//         if (!employee_code || !shift_code || !date || !clock_in || !clock_out) {
//           console.warn(`Skipping invalid row: ${JSON.stringify(row)}`);
//           continue;
//         }
//         const isHoliday = holidayList.some(holiday => {
//           const holidayStart = new Date(holiday.start_date);
//           const holidayEnd = new Date(holiday.end_date);
//           return parsedDate >= holidayStart && parsedDate <= holidayEnd;
//         });

//         if (isHoliday) {
//           console.warn(`Skipping row due to holiday: ${JSON.stringify(row)}`);
//           continue;
//         }
//         const employee_check = await Employee.findOne({
//           where : {employee_code,organisation_id 

//           }
//         });

//         if(!employee_check){
//           console.warn(`Skipping row employee not found: ${JSON.stringify(row)}`);
//           continue;
//         }
        
//         // const shift_check = await Shift.findOne({
//         //    shift_code
//         // });

//         // if (!shift_check) {
//         //   console.warn(`Skipping row, shift not found: ${shift_code}`);
//         //   continue;
//         // }
//         // const dept_check = await Department.findOne({
//         //   where : {id : shift_check.department_id}
//         // });

//         // const desg_check = await Designation.findOne({
//         //   where : {id : shift_check.designation_id}
//         // });
//         // if(dept_check.organisation_id !== organisation_id || desg_check.organisation_id !== organisation_id){
//         //   console.warn(`Skipping row shift not found withint organisation: ${JSON.stringify(row)}`);
//         //   continue;
//         // }
//         const clockInTime = parseTimeString(clock_in);
//         const clockOutTime = parseTimeString(clock_out);

//         if (!clockInTime || !clockOutTime) {
//           console.warn(`Skipping row due to invalid time format: ${JSON.stringify(row)}`);
//           continue;
//         }

//         const duty_hours = (clockOutTime - clockInTime) / (1000 * 60 * 60);
//         const shift = await Shift.findOne({ 
//           where: { shift_code },
//           include: [{ model: LatePolicy, as: "latepolicy" }]
//         });

//         if (!shift) {
//           console.warn(`Skipping row, shift not found: ${shift_code}`);
//           continue;
//         }

//         const parsedDate = parseDateString(date);
//         if (!parsedDate) {
//           console.warn(`Skipping row due to invalid date format: ${JSON.stringify(row)}`);
//           continue;
//         }

//         const workInTime = new Date(`1970-01-01T${shift.work_in}`);
//         const workOutTime = new Date(`1970-01-01T${shift.work_out}`);
//         const requiredDutyHours = (workOutTime - workInTime) / (1000 * 60 * 60);

//         const gracePeriodMinutes = shift.latepolicy ? shift.latepolicy.period : 0;
//         const graceEndTime = new Date(workInTime.getTime() + gracePeriodMinutes * 60000);
//         const grace_period_exceeded = clockInTime > graceEndTime;

//         const dutyHoursMet = duty_hours >= requiredDutyHours;
//         const status = dutyHoursMet ? "Present" : "Incomplete Hours";

//         await Attendance.create({
//           organisation_id,
//           employee_code,
//           shift_code,
//           date: parsedDate,
//           clock_in,
//           clock_out,
//           "clock_out_location": clock_out_location || "N/A",
//           "clock_in_location": clock_in_location || "N/A",
//           status,
//           duty_hours: Math.round(duty_hours),
//           grace_period_exceeded: grace_period_exceeded ? "Yes" : "No"
//         });

//         recordCount++;
//       } catch (rowError) {
//         
//       }
//     }

//     if (recordCount === 0) {
//       
//       return res.status(400).json({ error: "No valid records found in CSV" });
//     }

//     
//     return res.status(200).json({ message: `Attendance records uploaded successfully ,Valid row count ${recordCount}` });

//   } catch (error) {
//     
//     return res.status(500).json({ error: "Server error", errm: error });
//   }
// };

 
  module.exports.getAttendance = async (req, res) => {
    
    const { data } = req.query;
    
    try {
      
      
      const fromDate = data.fromDate ? new Date(data.fromDate) : null;
      const toDate = data.toDate ? new Date(data.toDate) : null;
      
      const whereCondition = {
        organisation_id: parseInt(req.params.id),
        // shift_code: data.shift,
        employee_code: data.employeeCode,
      };
      
      if (fromDate && toDate) {
        whereCondition.date = {
          [Op.between]: [fromDate, toDate],
        };
      } else if (fromDate) {
        whereCondition.date = {
          [Op.gte]: fromDate,
        };
      } else if (toDate) {
        whereCondition.date = {
          [Op.lte]: toDate,
        };
      }
  
      const records = await Attendance.findAll({
        where: whereCondition,
        order: [["date", "ASC"]], 

      });
  
      const employeeCodes = records.map(record => record.employee_code);
      const employeeDetails = await PersonalDetail.findAll({
        where: {
          employee_code: {
            [Op.in]: employeeCodes,
          },
        },
        attributes: ['employee_code', 'fname', 'lname', 'mname'],
      });
  
      const employeeMap = employeeDetails.reduce((map, employee) => {
        map[employee.employee_code] = `${employee.fname} ${employee.mname || ''} ${employee.lname || ''}`.trim();
        return map;
      }, {});
  
      const formattedResponse = records.map((ele, index) => {
        const employeeName = employeeMap[ele.employee_code] || 'N/A'; 
        return {
          "Sl No.": index + 1,
          "Employee Code": ele.employee_code,
          "Employee Name": employeeName,
          "Date": ele.date,
          "Clock In": ele.clock_in,
          "Clock In Location": "will do", 
          "Clock Out": ele.clock_out,
          "Clock Out Location": ele.clock_out_location,
          "Duty hours": ele.duty_hours,
        };
      });
  
      return res.status(200).json(formattedResponse); 
    } catch (err) {
      
      return res.status(500).json({ error: "Server error", errm: err });
    }
  };
  

  module.exports.getDailyAttendance = async (req, res) => {
    const { data } = req.query;
    
    
    try {
      const record = await Attendance.findOne({
        where: {
          employee_code: data.employeeCode,
          date: data.date, // Ensure data.date is a string in 'YYYY-MM-DD' format
        },
        order: [["date", "ASC"]], 

      });
      
  
      const personal = await PersonalDetail.findOne({
        where: { employee_code: data.employeeCode },
      });
  
      const service = await ServiceDetail.findOne({
        where: { employee_code: data.employeeCode },
      });
      let formattedResponse;
      if(!record) {
          formattedResponse = []
      }
      else{ formattedResponse = [
        {
          "Sl No.": 1,
          Department: service?.department,
          Designation: service?.designation,
          "Employee Code": data.employeeCode,
          "Employee Name": [personal?.fname, personal?.mname, personal?.lname]
            .filter(Boolean)
            .join(" "),
          Date: data.date,
          "Clock In": record?.clock_in || "N/A",
          "Clock In Location": record?.clock_in_location || "N/A",
          "Clock Out": record?.clock_out || "N/A",
          "Clock Out Location": record?.clock_out_location || "N/A",
          "Duty Hours": record?.duty_hours || "N/A",
          // Action: "Edit",
        },
      ];}
  
      
      return res.status(200).json(formattedResponse);
    } catch (err) {
      
      return res.status(500).json({ error: "Server error", details: err.message });
    }
  };
  
  module.exports.getAttendanceHistory = async (req, res) => {
    const { employeeCode, fromDate, toDate } = req.query.data;
    
  
    try {
      const records = await Attendance.findAll({
        where: {
          employee_code: employeeCode,
          date: {
            [Op.between]: [fromDate, toDate], 
          },
        },
        order: [["date", "ASC"]], 

      });
  
      const personal = await PersonalDetail.findOne({
        where: { employee_code: employeeCode },
      });
  
      const service = await ServiceDetail.findOne({
        where: { employee_code: employeeCode },
      });
  
      let formattedResponse = [];
  
      if (records.length === 0) {
        formattedResponse = [];
      } else {
        formattedResponse = records.map((record, index) => ({
          "Sl No.": index + 1,
          Department: service?.department || "N/A",
          Designation: service?.designation || "N/A",
          "Employee Code": employeeCode,
          "Employee Name": [personal?.fname, personal?.mname, personal?.lname]
            .filter(Boolean)
            .join(" "),
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
      
      return res.status(500).json({ error: "Server error", details: err.message });
    }
  };
  