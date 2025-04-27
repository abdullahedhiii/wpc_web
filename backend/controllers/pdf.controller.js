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

module.exports.generateOrganisationReport = async (req, res) => {
    const organisation_id = req.params.id;
  
    try {
      const organisation = await Organisation.findOne({ 
        where: { id: organisation_id }, 
     });
      const documents = await OrgDocument.findAll({where : {organisation_id : organisation_id}})

      const dirPath = path.join(__dirname, `../uploads/${organisation_id}`);
      const pdfPath = path.join(dirPath, "organisationReport.pdf");
  
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
  
      if (fs.existsSync(pdfPath)) {
        fs.unlinkSync(pdfPath);
      }
  
      const doc = new PDFDocument({ margin: 50, size: 'A4' });
      const stream = fs.createWriteStream(pdfPath);
      doc.pipe(stream);
  
      if (organisation.Company_Logo) {
        const logoFilename = path.basename(organisation.Company_Logo);
        const logoPath = path.join(__dirname, `../uploads/${organisation.Company_name}/`, logoFilename);
        
        if (fs.existsSync(logoPath)) {
          const logoSize = 100;
          doc.save()
            .circle(75, 75, logoSize/2)
            .clip()
            .image(logoPath, 25, 25, { width: logoSize, height: logoSize })
            .restore();
        }
      }
  
      doc.fontSize(16).font('Helvetica-Bold')
        .text(organisation.Company_name.toUpperCase(), { align: 'center' })
        .fontSize(12).font('Helvetica')
        .text(`${organisation.Address_Line1 || ''}`, { align: 'center' })
        .text(`${organisation.Address_City_County || ''}, ${organisation.Address_Country || ''}`, { align: 'center' })
        .moveDown()
        .fontSize(14).font('Helvetica-Bold')
        .text('Organisation Report', { align: 'center' })
        .moveDown(2);
  
      const startX = 50;
      const startY = doc.y;
      const colWidth = [50, 200, 250]; 
      const rowHeight = 25;
      let currentY = startY;
  
      
      doc.fillColor('#3057BE')
         .rect(startX, currentY, colWidth[0], rowHeight).fill()
         .rect(startX + colWidth[0], currentY, colWidth[1], rowHeight).fill()
         .rect(startX + colWidth[0] + colWidth[1], currentY, colWidth[2], rowHeight).fill();
  
      doc.fillColor('white')
         .fontSize(11).font('Helvetica-Bold')
         .text('Sl No.', startX + 5, currentY + 7)
         .text('Type', startX + colWidth[0] + 5, currentY + 7)
         .text('Particulars', startX + colWidth[0] + colWidth[1] + 5, currentY + 7);
  
      currentY += rowHeight;
      const documentData = documents.map((doc) => [
        doc.document_type,
        'uploaded'
    ]);
    
      const data = [
        ['Organisation Name', organisation.Company_name],
        ['Type of Organisation', organisation.Company_Type],
        ['Registration Number', organisation.Company_RegNo],
        ['Contact Number', organisation.Company_Contact],
        ['Organisation Email ID', organisation.Company_OrganisationEmail],
        ['Website', organisation.Company_Website],
        ['Trading Name', organisation.Company_TradingName],
        ['Trading Period', '0 to 6 months'],
        ['Name Of Sector', organisation.Company_Sector],
        ['Authorised Person Name', `${organisation.Authorizing_fname || ''} ${organisation.Authorizing_lname || ''}`],
        ['Authorised Person Designation', 'Authorizing officer'],
        ['Authorised Person Email', organisation.Authorizing_email],
    
        
        ['Key Contact Name', `${organisation.KeyContact_fname || ''} ${organisation.KeyContact_lname || ''}`],
        ['Key Contact Designation', organisation.KeyContact_designation],
        ['Key Contact Email', organisation.KeyContact_email],
        ['Key Contact Phone', organisation.KeyContact_phone],
        ['Key Contact Proof ID', organisation.KeyContact_proof_id ? 'uploaded' : ''],
        ['Key Contact History', organisation.KeyContact_history],
    
        
        ['Level 1 Contact Name', `${organisation.Level1_fname || ''} ${organisation.Level1_lname || ''}`],
        ['Level 1 Designation', organisation.Level1_designation],
        ['Level 1 Email', organisation.Level1_email],
        ['Level 1 Phone', organisation.Level1_phone],
        ['Level 1 Proof ID', organisation.Level1_proof_id ? 'uploaded' : ''],
        ['Level 1 History', organisation.Level1_history],
    
        ['Address Postcode', organisation.Address_Postcode || ''],
        ['Address Selection', organisation.Address_Select || ''],
        ['Address Line 1', organisation.Address_Line1 || ''],
        ['Address Line 2', organisation.Address_Line2 || ''],
        ['Address Line 3', organisation.Address_Line3 || ''],
        ['City/County', organisation.Address_City_County || ''],
        ['Country', organisation.Address_Country || ''],
    
        ['RTI First Name', organisation.RTI_fname || ''],
        ['RTI Department', organisation.RTI_department || ''],
        ['RTI Job Type', organisation.RTI_job_type || ''],
        ['RTI Job Title', organisation.RTI_job_title || ''],
        ['RTI Immigration Status', organisation.RTI_Immigration_status || ''],
        
        ...documentData
    ];
    
    
    const pageHeight = doc.page.height - 50; 

data.forEach((row, index) => {
    if (currentY + rowHeight > pageHeight) {
        doc.addPage(); 
        currentY = 50; 

        doc.fillColor('#3057BE')
           .rect(startX, currentY, colWidth[0], rowHeight).fill()
           .rect(startX + colWidth[0], currentY, colWidth[1], rowHeight).fill()
           .rect(startX + colWidth[0] + colWidth[1], currentY, colWidth[2], rowHeight).fill();

        doc.fillColor('white')
           .fontSize(11).font('Helvetica-Bold')
           .text('Sl No.', startX + 5, currentY + 7)
           .text('Type', startX + colWidth[0] + 5, currentY + 7)
           .text('Particulars', startX + colWidth[0] + colWidth[1] + 5, currentY + 7);
        
        currentY += rowHeight;
    }
    const textHeights = [
        doc.heightOfString(row[0], { width: colWidth[1] - 10 }),
        doc.heightOfString(row[1] || '', { width: colWidth[2] - 10 })
    ];
    const maxTextHeight = Math.max(...textHeights, rowHeight); 

    const isEvenRow = index % 2 === 0;
    doc.fillColor(isEvenRow ? '#F0F0F0' : 'white')
       .rect(startX, currentY, sum(colWidth), maxTextHeight).fill();

    doc.fillColor('black')
       .fontSize(10).font('Helvetica')
       .text((index + 1).toString(), startX + 5, currentY + 7, { width: colWidth[0] - 10 })
       .text(row[0], startX + colWidth[0] + 5, currentY + 7, { width: colWidth[1] - 10 })
       .text(row[1] || '', startX + colWidth[0] + colWidth[1] + 5, currentY + 7, { width: colWidth[2] - 10 });

    currentY += maxTextHeight;
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
        "EUSS Details" : `Expires on ${emp.esusdetail.expiry}`,
        "DBS Details":`Expires on ${emp.dbsdetail.expiry} `, 

      }));
      res.status(200).json(formattedData);
    }
    catch(err){
      
      res.status(500).json({message : 'Internal server error'});
    }
  }

  module.exports.generateStaffReport = async (req, res) => {
    const id = req.params.id
    console.log("Generating staff report for organisation ID:", id)
  
    try {
      const organisation = await Organisation.findOne({ where: { id: id } })
      const staff = await Employee.findAll({
        where: { organisation_id: id },
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
      })
  
      const dirPath = path.join(__dirname, `../uploads/${id}`)
      const pdfPath = path.join(dirPath, "staffReport.pdf")
  
      if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true })
      if (fs.existsSync(pdfPath)) fs.unlinkSync(pdfPath)
  
      
      const doc = new PDFDocument({
        margin: 30,
        layout: "landscape",
        size: "A3", 
        bufferPages: true, 
      })
  
      const stream = fs.createWriteStream(pdfPath)
      doc.pipe(stream)
  
      
      const TITLE_FONT_SIZE = 16
      const SUBTITLE_FONT_SIZE = 12
      const HEADER_FONT_SIZE = 9
      const CONTENT_FONT_SIZE = 8
  
      
      if (organisation.Company_Logo) {
        const logoFilename = path.basename(organisation.Company_Logo)
        const logoPath = path.join(__dirname, `../uploads/${organisation.Company_name}/`, logoFilename)
  
        if (fs.existsSync(logoPath)) {
          const logoSize = 80
          doc
            .save()
            .circle(75, 75, logoSize / 2)
            .clip()
            .image(logoPath, 35, 35, { width: logoSize, height: logoSize })
            .restore()
        }
      }
  
      
      doc
        .fontSize(TITLE_FONT_SIZE)
        .font("Helvetica-Bold")
        .text(organisation.Company_name.toUpperCase(), { align: "center" })
        .fontSize(SUBTITLE_FONT_SIZE)
        .font("Helvetica")
        .text(`${organisation.Address_Line1 || ""}`, { align: "center" })
        .text(`${organisation.Address_City_County || ""}, ${organisation.Address_Country || ""}`, { align: "center" })
        .moveDown()
        .fontSize(SUBTITLE_FONT_SIZE)
        .font("Helvetica-Bold")
        .text("Staff Report", { align: "center" })
        .moveDown(1)
  
      
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
      ]
  
      
      const tableData = staff.map((emp, index) => [
        (index + 1).toString(),
        emp.employee_code || "-",
        [emp.personaldetail?.fname, emp.personaldetail?.mname, emp.personaldetail?.lname].filter(Boolean).join(" ") ||
          "-",
        [emp.contact?.line1, emp.contact?.line2, emp.contact?.city, emp.contact?.post_code].filter(Boolean).join(", ") ||
          "-",
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
      ])
  
      
      const colWidths = calculateColumnWidths(doc, headers, tableData, HEADER_FONT_SIZE, CONTENT_FONT_SIZE)
  
      
      const tableWidth = colWidths.reduce((sum, width) => sum + width, 0)
  
      
      const pageWidth = doc.page.width - 2 * doc.page.margins.left
      const startX = doc.page.margins.left + (pageWidth - tableWidth) / 2
  
      
      let currentY = doc.y
  
      
      const totalPages = doc.bufferedPageRange().count
      const addPageNumbers = () => {
        const pages = doc.bufferedPageRange()
        for (let i = 0; i < pages.count; i++) {
          doc.switchToPage(i)
          doc
            .fontSize(8)
            .text(`Page ${i + 1} of ${totalPages}`, doc.page.margins.left, doc.page.height - 20, { align: "center" })
        }
      }
  
      
      const drawTableHeader = (y) => {
        let x = startX
  
        
        doc.fillColor("#3057BE").rect(startX, y, tableWidth, 30).fill()
  
        
        doc.fillColor("white").fontSize(HEADER_FONT_SIZE).font("Helvetica-Bold")
  
        headers.forEach((header, i) => {
          doc.text(header, x + 3, y + 10, {
            width: colWidths[i] - 6,
            align: "center",
            lineBreak: false,
          })
          x += colWidths[i]
        })
  
        return y + 30 
      }
  
      
      const drawTableRow = (data, index, y) => {
        const rowHeight = calculateRowHeight(doc, data, colWidths, CONTENT_FONT_SIZE)
        let x = startX
  
        
        const isEvenRow = index % 2 === 0
        doc
          .fillColor(isEvenRow ? "#F0F0F0" : "white")
          .rect(startX, y, tableWidth, rowHeight)
          .fill()
  
        
        doc.fillColor("black").fontSize(CONTENT_FONT_SIZE).font("Helvetica")
  
        
        let maxCellHeight = 0
  
        
        data.forEach((text, i) => {
          const cellHeight = calculateCellHeight(doc, text, colWidths[i] - 6, CONTENT_FONT_SIZE)
          maxCellHeight = Math.max(maxCellHeight, cellHeight)
        })
  
        
        data.forEach((text, i) => {
          
          const cellText = text ? text.toString() : "-"
  
          
          const align = i === 0 ? "center" : isNumeric(cellText) ? "right" : "left"
  
          doc.text(cellText, x + 3, y + 5, {
            width: colWidths[i] - 6,
            align: align,
            lineBreak: true,
          })
          x += colWidths[i]
        })
  
        
        x = startX
        data.forEach((_, i) => {
          doc
            .strokeColor("#CCCCCC")
            .lineWidth(0.5)
            .moveTo(x, y)
            .lineTo(x, y + rowHeight)
            .stroke()
          x += colWidths[i]
        })
  
        
        doc
          .strokeColor("#CCCCCC")
          .lineWidth(0.5)
          .moveTo(x, y)
          .lineTo(x, y + rowHeight)
          .stroke()
  
        
        doc
          .strokeColor("#CCCCCC")
          .lineWidth(0.5)
          .moveTo(startX, y + rowHeight)
          .lineTo(startX + tableWidth, y + rowHeight)
          .stroke()
  
        return y + rowHeight 
      }
  
      
      currentY = drawTableHeader(currentY)
  
      
      doc
        .strokeColor("#000000")
        .lineWidth(1)
        .moveTo(startX, currentY)
        .lineTo(startX + tableWidth, currentY)
        .stroke()
  
      
      tableData.forEach((rowData, index) => {
        
        const rowHeight = calculateRowHeight(doc, rowData, colWidths, CONTENT_FONT_SIZE)
  
        if (currentY + rowHeight > doc.page.height - doc.page.margins.bottom - 20) {
          doc.addPage()
          currentY = doc.page.margins.top
          currentY = drawTableHeader(currentY)
  
          
          doc
            .strokeColor("#000000")
            .lineWidth(1)
            .moveTo(startX, currentY)
            .lineTo(startX + tableWidth, currentY)
            .stroke()
        }
  
        currentY = drawTableRow(rowData, index, currentY)
      })
  
      
      addPageNumbers()
  
      
      doc.end()
  
      
      stream.on("finish", () => {
        res.json({
          pdf_url: `${process.env.BACKEND_URL}/uploads/${id}/staffReport.pdf`,
          message: "Staff report generated successfully",
        })
      })
    } catch (err) {
      console.error("Error generating staff report:", err)
      res.status(500).json({ message: "Internal server error", error: err.message })
    }
  }
  
  
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
      include: [
        { model: PersonalDetail, as: "personaldetail",required:false },
        { model: ServiceDetail, as: "servicedetail",required:false },
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

    
    const drawTableCell = (text, x, y, width, height, options = {}) => {
      const defaultOptions = {
        align: 'left',
        valign: 'center',
        padding: 5,
        fontSize: 10,
        textColor: 'black',
        backgroundColor: null,
        border: true
      };

      const opts = { ...defaultOptions, ...options };

      if (opts.backgroundColor) {
        doc.fillColor(opts.backgroundColor)
           .rect(x, y, width, height)
           .fill();
      }

      if (opts.border) {
        doc.strokeColor('#cccccc')
           .lineWidth(0.5)
           .rect(x, y, width, height)
           .stroke();
      }

      doc.fillColor(opts.textColor)
         .fontSize(opts.fontSize);

      const textOptions = {
        width: width - (opts.padding * 2),
        align: opts.align,
        lineBreak: true
      };

      
      const textHeight = doc.heightOfString(text, textOptions);
      const textY = y + (height - textHeight) / 2;

      doc.text(text, x + opts.padding, textY, textOptions);
    };

    
    if (organisation.Company_Logo) {
      const logoFilename = path.basename(organisation.Company_Logo);
      const logoPath = path.join(__dirname, `../uploads/${organisation.Company_name}/`, logoFilename);

      if (fs.existsSync(logoPath)) {
        doc.save()
           .circle(75, 75, 50)
           .clip()
           .image(logoPath, 25, 25, { width: 100, height: 100 })
           .restore();
      }
    }

    
    doc.fontSize(16)
       .font('Helvetica-Bold')
       .text(organisation.Company_name.toUpperCase(), { align: 'center' })
       .fontSize(12)
       .font('Helvetica')
       .text(`${organisation.Address_Line1 || ''}`, { align: 'center' })
       .text(`${organisation.Address_City_County || ''}, ${organisation.Address_Country || ''}`, { align: 'center' })
       .moveDown()
       .fontSize(14)
       .font('Helvetica-Bold')
       .text('EMPLOYEE LEAVE REPORT(leaves in hand)', { align: 'center' })
       .moveDown(2);

    
    const pageWidth = doc.page.width - 60;
    const startX = 30;
    let startY = 200;
    
    
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

    
    let currentX = startX;
    
    
    fixedColumns.forEach(column => {
      drawTableCell(
        column.title,
        currentX,
        startY,
        column.width,
        30,
        {
          backgroundColor: '#2c5282',
          textColor: 'white',
          align: 'center',
          fontSize: 10,
          padding: 5
        }
      );
      currentX += column.width;
    });

    
    ['Holiday Leaves','Medical Leaves','Maternity Leaves(if applicable)'].forEach(leave => {
      drawTableCell(
        leave,
        currentX,
        startY,
        leaveColumnWidth,
        30,
        {
          backgroundColor: '#2c5282',
          textColor: 'white',
          align: 'center',
          fontSize: 10,
          padding: 5
        }
      );
      currentX += leaveColumnWidth;
    });

    startY += 30;
    const {year} = req.query;
    for (let i = 0; i < employee_data.length; i++) {
      const employee = employee_data[i];
      const designation = employee.servicedetail.designation
    
      const leave_allocated = await LeaveAllocation.findOne({
        where: { employee_code: employee.employee_code, year},
      });
        
      currentX = startX;
      const rowHeight = 25;
      
      drawTableCell(String(i + 1), currentX, startY, fixedColumns[0].width, rowHeight, { align: "center" });
      currentX += fixedColumns[0].width;
    
      drawTableCell(employee.employee_code, currentX, startY, fixedColumns[1].width, rowHeight, { align: "left" });
      currentX += fixedColumns[1].width;
    
      drawTableCell(
        [employee.personaldetail.fname, employee.personaldetail.mname, employee.personaldetail.lname].filter(Boolean).join(" "),
        currentX,
        startY,
        fixedColumns[2].width,
        rowHeight,
        { align: "left" }
      );
      currentX += fixedColumns[2].width;
    
      drawTableCell(
        designation ? designation : "N/A",
        currentX,
        startY,
        fixedColumns[3].width,
        rowHeight,
        { align: "left" }
      );
      currentX += fixedColumns[3].width;
    
      drawTableCell(
        String(leave_allocated?.holiday_leaves_in_hand || ''),
        currentX,
        startY,
        leaveColumnWidth,
        rowHeight,
        { align: "center" }
      );
      currentX += leaveColumnWidth;

      drawTableCell(
        String(leave_allocated?.medical_leaves_in_hand || ''),
        currentX,
        startY,
        leaveColumnWidth,
        rowHeight,
        { align: "center" }
      );
      currentX += leaveColumnWidth;

      drawTableCell(
        String(leave_allocated?.maternity_leaves_in_hand || ''),
        currentX,
        startY,
        leaveColumnWidth,
        rowHeight,
        { align: "center" }
      );
      currentX += leaveColumnWidth;
      
      startY += rowHeight;
    
      
      if (startY > doc.page.height - 50) {
        doc.addPage();
        startY = 50;
    
        
        currentX = startX;
        fixedColumns.forEach(column => {
          drawTableCell(column.title, currentX, startY, column.width, 30, {
            backgroundColor: "#2c5282",
            textColor: "white",
            align: "center",
          });
          currentX += column.width;
        });
    
        ['Holiday Leaves','Medical Leaves','Maternity Leaves(if applicable)'].forEach(leave => {
          drawTableCell(leave, currentX, startY, leaveColumnWidth, 30, {
            backgroundColor: "#2c5282",
            textColor: "white",
            align: "center",
          });
          currentX += leaveColumnWidth;
        });
    
        startY += 30;
      }
    }
    

    
    let pages = doc.bufferedPageRange();
    for (let i = 0; i < pages.count; i++) {
      doc.switchToPage(i);
      doc.fontSize(8)
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
        url : `${process.env.BACKEND_URL}/uploads/${id}/LeaveReportAll.pdf` 
        ,
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
      where: {
        employee_code,
      },
      include: [
        {
          model: PersonalDetail,
          as: "personaldetail",
          required: false,
        },
        {
          model: ServiceDetail,
          as: "servicedetail",
          required: false,
        },
      ],
    });

    const year = new Date().getFullYear();
    const leaveA = await LeaveAllocation.findOne({
      where: {
        employee_code,
        year,
      },
    });

    const org = await Organisation.findOne({
      where: {
        id: employee.organisation_id,
      },
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

    const primaryColor = "#1a73e8";
    const secondaryColor = "#f1f8ff";
    const textColor = "#333333";

    async function addImage(url, x, y, options = {}) {
      if (!url) return Promise.resolve();
      
      try {
        const response = await axios.get(url, { responseType: "arraybuffer" });
        const imageBuffer = Buffer.from(response.data);
        
        const width = options.width || 100;
        const height = options.height || 100;
        
        doc.image(imageBuffer, x, y, { 
          width, 
          height, 
          ...options 
        });
        
        return Promise.resolve();
      } catch (error) {
        console.error("Error loading image:", error.message);
        return Promise.resolve();
      }
    }

    function formatName(personalDetail) {
      if (!personalDetail) return "N/A";
      
      const nameParts = [];
      if (personalDetail.fname) nameParts.push(personalDetail.fname);
      if (personalDetail.mname) nameParts.push(personalDetail.mname);
      if (personalDetail.lname) nameParts.push(personalDetail.lname);
      
      return nameParts.length > 0 ? nameParts.join(" ") : "N/A";
    }

    function formatDate(dateString) {
      if (!dateString) return "N/A";
      
      const date = new Date(dateString);
      return date.toLocaleDateString();
    }

    function addField(label, value, y) {
      doc.fillColor(primaryColor).font("Helvetica-Bold").text(label, 100, y);
      doc.fillColor(textColor).font("Helvetica").text(value || "N/A", 300, y);
      return y + 25;
    }
    doc.rect(0, 0, doc.page.width, 120).fill(primaryColor);
    doc.fillColor("white").fontSize(24).font("Helvetica-Bold").text("Employee Report", 50, 50);
    
    doc.fillColor("white")
       .fontSize(16)
       .font("Helvetica")
       .text(org.Company_name || "Company Name", 50, 80);

    if (org.Company_Logo) {
      await addImage(org.Company_Logo, 450, 40, { width: 100, height: 80 });
    }

    let yPos = 150;
    
    doc.rect(50, yPos, doc.page.width - 100, 100).fill(secondaryColor);
    
    if (employee.servicedetail && employee.servicedetail.profile_pic) {
      await addImage(employee.servicedetail.profile_pic, 60, yPos + 10, { width: 80, height: 80 });
    }
    
    doc.fillColor(primaryColor)
       .fontSize(18)
       .font("Helvetica-Bold")
       .text(formatName(employee.personaldetail), 150, yPos + 20);
    
    doc.fillColor(textColor)
       .fontSize(14)
       .font("Helvetica")
       .text(`Employee Code: ${employee_code}`, 150, yPos + 45);
    
    yPos = 280;
    
    doc.fillColor(primaryColor)
       .fontSize(16)
       .font("Helvetica-Bold")
       .text("Employee Details", 50, yPos);
    
    doc.moveTo(50, yPos + 20).lineTo(550, yPos + 20).stroke(primaryColor);
    
    yPos += 40;
    
    yPos = addField("Department:", employee.servicedetail?.department, yPos);
    yPos = addField("Designation:", employee.servicedetail?.designation, yPos);
    yPos = addField("Employment Type:", employee.servicedetail?.type, yPos);
    yPos = addField("Contract Start:", formatDate(employee.servicedetail?.start), yPos);
    yPos = addField("Contract End:", formatDate(employee.servicedetail?.end_if), yPos);
    yPos = addField("Shift Work In Time:", employee.servicedetail?.work_in, yPos);
    yPos = addField("Shift Work Out Time:", employee.servicedetail?.work_out, yPos);
    
    yPos += 20;
    
    doc.fillColor(primaryColor)
       .fontSize(16)
       .font("Helvetica-Bold")
       .text("Leave Details", 50, yPos);
    
    doc.moveTo(50, yPos + 20).lineTo(550, yPos + 20).stroke(primaryColor);
    
    yPos += 40;
    
    yPos = addField("Holiday Leaves Left:", leaveA?.holiday_leaves_in_hand, yPos);
    yPos = addField("Medical Leaves Left:", leaveA?.medical_leaves_in_hand, yPos);
    
    if (leaveA?.maternity_leaves_in_hand !== undefined) {
      yPos = addField("Maternity Leaves Left:", leaveA.maternity_leaves_in_hand, yPos);
    }
    
    const footerY = doc.page.height - 50;
    doc.moveTo(50, footerY).lineTo(550, footerY).stroke(primaryColor);
    
    doc.fillColor(textColor)
       .fontSize(10)
       .font("Helvetica")
       .text(`Generated on: ${new Date().toLocaleDateString()}`, 50, footerY + 10);
    
    doc.fillColor(textColor)
       .fontSize(10)
       .font("Helvetica")
       .text("Confidential Document", 450, footerY + 10);
    
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