"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFormHandler } from "./hooks/useFormHandler";

const Form = ({ values, config, loading, validationSchema }) => {
  const { register, handleSubmit, formState, clearErrors, reset, setError, getValues } = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: yupResolver(validationSchema),
    defaultValues: values,
    shouldFocusError: false,
  });
  const { errors } = formState;

  const submitFn = (values) => {
    const fn = config?.buttons?.submit?.fn;

    if (fn) return fn({ values, setError, errors, reset });

    return console.warn("No submit handler defined");
  };

  useEffect(() => {
    reset(values);
  }, [values]);

  const { renderInput, renderButtons } = useFormHandler({ register, errors, clearErrors, loading });
  return (
    <form
      className="h-full w-full flex flex-col overflow-hidden"
      onSubmit={handleSubmit((values) => submitFn(values))}
    >
      <div className="flex justify-center items-center p-2 text-lg">
        <span>{config.title ?? "Form Title"}</span>
      </div>
      <div className="flex-1 flex flex-col w-full overflow-auto border-gray-200 justify-center p-4 gap-4">
        {config?.layout?.map((row, rowIndex) => (
          <div key={rowIndex} className=" flex gap-4">
            {row.map((col, colIndex) => {
              const field = config.fields.find((field) => field.key === col.key);
              if (!field) return null;
              return field.customRender
                ? field.customRender(field, colIndex)
                : renderInput(field, colIndex);
            })}
          </div>
        ))}
      </div>
      {config?.buttons && (
        <div className="flex justify-end items-center p-2 gap-4">
          {renderButtons(config.buttons, getValues)}
        </div>
      )}
    </form>
  );
};

export default Form;
