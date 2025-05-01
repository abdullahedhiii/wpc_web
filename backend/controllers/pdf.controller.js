const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const { Organisation, OrgDocument, Employee, PersonalDetail, JobDetail, VisaDetail, PassportDetail, EsusDetail, 
  DBSDetail, 
  NationalDetail,
  ContactInfo,
  ServiceDetail,
  Designation,
  LeaveAllocation,LeaveType,
  LeaveRule} = require("../config/sequelize");
require('dotenv').config();

  function sum(arr) {
    return arr.reduce((a, b) => a + b, 0);
  }

  const YELLOW = '#FACC15'; // Tailwind yellow-400
  const YELLOW_LIGHT = '#FEF9C3'; // Tailwind yellow-100
  const HEADER_BG = '#FDE68A'; // Tailwind yellow-200
  const HEADER_TEXT = '#B45309'; // Tailwind yellow-700
  const BORDER_COLOR = '#FDE68A';
  
  module.exports.generateOrganisationReport = async (req, res) => {
    const organisation_id = req.params.id;
    try {
      const organisation = await Organisation.findOne({ where: { id: organisation_id } });
      const documents = await OrgDocument.findAll({ where: { organisation_id } });
  
      const dirPath = path.join(__dirname, `../uploads/${organisation_id}`);
      const pdfPath = path.join(dirPath, "organisationReport.pdf");
      if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
      if (fs.existsSync(pdfPath)) fs.unlinkSync(pdfPath);
  
      const doc = new PDFDocument({ margin: 40, size: 'A4' });
      const stream = fs.createWriteStream(pdfPath);
      doc.pipe(stream);
  
      // --- Header Bar (Yellow) ---
      doc.rect(0, 0, doc.page.width, 80)
        .fill(HEADER_BG);
  
      // --- Logo in Circle ---
      if (organisation.Company_Logo) {
        const logoFilename = path.basename(organisation.Company_Logo);
        const logoPath = path.join(__dirname, `../uploads/${organisation.Company_name}/`, logoFilename);
        if (fs.existsSync(logoPath)) {
          doc.save()
            .circle(60, 40, 30)
            .clip()
            .image(logoPath, 30, 10, { width: 60, height: 60 })
            .restore();
        }
      }
  
      // --- Organisation Name ---
      doc
        .fontSize(22)
        .fillColor(HEADER_TEXT)
        .font('Helvetica-Bold')
        .text(organisation.Company_name, 100, 30, { align: 'left', continued: false });
  
      // --- Subtitle ---
      doc
        .moveDown(0.2)
        .fontSize(12)
        .fillColor('#6B7280') // Tailwind gray-500
        .font('Helvetica')
        .text('Organisation Profile Report', 100, 55, { align: 'left' });
  
      // --- Divider ---
      doc.moveTo(40, 90).lineTo(doc.page.width - 40, 90).strokeColor(BORDER_COLOR).lineWidth(2).stroke();
  
      // --- Organisation Details Section ---
      doc
        .moveDown(1.5)
        .fontSize(16)
        .fillColor(YELLOW)
        .font('Helvetica-Bold')
        .text('Organisation Details', { align: 'left' });
  
      doc.moveDown(0.5);
  
      // --- Details Table ---
      const details = [
        ['Organisation Name', organisation.Company_name],
        ['Type of Organisation', organisation.Company_Type],
        ['Registration Number', organisation.Company_RegNo],
        ['Contact Number', organisation.Company_Contact],
        ['Organisation Email ID', organisation.Company_OrganisationEmail],
        ['Website', organisation.Company_Website],
        ['Trading Name', organisation.Company_TradingName],
        ['Trading Period', '0 to 6 months'],
        ['Name Of Sector', organisation.Company_Sector],
        ['Address Postcode', organisation.Address_Postcode || ''],
        ['Address Line 1', organisation.Address_Line1 || ''],
        ['Address Line 2', organisation.Address_Line2 || ''],
        ['Address Line 3', organisation.Address_Line3 || ''],
        ['City/County', organisation.Address_City_County || ''],
        ['Country', organisation.Address_Country || ''],
      ];
  
      let y = doc.y + 10;
      const startX = 50;
      const col1 = 180, col2 = 320, rowH = 28;
  
      // Table Header
      doc
        .fillColor(YELLOW)
        .rect(startX, y, col1, rowH).fill()
        .rect(startX + col1, y, col2, rowH).fill();
  
      doc
        .fillColor(HEADER_TEXT)
        .fontSize(12)
        .font('Helvetica-Bold')
        .text('Field', startX + 10, y + 8)
        .text('Value', startX + col1 + 10, y + 8);
  
      y += rowH;
  
      // Table Rows
      details.forEach((row, i) => {
        doc
          .fillColor(i % 2 === 0 ? YELLOW_LIGHT : 'white')
          .rect(startX, y, col1, rowH).fill()
          .rect(startX + col1, y, col2, rowH).fill();
  
        doc
          .fillColor('#222')
          .fontSize(11)
          .font('Helvetica')
          .text(row[0], startX + 10, y + 8, { width: col1 - 20 })
          .text(row[1], startX + col1 + 10, y + 8, { width: col2 - 20 });
  
        y += rowH;
      });
  
      // --- Documents Section ---
      y += 20;
      doc
        .fontSize(16)
        .fillColor(YELLOW)
        .font('Helvetica-Bold')
        .text('Uploaded Documents', startX, y);
  
      y += 30;
  
      // Documents Table Header
      doc
        .fillColor(YELLOW)
        .rect(startX, y, col1, rowH).fill()
        .rect(startX + col1, y, col2, rowH).fill();
  
      doc
        .fillColor(HEADER_TEXT)
        .fontSize(12)
        .font('Helvetica-Bold')
        .text('Type', startX + 10, y + 8)
        .text('Status', startX + col1 + 10, y + 8);
  
      y += rowH;
  
      // Documents Table Rows
      documents.forEach((docu, i) => {
        doc
          .fillColor(i % 2 === 0 ? YELLOW_LIGHT : 'white')
          .rect(startX, y, col1, rowH).fill()
          .rect(startX + col1, y, col2, rowH).fill();
  
        doc
          .fillColor('#222')
          .fontSize(11)
          .font('Helvetica')
          .text(docu.document_type, startX + 10, y + 8, { width: col1 - 20 })
          .text('Uploaded', startX + col1 + 10, y + 8, { width: col2 - 20 });
  
        y += rowH;
      });
  
      doc.end();
  
      stream.on('finish', () => {
        res.json({
          pdf_url: `${process.env.BACKEND_URL}/uploads/${organisation_id}/organisationReport.pdf`
        });
      });
  
    } catch (err) {
      res.status(500).json({ message: "Internal server error", error: err.message });
    }
  };
  
  module.exports.getStaffData = async(req,res) => {
    const id = req.params.id;
    try{
      const organisation = await Organisation.findOne({ where: { id: id } });
      const staff = await Employee.findAll({
          where: { organisation_id: id },
          include: [
              { model: PersonalDetail, as: 'personaldetail', attributes: ['fname', 'mname', 'lname', 'dob', 'nationality_no', 'Nationality', 'contact_1'] },
              { model: JobDetail, as: 'jobdetails', attributes: ['start'] },
              { model: VisaDetail, as: 'visadetail', attributes: ['expiry_date', 'review_date'] },
              { model: PassportDetail, as: 'passportdetail', },
              { model: EsusDetail, as: 'esusdetail', attributes: ['expiry'] },
              { model: DBSDetail, as: 'dbsdetail', attributes: ['expiry'] },
              { model: NationalDetail, as: 'nationaldetail',  }
              ,{ model: ContactInfo, as: 'contact' }

          ]
      });
      const formattedData = staff.map((emp,index) => ({
        "Staff Code" : emp.employee_code || '=',
        "Staff Name" : [emp.personaldetail.fname,emp.personaldetail.mname,emp.personaldetail.lname].filter(Boolean).join(' '), 
        "Address" : [emp.contact.line1,emp.contact.line2,emp.contact.line3,emp.contact.city,emp.contact.country,emp.contact.post_code].filter(Boolean).join(' '),
        "DOB": emp.personaldetail.dob, 
        "Job Start Date":emp.jobdetails.start, 
        "Telephone": emp.personaldetail.contact_1, 
        "Nationality" : emp.personaldetail.Nationality || emp.nationaldetail.nationality, 
        "NI Number" : emp.nationaldetail.national_id, 
        "Visa Expiry" : emp.visadetail.expiry ? `Expires on ${emp.visadetail.expiry} ` : null,
        "Visa Review" :  emp.visadetail.review_date ? `Review on ${emp.visadetail.review_date} ` : null,
        "Passport No": emp.passportdetail.passport_no, 
        "Passport Expiry Date":emp.passportdetail.expiry_date ? `Expires on ${emp.passportdetail.expiry_date}` : '', 
        "EUSS Details" : emp.esusdetail.expiry  ? `Expires on ${emp.esusdetail.expiry}` : '',
        "DBS Details":emp.dbsdetail.expiry  ? `Expires on ${emp.dbsdetail.expiry}` : '', 

      }));
      res.status(200).json(formattedData);
    }
    catch(err){
      
      res.status(500).json({message : 'Internal server error'});
    }
  }

module.exports.generateStaffReport = async (req, res) => {
  const id = req.params.id;
  try {
    const organisation = await Organisation.findOne({ where: { id: id } });
    const staff = await Employee.findAll({
      where: { organisation_id: id },
      order: [["employee_code", "ASC"]],
      include: [
        {
          model: PersonalDetail,
          as: "personaldetail",
          attributes: ["fname", "mname", "lname", "dob", "nationality_no", "Nationality", "contact_1"],
        },
        { model: JobDetail, as: "jobdetails", attributes: ["start"] },
        { model: VisaDetail, as: "visadetail", attributes: ["expiry_date", "review_date"] },
        { model: PassportDetail, as: "passportdetail" },
        { model: EsusDetail, as: "esusdetail", attributes: ["expiry"] },
        { model: DBSDetail, as: "dbsdetail", attributes: ["expiry"] },
        { model: NationalDetail, as: "nationaldetail" },
        { model: ContactInfo, as: "contact" },
      ],
    });

    const dirPath = path.join(__dirname, `../uploads/${id}`);
    const pdfPath = path.join(dirPath, "staffReport.pdf");

    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
    if (fs.existsSync(pdfPath)) fs.unlinkSync(pdfPath);

    const doc = new PDFDocument({
      margin: 30,
      layout: "landscape",
      size: "A3",
      bufferPages: true,
    });

    const stream = fs.createWriteStream(pdfPath);
    doc.pipe(stream);

    // --- Header Bar (Yellow) ---
    doc.rect(0, 0, doc.page.width, 90).fill(HEADER_BG);

    // --- Logo in Circle ---
    if (organisation.Company_Logo) {
      const logoFilename = path.basename(organisation.Company_Logo);
      const logoPath = path.join(__dirname, `../uploads/${organisation.Company_name}/`, logoFilename);
      if (fs.existsSync(logoPath)) {
        doc.save()
          .circle(60, 45, 30)
          .clip()
          .image(logoPath, 30, 15, { width: 60, height: 60 })
          .restore();
      }
    }

    // --- Company Name & Report Title ---
    doc
      .fontSize(22)
      .fillColor(HEADER_TEXT)
      .font('Helvetica-Bold')
      .text(organisation.Company_name, 110, 30, { align: 'left', continued: false });

    doc
      .moveDown(0.2)
      .fontSize(14)
      .fillColor('#6B7280')
      .font('Helvetica')
      .text('Staff Report', 110, 60, { align: 'left' });

    // --- Divider ---
    doc.moveTo(50, 100).lineTo(doc.page.width - 50, 100).strokeColor(BORDER_COLOR).lineWidth(2).stroke();

    // --- Table Setup ---
    const headers = [
      "Sl. No.",
      "Staff Code",
      "Staff Name",
      "Address",
      "DOB",
      "Job Start",
      "Telephone",
      "Nationality",
      "NI Number",
      "Visa Expiry",
      "Visa Review",
      "Passport Expiry",
      "EUSS Details",
      "DBS Details",
    ];

    const tableData = staff.map((emp, index) => [
      (index + 1).toString(),
      emp.employee_code || "-",
      [emp.personaldetail?.fname, emp.personaldetail?.mname, emp.personaldetail?.lname].filter(Boolean).join(" ") || "-",
      [emp.contact?.line1, emp.contact?.line2, emp.contact?.city, emp.contact?.post_code].filter(Boolean).join(", ") || "-",
      emp.personaldetail?.dob ? formatDate(emp.personaldetail.dob) : "-",
      emp.jobdetails?.start ? formatDate(emp.jobdetails.start) : "-",
      emp.personaldetail?.contact_1 || "-",
      emp.personaldetail?.Nationality || emp.nationaldetail?.nationality || "-",
      emp.nationaldetail?.national_id || "-",
      emp.visadetail?.expiry_date ? `Expires on ${formatDate(emp.visadetail.expiry_date)}` : "-",
      emp.visadetail?.review_date ? `Valid for review by ${formatDate(emp.visadetail.review_date)}` : "-",
      emp.passportdetail?.expiry_date ? `Expires on ${formatDate(emp.passportdetail.expiry_date)}` : "-",
      emp.esusdetail?.expiry ? `Expires on ${formatDate(emp.esusdetail.expiry)}` : "-",
      emp.dbsdetail?.expiry ? `Expires on ${formatDate(emp.dbsdetail.expiry)}` : "-",
    ]);

    // Calculate column widths (reuse your helper)
    const colWidths = calculateColumnWidths(doc, headers, tableData, 9, 8);
    const tableWidth = colWidths.reduce((sum, width) => sum + width, 0);
    const pageWidth = doc.page.width - 2 * doc.page.margins.left;
    const startX = doc.page.margins.left + (pageWidth - tableWidth) / 2;
    let currentY = 120;

    // --- Table Header ---
    let x = startX;
    doc.fillColor(YELLOW).rect(startX, currentY, tableWidth, 32).fill();
    doc.fillColor(HEADER_TEXT).fontSize(11).font("Helvetica-Bold");
    headers.forEach((header, i) => {
      doc.text(header, x + 3, currentY + 10, {
        width: colWidths[i] - 6,
        align: "center",
        lineBreak: false,
      });
      x += colWidths[i];
    });
    currentY += 32;

    // --- Table Rows ---
    tableData.forEach((rowData, index) => {
      const rowHeight = calculateRowHeight(doc, rowData, colWidths, 8);
      let x = startX;

      // Zebra striping
      doc
        .fillColor(index % 2 === 0 ? YELLOW_LIGHT : 'white')
        .rect(startX, currentY, tableWidth, rowHeight)
        .fill();

      doc.fillColor("#222").fontSize(8).font("Helvetica");
      rowData.forEach((text, i) => {
        const cellText = text ? text.toString() : "-";
        const align = i === 0 ? "center" : isNumeric(cellText) ? "right" : "left";
        doc.text(cellText, x + 3, currentY + 5, {
          width: colWidths[i] - 6,
          align: align,
          lineBreak: true,
        });
        x += colWidths[i];
      });

      // Draw vertical lines
      x = startX;
      rowData.forEach((_, i) => {
        doc
          .strokeColor("#CCCCCC")
          .lineWidth(0.5)
          .moveTo(x, currentY)
          .lineTo(x, currentY + rowHeight)
          .stroke();
        x += colWidths[i];
      });
      doc
        .strokeColor("#CCCCCC")
        .lineWidth(0.5)
        .moveTo(x, currentY)
        .lineTo(x, currentY + rowHeight)
        .stroke();

      // Draw horizontal line
      doc
        .strokeColor("#CCCCCC")
        .lineWidth(0.5)
        .moveTo(startX, currentY + rowHeight)
        .lineTo(startX + tableWidth, currentY + rowHeight)
        .stroke();

      currentY += rowHeight;

      // Page break
      if (currentY + rowHeight > doc.page.height - doc.page.margins.bottom - 40) {
        doc.addPage();
        currentY = doc.page.margins.top + 20;

        // Redraw table header
        let x = startX;
        doc.fillColor(YELLOW).rect(startX, currentY, tableWidth, 32).fill();
        doc.fillColor(HEADER_TEXT).fontSize(11).font("Helvetica-Bold");
        headers.forEach((header, i) => {
          doc.text(header, x + 3, currentY + 10, {
            width: colWidths[i] - 6,
            align: "center",
            lineBreak: false,
          });
          x += colWidths[i];
        });
        currentY += 32;
      }
    });

    // --- Footer with Page Numbers ---
    let pages = doc.bufferedPageRange();
    for (let i = 0; i < pages.count; i++) {
      doc.switchToPage(i);
      doc.fontSize(9)
        .fillColor('#9CA3AF')
        .text(
          `Page ${i + 1} of ${pages.count}`,
          0,
          doc.page.height - 20,
          { align: 'center' }
        );
    }

    doc.end();

    stream.on("finish", () => {
      res.json({
        pdf_url: `${process.env.BACKEND_URL}/uploads/${id}/staffReport.pdf`,
        message: "Staff report generated successfully",
      });
    });
  } catch (err) {
    console.error("Error generating staff report:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};
  function calculateColumnWidths(doc, headers, data, headerFontSize, contentFontSize) {
    
    const MIN_COL_WIDTH = 40
    const MAX_COL_WIDTH = 150
  
    
    doc.fontSize(headerFontSize)
    const headerWidths = headers.map((header) =>
      Math.min(MAX_COL_WIDTH, Math.max(MIN_COL_WIDTH, doc.widthOfString(header) + 10)),
    )
  
    
    doc.fontSize(contentFontSize)
    const dataWidths = Array(headers.length).fill(MIN_COL_WIDTH)
  
    data.forEach((row) => {
      row.forEach((cell, i) => {
        const cellText = cell ? cell.toString() : "-"
        const cellWidth = doc.widthOfString(cellText) + 10
        dataWidths[i] = Math.max(dataWidths[i], Math.min(MAX_COL_WIDTH, cellWidth))
      })
    })
  
    
    const finalWidths = headerWidths.map((width, i) => Math.max(width, dataWidths[i]))
  
    
    
    const nameIndex = headers.findIndex((h) => h === "Staff Name")
    const addressIndex = headers.findIndex((h) => h === "Address")
  
    if (nameIndex !== -1) finalWidths[nameIndex] = Math.max(finalWidths[nameIndex], 120)
    if (addressIndex !== -1) finalWidths[addressIndex] = Math.max(finalWidths[addressIndex], 150)
  
    
    const slNoIndex = headers.findIndex((h) => h === "Sl. No.")
    if (slNoIndex !== -1) finalWidths[slNoIndex] = 40
  
    return finalWidths
  }
  
  
  function calculateRowHeight(doc, rowData, colWidths, fontSize) {
    doc.fontSize(fontSize)
  
    let maxHeight = 20 
  
    rowData.forEach((cell, i) => {
      const cellText = cell ? cell.toString() : "-"
      const cellHeight = calculateCellHeight(doc, cellText, colWidths[i] - 6, fontSize)
      maxHeight = Math.max(maxHeight, cellHeight)
    })
  
    return maxHeight + 10 
  }
  
  
  function calculateCellHeight(doc, text, width, fontSize) {
    doc.fontSize(fontSize)
  
    if (!text || text === "-") return doc.currentLineHeight()
  
    const textWidth = doc.widthOfString(text)
    if (textWidth <= width) return doc.currentLineHeight()
  
    
    const lines = Math.ceil(textWidth / width)
    return lines * doc.currentLineHeight()
  }
  
  
  function formatDate(dateString) {
    if (!dateString) return "-"
  
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return "-" 
  
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    } catch (e) {
      return "-"
    }
  }
  
  
  function isNumeric(str) {
    if (typeof str !== "string") return false
    return !isNaN(str) && !isNaN(Number.parseFloat(str))
  }
  
  

module.exports.generateCompleteLeaveReport = async (req, res) => {
  try {
    const id = req.params.id;
    const organisation = await Organisation.findOne({ where: { id: id } });
    const outputDir = path.join(__dirname, "../uploads", id);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    const filePath = path.join(outputDir, "LeaveReportAll.pdf");

    const employee_data = await Employee.findAll({
      where: { organisation_id: id },
      order: [["employee_code", "ASC"]],
      include: [
        { model: PersonalDetail, as: "personaldetail", required: false },
        { model: ServiceDetail, as: "servicedetail", required: false },
      ],
    });

    const doc = new PDFDocument({
      margin: 30,
      size: "A3",
      layout: "landscape",
      bufferPages: true
    });

    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // --- Header Bar (Yellow) ---
    doc.rect(0, 0, doc.page.width, 80)
      .fill(HEADER_BG);

    // --- Logo in Circle ---
    if (organisation.Company_Logo) {
      const logoFilename = path.basename(organisation.Company_Logo);
      const logoPath = path.join(__dirname, `../uploads/${organisation.Company_name}/`, logoFilename);
      if (fs.existsSync(logoPath)) {
        doc.save()
          .circle(60, 40, 30)
          .clip()
          .image(logoPath, 30, 10, { width: 60, height: 60 })
          .restore();
      }
    }

    // --- Organisation Name ---
    doc
      .fontSize(22)
      .fillColor(HEADER_TEXT)
      .font('Helvetica-Bold')
      .text(organisation.Company_name, 100, 30, { align: 'left', continued: false });

    // --- Subtitle ---
    doc
      .moveDown(0.2)
      .fontSize(12)
      .fillColor('#6B7280') // Tailwind gray-500
      .font('Helvetica')
      .text('Employee Leave Report (leaves in hand)', 100, 55, { align: 'left' });

    // --- Divider ---
    doc.moveTo(40, 90).lineTo(doc.page.width - 40, 90).strokeColor(BORDER_COLOR).lineWidth(2).stroke();

    // --- Table Setup ---
    const pageWidth = doc.page.width - 60;
    const startX = 30;
    let startY = 110;

    const fixedColumns = [
      { width: 40, title: "Sl. No" },
      { width: 100, title: "Employee ID" },
      { width: 150, title: "Employee Name" },
      { width: 150, title: "Designation" }
    ];

    const leaveColumnWidth = Math.min(
      80,
      (pageWidth - fixedColumns.reduce((sum, col) => sum + col.width, 0)) / 3
    );

    // --- Table Header ---
    let currentX = startX;
    fixedColumns.forEach(column => {
      doc
        .fillColor(YELLOW)
        .rect(currentX, startY, column.width, 32)
        .fill();
      doc
        .fillColor(HEADER_TEXT)
        .fontSize(12)
        .font('Helvetica-Bold')
        .text(column.title, currentX + 8, startY + 10, { width: column.width - 16, align: 'center' });
      currentX += column.width;
    });

    ['Holiday Leaves', 'Medical Leaves', 'Maternity Leaves(if applicable)'].forEach(leave => {
      doc
        .fillColor(YELLOW)
        .rect(currentX, startY, leaveColumnWidth, 32)
        .fill();
      doc
        .fillColor(HEADER_TEXT)
        .fontSize(12)
        .font('Helvetica-Bold')
        .text(leave, currentX + 8, startY + 10, { width: leaveColumnWidth - 16, align: 'center' });
      currentX += leaveColumnWidth;
    });

    startY += 32;

    // --- Table Rows ---
    const { year } = req.query;
    for (let i = 0; i < employee_data.length; i++) {
      const employee = employee_data[i];
      const designation = employee.servicedetail?.designation || "N/A";
      const leave_allocated = await LeaveAllocation.findOne({
        where: { employee_code: employee.employee_code, year },
      });

      currentX = startX;
      const rowHeight = 28;
      const isEvenRow = i % 2 === 0;
      const rowBg = isEvenRow ? YELLOW_LIGHT : 'white';

      // Draw row background
      doc
        .fillColor(rowBg)
        .rect(currentX, startY, fixedColumns[0].width + fixedColumns[1].width + fixedColumns[2].width + fixedColumns[3].width + leaveColumnWidth * 3, rowHeight)
        .fill();

      // Draw cells
      let cellX = currentX;
      [
        String(i + 1),
        employee.employee_code,
        [employee.personaldetail?.fname, employee.personaldetail?.mname, employee.personaldetail?.lname].filter(Boolean).join(" "),
        designation,
        String(leave_allocated?.holiday_leaves_in_hand || ''),
        String(leave_allocated?.medical_leaves_in_hand || ''),
        String(leave_allocated?.maternity_leaves_in_hand || '')
      ].forEach((text, idx) => {
        let width = idx < 4 ? fixedColumns[idx].width : leaveColumnWidth;
        doc
          .fillColor('#222')
          .fontSize(11)
          .font('Helvetica')
          .text(text, cellX + 8, startY + 8, { width: width - 16, align: idx === 0 ? 'center' : 'left' });
        cellX += width;
      });

      startY += rowHeight;

      // --- Page Break ---
      if (startY > doc.page.height - 60) {
        doc.addPage();
        startY = 50;

        // Redraw table header on new page
        currentX = startX;
        fixedColumns.forEach(column => {
          doc
            .fillColor(YELLOW)
            .rect(currentX, startY, column.width, 32)
            .fill();
          doc
            .fillColor(HEADER_TEXT)
            .fontSize(12)
            .font('Helvetica-Bold')
            .text(column.title, currentX + 8, startY + 10, { width: column.width - 16, align: 'center' });
          currentX += column.width;
        });

        ['Holiday Leaves', 'Medical Leaves', 'Maternity Leaves(if applicable)'].forEach(leave => {
          doc
            .fillColor(YELLOW)
            .rect(currentX, startY, leaveColumnWidth, 32)
            .fill();
          doc
            .fillColor(HEADER_TEXT)
            .fontSize(12)
            .font('Helvetica-Bold')
            .text(leave, currentX + 8, startY + 10, { width: leaveColumnWidth - 16, align: 'center' });
          currentX += leaveColumnWidth;
        });

        startY += 32;
      }
    }

    // --- Footer with Page Numbers ---
    let pages = doc.bufferedPageRange();
    for (let i = 0; i < pages.count; i++) {
      doc.switchToPage(i);
      doc.fontSize(9)
        .fillColor('#9CA3AF') // Tailwind gray-400
        .text(
          `Page ${i + 1} of ${pages.count}`,
          0,
          doc.page.height - 20,
          { align: 'center' }
        );
    }

    doc.end();

    writeStream.on("finish", () => {
      res.status(200).json({
        message: "Leave report generated successfully",
        url: `${process.env.BACKEND_URL}/uploads/${id}/LeaveReportAll.pdf`
      });
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error generating leave report",
      error: error.message,
      organisation_id: req.params.id,
    });
  }
};


module.exports.generateEmployeePDF = async (req, res) => {
  try {
    const employee_code = req.params.employee_code;
    const employee = await Employee.findOne({
      where: { employee_code },
      include: [
        { model: PersonalDetail, as: "personaldetail", required: false },
        { model: ServiceDetail, as: "servicedetail", required: false },
      ],
    });

    const year = new Date().getFullYear();
    const leaveA = await LeaveAllocation.findOne({
      where: { employee_code, year : String(year) },
    });

    const org = await Organisation.findOne({
      where: { id: employee.organisation_id },
    });

    // Create directory if it doesn't exist
    const uploadDir = path.join(
      process.cwd(),
      "uploads",
      org.id.toString(),
      "EmployeeReports"
    );
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, `${employee_code}.pdf`);
    const doc = new PDFDocument({ margin: 50 });

    doc.pipe(fs.createWriteStream(filePath));

    // --- Header Bar (Yellow) ---
    doc.rect(0, 0, doc.page.width, 90).fill(HEADER_BG);

    // --- Logo in Circle ---
    if (org.Company_Logo) {
      const logoFilename = path.basename(org.Company_Logo);
      const logoPath = path.join(__dirname, `../uploads/${org.Company_name}/`, logoFilename);
      if (fs.existsSync(logoPath)) {
        doc.save()
          .circle(60, 45, 30)
          .clip()
          .image(logoPath, 30, 15, { width: 60, height: 60 })
          .restore();
      }
    }

    // --- Company Name & Report Title ---
    doc
      .fontSize(22)
      .fillColor(HEADER_TEXT)
      .font('Helvetica-Bold')
      .text(org.Company_name, 110, 30, { align: 'left', continued: false });

    doc
      .moveDown(0.2)
      .fontSize(14)
      .fillColor('#6B7280')
      .font('Helvetica')
      .text('Employee Report', 110, 60, { align: 'left' });

    // --- Divider ---
    doc.moveTo(50, 100).lineTo(doc.page.width - 50, 100).strokeColor(BORDER_COLOR).lineWidth(2).stroke();

    // --- Employee Card ---
    let yPos = 120;
    doc
      .roundedRect(50, yPos, doc.page.width - 100, 110, 16)
      .fill(YELLOW_LIGHT);

    // Profile Picture
    if (employee.servicedetail && employee.servicedetail.profile_pic) {
      const picUrl = employee.servicedetail.profile_pic;
      try {
        const response = await axios.get(picUrl, { responseType: "arraybuffer" });
        const imageBuffer = Buffer.from(response.data);
        doc.save()
          .circle(90, yPos + 55, 40)
          .clip()
          .image(imageBuffer, 50, yPos + 15, { width: 80, height: 80 })
          .restore();
      } catch (error) {
        // ignore image error
      }
    }

    // Employee Name & Code
    doc
      .fillColor(HEADER_TEXT)
      .fontSize(20)
      .font('Helvetica-Bold')
      .text(
        [employee.personaldetail?.fname, employee.personaldetail?.mname, employee.personaldetail?.lname].filter(Boolean).join(" ") || "N/A",
        150,
        yPos + 30
      );
    doc
      .fillColor('#222')
      .fontSize(13)
      .font('Helvetica')
      .text(`Employee Code: ${employee_code}`, 150, yPos + 60);

    yPos += 130;

    // --- Employee Details Section ---
    doc
      .fontSize(16)
      .fillColor(YELLOW)
      .font('Helvetica-Bold')
      .text("Employee Details", 50, yPos);

    doc.moveTo(50, yPos + 22).lineTo(doc.page.width - 50, yPos + 22).stroke(YELLOW);

    yPos += 40;

    function addField(label, value) {
      doc.fillColor(HEADER_TEXT).font("Helvetica-Bold").fontSize(12).text(label, 60, yPos);
      doc.fillColor('#222').font("Helvetica").fontSize(12).text(value || "N/A", 250, yPos);
      yPos += 28;
    }

    addField("Department:", employee.servicedetail?.department);
    addField("Designation:", employee.servicedetail?.designation);
    addField("Employment Type:", employee.servicedetail?.type);
    addField("Contract Start:", employee.servicedetail?.start ? new Date(employee.servicedetail.start).toLocaleDateString() : "N/A");
    addField("Contract End:", employee.servicedetail?.end_if ? new Date(employee.servicedetail.end_if).toLocaleDateString() : "N/A");
    addField("Shift Work In Time:", employee.servicedetail?.work_in);
    addField("Shift Work Out Time:", employee.servicedetail?.work_out);

    yPos += 20;

    // --- Leave Details Section ---
    doc
      .fontSize(16)
      .fillColor(YELLOW)
      .font('Helvetica-Bold')
      .text("Leave Details", 50, yPos);

    doc.moveTo(50, yPos + 22).lineTo(doc.page.width - 50, yPos + 22).stroke(YELLOW);

    yPos += 40;

    addField("Holiday Leaves Left:", leaveA?.holiday_leaves_in_hand);
    addField("Medical Leaves Left:", leaveA?.medical_leaves_in_hand);
    if (leaveA?.maternity_leaves_in_hand !== undefined) {
      addField("Maternity Leaves Left:", leaveA.maternity_leaves_in_hand);
    }

    // --- Footer ---
    const footerY = doc.page.height - 50;
    doc.moveTo(50, footerY).lineTo(doc.page.width - 50, footerY).stroke(BORDER_COLOR);

    doc.fillColor('#9CA3AF')
      .fontSize(10)
      .font("Helvetica")
      .text(`Generated on: ${new Date().toLocaleDateString()}`, 50, footerY + 10);

    doc.fillColor('#9CA3AF')
      .fontSize(10)
      .font("Helvetica")
      .text("Confidential Document", doc.page.width - 200, footerY + 10);

    doc.end();

    res.status(200).json({
      message: "Employee Report generated successfully",
      url: `${process.env.BACKEND_URL}/uploads/${org.id}/EmployeeReports/${employee_code}.pdf`,
    });
  } catch (err) {
    console.error("PDF generation error:", err);
    return res.status(500).json({ message: "Error generating employee report", err });
  }
};