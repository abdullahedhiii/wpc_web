import jsPDF from "jspdf";
import "jspdf-autotable";

const PDFGenerator = ({ title, headings, data, filename }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.text(title || "Report", 14, 10);

    // Format the table
    doc.autoTable({
      head: [headings], // Table headings
      body: data, // Table data (array of arrays)
      startY: 20,
      theme: "grid",
      styles: { fontSize: 8 },
      headStyles: { fillColor: [41, 128, 185] }, // Blue header
      bodyStyles: { textColor: 50 },
    });

    // Save file
    doc.save(`${filename || "report"}.pdf`);
  };

  return (
    <button onClick={generatePDF} className="pdf-button">
      📄 Download PDF
    </button>
  );
};

export default PDFGenerator;
