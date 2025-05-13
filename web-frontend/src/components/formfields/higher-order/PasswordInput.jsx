"use client";
import React, { useState } from "react";
import FormField from "../FormField";
import { EyeIcon, EyeOffIcon } from "@/components/icons/Icons";
import { get } from "lodash";

const withPasswordInput = (Component) => (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const { field, register, clearErrors, errors, disabled } = props;
  const error = get(errors, field.key);

  const fieldProps = {
    ...props,
    autocomplete: "off",
    field: {
      ...field,
      type: showPassword ? "text" : "password",
    },
    register: register(field.key),
    onFocus: (e) => {
      clearErrors(field.key);
      props.onFocus?.(e);
    },
  };

  return (
    <div className="w-full flex flex-col gap-1">
      {field.type !== "checkbox" && (
        <label htmlFor={field.key} className="text-body-sm font-semibold">
          {field?.label}
        </label>
      )}
      <div className="relative w-full ">
        <Component {...fieldProps} className="pr-12" />

        <button
          tabIndex={-1}
          disabled={disabled}
          type="button"
          className="absolute inset-y-0 right-0 flex items-center p-2 border-l border-gray-400 text-gray-500 cursor-pointer disabled:cursor-default"
          onClick={(e) => {
            e.preventDefault();
            setShowPassword((prev) => !prev);
          }}
        >
          {showPassword ? (
            <EyeIcon width="1.5em" height="1.5em" />
          ) : (
            <EyeOffIcon width="1.5em" height="1.5em" />
          )}
        </button>
      </div>

      {error?.message && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

const PasswordInput = withPasswordInput(FormField);

export default PasswordInput;
