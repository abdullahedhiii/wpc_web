import { useEffect } from "react";
import { useCompanyContext } from "../../contexts/CompanyContext";
import DataTable from "../DataTable";

const PaymentType = () => {
    const columns = [
        "Sl. No.",
        "Payment Type",
        "Minimum Working Hour",
        "Rate",
        "Action",
    ];
    const {paymentTypes,fetchPaymentTypes} = useCompanyContext();
    
    useEffect(() => {
        fetchPaymentTypes();
    },[]);

    return(
        <div className="m-12">
        <p className="text-gray-400 mb-4 text-[12px]">
          Home / HCM Master<span className="text-tt"> /Payment Type</span>
        </p>
        <DataTable
          title="Tax Master"
          fields={columns}
          data={paymentTypes}
          showEntries
          searchable
          downloadable = {false}
          addMore = {true}
          buttonTitle = "Add New Payment Type"

        />
        </div> 

    );
};

export default PaymentType;