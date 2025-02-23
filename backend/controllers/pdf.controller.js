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
  
      // Draw Table Headers
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
    console.log(documentData);
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
        ['Authorised Person Name', `${organisation.Authorizing_fname} ${organisation.Authorizing_lname}`],
        ['Authorised Person Designation', 'Authorizing officer'],
        ['Authorised Person Email', organisation.Authorizing_email],
    
        // Key Contact Information
        ['Key Contact Name', `${organisation.KeyContact_fname} ${organisation.KeyContact_lname}`],
        ['Key Contact Designation', organisation.KeyContact_designation],
        ['Key Contact Email', organisation.KeyContact_email],
        ['Key Contact Phone', organisation.KeyContact_phone],
        ['Key Contact Proof ID', organisation.KeyContact_proof_id ? 'uploaded' : ''],
        ['Key Contact History', organisation.KeyContact_history],
    
        // Level 1 Contact Information
        ['Level 1 Contact Name', `${organisation.Level1_fname} ${organisation.Level1_lname}`],
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
    
    console.log(data.length);
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
    const maxTextHeight = Math.max(...textHeights, rowHeight); // Ensure a minimum row height

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
          pdf_url: `http://localhost:${process.env.PORT || 3000}/uploads/${organisation_id}/organisationReport.pdf` 
        });
      });
  
    } catch (err) {
      console.error(err);
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
      console.log('errorrr ',err);
      res.status(500).json({message : 'Internal server error'});
    }
  }
  module.exports.generateStaffReport = async (req, res) => {
    const id = req.params.id;

    try {
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

        const dirPath = path.join(__dirname, `../uploads/${id}`);
        const pdfPath = path.join(dirPath, "staffReport.pdf");

        if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
        if (fs.existsSync(pdfPath)) fs.unlinkSync(pdfPath);

        const doc = new PDFDocument({ margin: 50, size: 'A4' });
        const stream = fs.createWriteStream(pdfPath);
        doc.pipe(stream);

        if (organisation.Company_Logo) {
            const logoFilename = path.basename(organisation.Company_Logo);
            const logoPath = path.join(__dirname, `../uploads/${organisation.Company_name}/`, logoFilename);

            if (fs.existsSync(logoPath)) {
                const logoSize = 100;
                doc.save()
                    .circle(75, 75, logoSize / 2)
                    .clip()
                    .image(logoPath, 25, 25, { width: logoSize, height: logoSize })
                    .restore();
            }
        }

        doc.fontSize(16).font('Helvetica-Bold').text(organisation.Company_name.toUpperCase(), { align: 'center' })
            .fontSize(12).font('Helvetica')
            .text(`${organisation.Address_Line1 || ''}`, { align: 'center' })
            .text(`${organisation.Address_City_County || ''}, ${organisation.Address_Country || ''}`, { align: 'center' })
            .moveDown()
            .fontSize(14).font('Helvetica-Bold')
            .text('Staff Report', { align: 'center' })
            .moveDown(2);

        // Table Headers
        const startX = 50;
        let currentY = doc.y;
   

        const headers = [
          "Sl. No.",
          "Staff Code",
          "Staff Name",
          "Address",
          "DOB",
          "Job Start Date",
          "Telephone",
          "Nationality",
          "NI Number",
          "Visa Expiry",
          "Visa Review",
          "Passport Expiry Date",
          "EUSS Details",
          "DBS Details",
        ];
        const colWidth = [30, 50, 90, 70, 50, 70, 50, 60, 60, 60, 60, 60, 60, 60]; // Adjusted widths
        const rowHeight = 100; // Reduce row height for better fitting
        
        // Adjust font sizes
        doc.fontSize(10).font('Helvetica-Bold').text('Staff Report', { align: 'center' }).moveDown(2);
        doc.fontSize(9);
        
        // Adjust table header
        doc.fillColor('#3057BE')
            .rect(startX, currentY, colWidth.reduce((a, b) => a + b, 0), rowHeight)
            .fill();
        
        doc.fillColor('white').fontSize(9).font('Helvetica-Bold');
        
        headers.forEach((header, i) => {
            doc.text(header, offsetX + 3, currentY + 5, { width: colWidth[i] - 6 });
            offsetX += colWidth[i];
        });
        currentY += rowHeight;

        const pageHeight = doc.page.height - 50;

        staff.forEach((emp, index) => {
            if (currentY + rowHeight > pageHeight) {

                doc.addPage();
                currentY = 50;

                // Re-draw table header on new page
                doc.fillColor('#3057BE')
                    .rect(startX, currentY, colWidth.reduce((a, b) => a + b, 0), rowHeight).fill();
                doc.fillColor('white').fontSize(11).font('Helvetica-Bold');

                offsetX = startX;
                headers.forEach((header, i) => {
                    doc.text(header, offsetX + 5, currentY + 7, { width: colWidth[i] - 10 });
                    offsetX += colWidth[i];
                });

                currentY += rowHeight;
            }

            // Row Data
            const data = [
              (index + 1).toString(), // Ensure it is always a string
              emp.employee_code || '-',
              [emp.personaldetail.fname, emp.personaldetail.mname, emp.personaldetail.lname].filter(Boolean).join(' ') || '-',
              [emp.contact?.line1, emp.contact?.line2, emp.contact?.line3, emp.contact?.city, emp.contact?.country, emp.contact?.post_code]
                  .filter(Boolean)
                  .join(' ') || '-',
              emp.personaldetail?.dob || '-',
              emp.jobdetails?.start || '-',
              emp.personaldetail?.contact_1 || '-',
              emp.personaldetail?.Nationality || emp.nationaldetail?.nationality || '-',
              emp.nationaldetail?.national_id || '-',
              emp.visadetail?.expiry_date ? `Expires on ${emp.visadetail.expiry_date}` : '-',
              emp.visadetail?.review_date ? `Review on ${emp.visadetail.review_date}` : '-',
              emp.passportdetail?.passport_no || '-',
              emp.passportdetail?.expiry_date ? `Expires on ${emp.passportdetail.expiry_date}` : '-',
              emp.esusdetail?.expiry ? `Expires on ${emp.esusdetail.expiry}` : '-',
              emp.dbsdetail?.expiry ? `Expires on ${emp.dbsdetail.expiry}` : '-',
          ];
          
            const isEvenRow = index % 2 === 0;
            doc.fillColor(isEvenRow ? '#F0F0F0' : 'white')
                .rect(startX, currentY, colWidth.reduce((a, b) => a + b, 0), rowHeight).fill();

            doc.fillColor('black').fontSize(10).font('Helvetica');

            offsetX = startX;
            data.forEach((text, i) => {
              if (!text || text === 'NaN') text = '-'; // Replace NaN values
              doc.text(text, offsetX + 5, currentY + 7, { width: colWidth[i] - 10 });
              offsetX += colWidth[i];
          });
          

            currentY += rowHeight;
        });

        doc.end();

        stream.on('finish', () => {
            res.json({
                pdf_url: `http://localhost:${process.env.PORT || 3000}/uploads/${id}/staffReport.pdf`
            });
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};


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
        { model: PersonalDetail, as: "personaldetail" },
        { model: ServiceDetail, as: "servicedetail" },
      ],
    });

    const leaveTypes = await LeaveType.findAll({ where: { organisation_id: id } });

    // Create PDF with A3 landscape for better fit
    const doc = new PDFDocument({ 
      margin: 30, 
      size: "A3", 
      layout: "landscape",
      bufferPages: true
    });
    
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // Helper function to draw table cell
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

      // Calculate vertical centering
      const textHeight = doc.heightOfString(text, textOptions);
      const textY = y + (height - textHeight) / 2;

      doc.text(text, x + opts.padding, textY, textOptions);
    };

    // Add logo and header
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

    // Header text
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
       .text('EMPLOYEE LEAVE REPORT', { align: 'center' })
       .moveDown(2);

    // Table configuration
    const pageWidth = doc.page.width - 60;
    const startX = 30;
    let startY = 200;
    
    // Calculate column widths
    const fixedColumns = [
      { width: 40, title: "Sl. No" },
      { width: 100, title: "Employee ID" },
      { width: 150, title: "Employee Name" },
      { width: 150, title: "Designation" }
    ];
    
    const leaveColumnWidth = Math.min(
      80,
      (pageWidth - fixedColumns.reduce((sum, col) => sum + col.width, 0)) / leaveTypes.length
    );

    // Draw table headers
    let currentX = startX;
    
    // Draw fixed columns headers
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

    // Draw leave type headers
    leaveTypes.forEach(leave => {
      drawTableCell(
        leave.leave_type,
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
      const designation = await Designation.findOne({
        where: { id: employee.servicedetail.designation_id },
      });
    
      const leaveAllocations = await LeaveAllocation.findAll({
        where: { employee_code: employee.employee_code, year},
      });
    
      const leaveMap = new Map(leaveAllocations.map(leave => [leave.leave_type_id, leave]));
    
      currentX = startX;
      const rowHeight = 25;
    
      // Draw fixed columns data
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
        designation ? designation.designation_name : "N/A",
        currentX,
        startY,
        fixedColumns[3].width,
        rowHeight,
        { align: "left" }
      );
      currentX += fixedColumns[3].width;
    
      // Draw leave data using for...of
      for (const leave of leaveTypes) {
        const allocatedLeave = leaveMap.get(leave.id);
        let maxLeave = 0;
    
        if (allocatedLeave) {
          const leaveRule = await LeaveRule.findOne({
            where: { leave_type_id: allocatedLeave.leave_type_id },
          });
    
          maxLeave = leaveRule ? leaveRule.max : 0;
        }
    
        const leaveCount = allocatedLeave ? Math.max(0, allocatedLeave.leave_in_hand - maxLeave) : 0;
    
        drawTableCell(
          String(leaveCount),
          currentX,
          startY,
          leaveColumnWidth,
          rowHeight,
          { align: "center" }
        );
        currentX += leaveColumnWidth;
      }
    
      startY += rowHeight;
    
      // Add new page if needed
      if (startY > doc.page.height - 50) {
        doc.addPage();
        startY = 50;
    
        // Redraw headers on new page
        currentX = startX;
        fixedColumns.forEach(column => {
          drawTableCell(column.title, currentX, startY, column.width, 30, {
            backgroundColor: "#2c5282",
            textColor: "white",
            align: "center",
          });
          currentX += column.width;
        });
    
        leaveTypes.forEach(leave => {
          drawTableCell(leave.leave_type, currentX, startY, leaveColumnWidth, 30, {
            backgroundColor: "#2c5282",
            textColor: "white",
            align: "center",
          });
          currentX += leaveColumnWidth;
        });
    
        startY += 30;
      }
    }
    

    // Add page numbers
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
        filePath 
        ,
      });
    });

  } catch (error) {
    console.error("Error generating leave report:", error);
    return res.status(500).json({
      message: "Error generating leave report",
      error: error.message,
      organisation_id: req.params.id,
    });
  }
};
