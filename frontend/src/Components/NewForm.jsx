const NewForm = ({ icon, title, fields, data, setData, onSubmit, reset, handleReset }) => {

  const handleChange = (e, field) => {
    const { name, value, checked, type } = e.target;
    console.log('here to changed ', name, value);

    if (type === "file") {
      setData((prev) => ({
        ...prev,
        [name]: e.target.files[0],
      }));
    } else if (type === "checkbox") {
      setData((prev) => ({
        ...prev,
        [name]: checked, // Handle checkbox values (true/false)
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const renderField = (field) => {
    switch (field.type) {
      case "select":
        return (
          <select
            name={field.name}
            value={data[field.name] || ""}
            onChange={(e) => handleChange(e, field)}
            className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-700 focus:border-b-2"
          >
            {field.options?.map((option) => (
              <option key={option.value} value={option.value} className="text-gray-900">
                {option.label}
              </option>
            ))}
          </select>
        );
      case "checkbox":
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              name={field.name}
              checked={data[field.name] || false}
              onChange={(e) => handleChange(e, field)}
              className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor={field.name} className="ml-2 text-sm font-medium text-gray-700">
              {field.label}
            </label>
          </div>
        );
      case "file":
        return (
          <input
            type="file"
            name={field.name}
            onChange={(e) => handleChange(e, field)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            accept={field.accept}
            readOnly={field.readOnly}
          />
        );
      default:
        return (
          <input
            type={field.type || "text"}
            name={field.name}
            value={data[field.name] || ""}
            onChange={(e) => handleChange(e, field)}
            className={`w-full p-2 border border-gray-300 ${field.readOnly ? "bg-gray-200" : undefined} rounded-md focus:outline-none focus:border-blue-700 focus:border-b-2`}
            readOnly={field.readOnly}
          />
        );
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-md border-1 border-t-4 border-t-tt shadow-xl">
      <div className="mb-6 p-2 flex items-center space-x-2 border-b-2">
        <i className={`${icon} text-blue-900 text-[15px]`}></i>
        <h1 className="text-[15px] font-semibold text-blue-900">{title}</h1>
      </div>

      <form onSubmit={onSubmit}>
        <div className="px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col">
              {field.type !== 'checkbox' && <label htmlFor={field.name} className="mb-2 text-sm font-medium text-gray-700">
                {field.label}
              </label>}
              {renderField(field)}
            </div>
          ))}
        </div>

        <div className="p-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>

          {reset && (
            <button
              type="button"
              className="m-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={handleReset}
            >
              Reset
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default NewForm;
