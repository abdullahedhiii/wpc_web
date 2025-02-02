const fs = require("fs");
const csvParser = require("csv-parser");
const { Attendance, Shift, LatePolicy,Employee,PersonalDetail, ServiceDetail } = require("../config/sequelize"); // Import models
const { Sequelize, DataTypes, Op } = require('sequelize');
const moment = require("moment");

function parseTimeString(timeString) {
    const dateTimeString = `1970-01-01 ${timeString}`;
    const date = new Date(dateTimeString);
    if (isNaN(date.getTime())) {
      console.error(`Invalid time format: ${timeString}`);
      return null;
    }
    return date.getTime();
  }
function parseDateString(dateString) {
    const parts = dateString.split("-");
    if (parts.length !== 3) {
      console.error(`Invalid date format: ${dateString}`);
      return null;
    }
    
    const [day, month, year] = parts.map(Number); 
    if (!day || !month || !year) {
      console.error(`Invalid date values: ${dateString}`);
      return null;
    }
  
    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
    return formattedDate;
}
  
  module.exports.submitCSV = async (req, res) => {
    try {
      console.log("Attendance submission hit", req.body, req.params.id);
  
      const organisation_id = req.params.id;
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
  
      const filePath = req.file.path;
      let recordCount = 0;
  
      const stream = fs.createReadStream(filePath).pipe(csvParser());
  
      for await (const row of stream) {
        try {
          const { 
            "Employee Code": employee_code, 
            "Shift Code": shift_code, 
            "Date": date, 
            "Clock in": clock_in, 
            "Clock out": clock_out,
            "Clock out location": clock_out_location,
            "Clock in location" : clock_in_location
          } = row;
  
          if (!employee_code || !shift_code || !date || !clock_in || !clock_out ) {
            console.warn(`Skipping invalid row: ${JSON.stringify(row)}`);
            continue;
          }
  
          const clockInTime = parseTimeString(clock_in);
          const clockOutTime = parseTimeString(clock_out);
  
          if (!clockInTime || !clockOutTime) {
            console.warn(`Skipping row due to invalid time format: ${JSON.stringify(row)}`);
            continue;
          }
  
          const duty_hours = (clockOutTime - clockInTime) / (1000 * 60 * 60);
          const shift = await Shift.findOne({ 
            where: { shift_code },
            include: [{ model: LatePolicy, as: "latepolicy" }]
          });
  
          if (!shift) {
            console.warn(`Skipping row, shift not found: ${shift_code}`);
            continue;
          }
          const parsedDate = parseDateString(date);
          if (!parsedDate) {
            console.warn(`Skipping row due to invalid date format: ${JSON.stringify(row)}`);
            continue;
          }
          
          const workInTime = new Date(`1970-01-01T${shift.work_in}`);
          const workOutTime = new Date(`1970-01-01T${shift.work_out}`);
          const requiredDutyHours = (workOutTime - workInTime) / (1000 * 60 * 60);
  
          const gracePeriodMinutes = shift.latepolicy ? shift.latepolicy.period : 0;
          const graceEndTime = new Date(workInTime.getTime() + gracePeriodMinutes * 60000);
          const grace_period_exceeded = clockInTime > graceEndTime;
  
          const dutyHoursMet = duty_hours >= requiredDutyHours;
          console.log('duty hours ',dutyHoursMet,requiredDutyHours);
          const status = dutyHoursMet ? "Present" : "Incomplete Hours";
          await Attendance.create({
            organisation_id,
            employee_code,
            shift_code,
            date: parsedDate,
            clock_in,
            clock_out,
            "clock_out_location" : clock_out_location || "N/A",
            "clock_in_location" : clock_in_location || "N/A" ,
            status,
            duty_hours: Math.round(duty_hours),
            grace_period_exceeded : grace_period_exceeded ? 'Yes' : 'No'
          });
  
          recordCount++;
        } catch (rowError) {
          console.error("Error processing row:", rowError);
        }
      }
  
      if (recordCount === 0) {
        console.log("No valid records were found in CSV");
        return res.status(400).json({ error: "No valid records found in CSV" });
      }
  
      console.log(`CSV processed successfully. Total records inserted: ${recordCount}`);
      return res.status(200).json({ message: "Attendance records uploaded successfully" });
  
    } catch (error) {
      console.error("Error handling CSV upload:", error);
      return res.status(500).json({ error: "Server error", errm: error });
    }
  };
 
  module.exports.getAttendance = async (req, res) => {
    console.log(req.query, req.params.id);
    const { data } = req.query;
    
    try {
      console.log(data.shift, data.employeeCode);
      
      const fromDate = data.fromDate ? new Date(data.fromDate) : null;
      const toDate = data.toDate ? new Date(data.toDate) : null;
      
      const whereCondition = {
        organisation_id: parseInt(req.params.id),
        shift_code: data.shift,
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
      console.error("Error fetching attendance", err);
      return res.status(500).json({ error: "Server error", errm: err });
    }
  };
  

  module.exports.getDailyAttendance = async (req, res) => {
    const { data } = req.query;
    console.log("dataa ", data);
    console.log(new Date(data.date));
    try {
      const record = await Attendance.findOne({
        where: {
          employee_code: data.employeeCode,
          date: data.date, // Ensure data.date is a string in 'YYYY-MM-DD' format
        },
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
          Action: "Edit",
        },
      ];}
  
      console.log("Formatted Response: ", formattedResponse);
      return res.status(200).json(formattedResponse);
    } catch (err) {
      console.error("Error fetching attendance", err);
      return res.status(500).json({ error: "Server error", details: err.message });
    }
  };
  
  module.exports.getAttendanceHistory = async (req, res) => {
    const { employeeCode, fromDate, toDate } = req.query.data;
    console.log("Received Data:", req.query);
  
    try {
      const records = await Attendance.findAll({
        where: {
          employee_code: employeeCode,
          date: {
            [Op.between]: [fromDate, toDate], 
          },
        },
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
  
      console.log("Formatted Response: ", formattedResponse);
      return res.status(200).json(formattedResponse);
    } catch (err) {
      console.error("Error fetching attendance", err);
      return res.status(500).json({ error: "Server error", details: err.message });
    }
  };
  