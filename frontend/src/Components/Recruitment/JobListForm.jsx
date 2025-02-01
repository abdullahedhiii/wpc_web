import { useState } from "react";
import { useSidebarContext } from "../../contexts/SidebarContext";
import TextEditor from "./TextEditor";

const JobListForm = () => {
  const { isSideBarOpen } = useSidebarContext();

  const [content, setContent] = useState("");

  const formFields = [
    {
      label: "Job Type",
      type: "select",
      stateAttribute: "jobType",
      options: [
        { value: "", label: "" },
        { value: "Existing", label: "Existing" },
        { value: "New", label: "New" },
      ],
    },
    {
      label: "SOC Code",
      type: "text",
      stateAttribute: "socCode",
    },
    {
      label: "Department",
      type: "text",
      stateAttribute: "department",
    },
    {
      label: "Job Title",
      type: "text",
      stateAttribute: "jobTitle",
    },
  ];

  const [formData, setFormData] = useState({
    jobType: "",
    socCode: "",
    department: "",
    jobTitle: "",
    jobDescription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
   
  const handleJobPost = async(e) => {
    e.preventDefault();
    console.log(content,formData);
  }

  return (
    <div className="m-12">
      <p className="text-[12px] text-gray-600">
        Home
        <span className="mx-2">/</span>
        Job List
        <span className="mx-2 text-tt">/ New Job List</span>
      </p>

      <div
        className={`mt-4 border-t-4 border-blue-600 rounded shadow-md p-2 ${
          isSideBarOpen ? "max-w-[1200px]" : "max-w-[1400px]"
        }`}
      >
        <div className="flex items-center gap-2 pl-2">
          <i className="fas fa-user text-lg text-blue-900"></i>
          <h1 className="text-blue-900 text-lg font-medium">Add Job List</h1>
        </div>
        <hr className="my-4 border-t-1 border-gray-200" />

        <div className="p-4 mt-4">
          <div className="grid grid-cols-3 gap-4">
            {formFields.map((field, index) => (
              <div key={index} className="flex flex-col">
                <label className="text-[12px] font-semibold text-gray-600 mb-2">
                  {field.label}
                </label>
                {field.type === "select" ? (
                  <select
                    name={field.stateAttribute}
                    value={formData[field.stateAttribute]}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md text-gray-600 focus:outline-none focus:border-2 focus:border-blue-400 focus:border-b-4 hover:border-blue-400  hover:border-b-4"
                  >
                    {field.options.map((option, i) => (
                      <option key={i} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.stateAttribute}
                    placeholder={field.label}
                    value={formData[field.stateAttribute]}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md text-gray-600 focus:outline-none focus:border-2 focus:border-blue-400 focus:border-b-4 hover:border-blue-400 hover:border-b-4"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-4">
            <label className="text-[12px] font-semibold text-gray-600 ">
              Job Descriptions
            </label>
            <TextEditor 
               content={content}
               setContent={setContent}
            />
          </div>

            <button onClick={handleJobPost} className="rounded mt-2 px-4 py-2 bg-blue-900 text-white">submit </button>

        </div>

      </div>
    </div>
  );
};

export default JobListForm;
