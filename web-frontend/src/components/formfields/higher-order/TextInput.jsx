import React from "react";
import FormField from "../FormField";
import { get } from "lodash";

const withTextInput = (Component) => (props) => {
  const { field, register, handleFocus, errors } = props;
  const error = get(errors, field.key);

  const fieldProps = {
    ...props,
    register: register(field.key),
    onFocus: () => handleFocus(field.key),
  };

  return (
    <div className="flex flex-col gap-1">
      {field.type !== "checkbox" && (
        <label htmlFor={field.key} className="text-body-sm font-semibold">
          {field?.label}
        </label>
      )}
      <Component {...fieldProps} />
      {error?.message && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

const TextInput = withTextInput(FormField);

export default TextInput;
