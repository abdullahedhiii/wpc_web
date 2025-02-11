import PDFGenerator from "../../PDFGenerator"
import DataTable from "../DataTable";

const StaffReport = () => {

      const headings = [
        "Staff Code",
        "Staff Name",
        "Address",
        "DOB",
        "Job Start Date",
        "Telephone",
        "Nationality",
        "NI Number",
        "Visa Expiry Date",
        "Visa Review",
        "Passport No.",
        "Passport Expiry Date",
        "EUSS Details",
        "DBS Details",
        "National Id Details"
      ];
      
      const data = [
        {
          "Staff Code": "MAR6001",
          "Staff Name": "",
          "Address": "448 Marston Road, Oxford, OX3 0JE, UK",
          "DOB": "10/04/1996",
          "Job Start Date": "01/11/2024",
          "Telephone": "07586295823",
          "Nationality": "India",
          "NI Number": "SW690895D",
          "Visa Expiry Date": "26/01/2025",
          "Visa Review": "26/12/2024",
          "Passport No.": "M8823219",
          "Passport Expiry Date": "06/05/2025",
          "EUSS Details": "",
          "DBS Details": "",
          "National Id Details": ""
        }
      ];
      
      return (
        <div className="m-16">
        <p className="text-[14px] text-gray-400 mb-4">
          Home <span className="text-tt"> / Late Policy</span>
        </p>
        <DataTable
          title="Staff Report"
          fields={headings}
          data={data}
          showEntries
          searchable
          downloadable={true}
          addMore={false}
          buttonTitle = "Download report in pdf"
        />
      </div>
    )
    };

export default StaffReport;