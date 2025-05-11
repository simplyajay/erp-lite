import React from "react";

const get = (obj, path) => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};

export const FormField = ({ field, register, errors, onFocus, className }) => {
  const error = get(errors, field.key);

  const props = {
    ...register,
    id: field.key,
    className: `${className} input text-body-sm ${error ? "input-error" : ""}`,
    placeholder: field.placeholder || "",
    onFocus,
  };

  const renderInput = () => {
    try {
      switch (field.type) {
        case "select":
          return (
            <select {...props}>
              <option value="default">
                {field.defaultOption ? field.defaultOption : "-- Select --"}
              </option>
              {field.options?.map((option, i) => (
                <option key={i} value={option.key ? option.key : option} className="p-3">
                  {option.value ? option.value : option}
                </option>
              ))}
            </select>
          );

        case "textarea":
          return <textarea {...props} autoComplete="off"></textarea>;

        default:
          return <input {...props} type={field.type || "text"} />;
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={field.type === "checkbox" ? "flex items-center gap-2" : ""}>
      {field.type === "checkbox" && (
        <label htmlFor={field.key} className="text-body-sm font-semibold">
          {field.label}
        </label>
      )}
      {renderInput()}
    </div>
  );
};

export default FormField;
