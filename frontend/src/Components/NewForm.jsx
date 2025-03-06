import { ChevronRight, Home } from 'lucide-react'
import { Link } from "react-router-dom"

const NewForm = ({ icon, title, fields, data, setData, onSubmit, reset, handleReset }) => {
  const handleChange = (e, field) => {
    const { name, value, checked, type } = e.target

    if (type === "file") {
      setData((prev) => ({ ...prev, [name]: e.target.files[0] }))
    } else if (type === "checkbox") {
      setData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const renderField = (field) => {
    const baseInputStyles = `
      w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700
      placeholder:text-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 
      focus:ring-yellow-400/50 disabled:cursor-not-allowed disabled:opacity-50
      transition-all duration-200 hover:border-yellow-300
    `

    switch (field.type) {
      case "select":
        return (
          <select
  name={field.name}
  value={data[field.name] || ""}
  onChange={(e) => handleChange(e, field)}
  disabled={field.readOnly} // Use disabled instead of readOnly
  className={`${baseInputStyles} pr-10 appearance-none bg-right bg-no-repeat cursor-pointer
    bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 20 20%22%3E%3Cpath stroke=%22%236B7280%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%221.5%22 d=%22m6 8 4 4 4-4%22/%3E%3C/svg%3E')]
    bg-[length:1.5rem_1.5rem]
  `}
  required={field.required}
>
  <option value="" disabled>Select</option>
  {field.options?.map((option) => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ))}
</select>

        )
      case "checkbox":
        return (
          <label className="relative flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              name={field.name}
              checked={data[field.name] || false}
              onChange={(e) => handleChange(e, field)}
              className="peer sr-only"
              required = {field.required}
              readOnly={field.readOnly}

            />
            <div
              className="h-6 w-6 rounded-md border border-gray-300 bg-white transition-all 
              peer-checked:border-yellow-500 peer-checked:bg-yellow-500
              after:absolute after:left-[6px] after:top-[10px] after:h-[8px] after:w-[12px]
              after:-rotate-45 after:border-2 after:border-t-0 after:border-r-0
              after:border-white after:opacity-0 peer-checked:after:opacity-100
              peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
            />
            <span className="text-sm font-medium text-gray-700">{field.label}</span>
          </label>
        )
      case "file":
        return (
          <div className="group relative">
            <input
              type="file"
              name={field.name}
              onChange={(e) => handleChange(e, field)}
              className="hidden"
              accept={field.accept}
              readOnly={field.readOnly}
              id={field.name}
              required = {field.required}

            />
            <label htmlFor={field.name} className={`${baseInputStyles} flex items-center gap-2 cursor-pointer`}>
              <i className="las la-cloud-upload-alt text-xl text-yellow-500" />
              <span className="text-gray-500">{data[field.name]?.name || "Choose a file..."}</span>
            </label>
          </div>
        )
      case "textarea":
        return (
          <textarea
            name={field.name}
            value={data[field.name] || ""}
            onChange={(e) => handleChange(e, field)}
            className={`${baseInputStyles} min-h-[100px] ${field.readOnly ? "bg-gray-100" : ""}`}
            readOnly={field.readOnly}
            placeholder={field.placeholder}
            required = {field.required}

          />
        )
      default:
        return (
          <input
            type={field.type || "text"}
            name={field.name}
            value={data[field.name] || ""}
            onChange={(e) => handleChange(e, field)}
            className={`${baseInputStyles} ${field.readOnly ? "bg-gray-100" : ""}`}
            readOnly={field.readOnly}
            placeholder={field.placeholder}
            required = {field.required}

          />
        )
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
            <nav className="flex items-center space-x-1 text-sm font-medium text-gray-500 mb-6">
        <Link to="/hrms/employeeDashboard" className="flex items-center gap-1.5 text-gray-500 hover:text-yellow-600 transition-colors">
          <Home className="h-4 w-4" />
          <span>Home</span>
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link to="/hrms/settingsdashboard" className="text-gray-500 hover:text-yellow-600 transition-colors">
          Settings
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-gray-900">{title}</span>
      </nav>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="border-b border-gray-200 bg-gradient-to-r from-yellow-50 to-yellow-100">
          <div className="flex items-center gap-3 px-6 py-4">
            <i className={`${icon} text-yellow-600 text-2xl`} />
            <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          </div>
        </div>

        <form onSubmit={onSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fields.map((field) => (
              <div key={field.name} className="space-y-2">
                {field.type !== "checkbox" && (
                  <label htmlFor={field.name} className="text-sm font-medium text-gray-700">
                    {field.label}
                  </label>
                )}
                {renderField(field)}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 
                bg-yellow-500 text-white px-5 py-2.5 hover:bg-yellow-600 focus:outline-none focus:ring-2 
                focus:ring-yellow-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none
                shadow-md hover:shadow-lg"
            >
              <i className="las la-save mr-2 text-xl" />
              Save Changes
            </button>

            {reset && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 
                  border border-gray-300 bg-white text-gray-700 px-5 py-2.5 hover:bg-gray-50 
                  focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 
                  disabled:opacity-50 disabled:pointer-events-none shadow hover:shadow-md"
              >
                <i className="las la-redo-alt mr-2 text-xl" />
                Reset Form
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewForm