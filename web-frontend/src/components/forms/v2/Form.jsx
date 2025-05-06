"use client";
import React, { useEffect, forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFormHandler } from "../hooks/useFormHandler";

const Form = forwardRef(({ values, config, loading, validationSchema }, ref) => {
  const { register, trigger, formState, clearErrors, reset, setError, getValues } = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: yupResolver(validationSchema),
    defaultValues: values,
    shouldFocusError: false,
  });
  const { errors } = formState;

  useImperativeHandle(ref, () => ({
    getValues,
    setError,
    getErrors: () => errors,
    handleTrigger: trigger,
  }));

  useEffect(() => {
    reset(values);
  }, [values]);

  const { renderInput } = useFormHandler({ register, errors, clearErrors, loading });
  return (
    <form className="h-full w-full overflow-auto ">
      <div className="flex flex-col w-full p-4 gap-4 ">
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
    </form>
  );
});

export default Form;
