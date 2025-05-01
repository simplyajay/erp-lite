"use client";
import React, { useState, useEffect, useMemo } from "react";
import { getValidationSchema, getInitialValues } from "../util/form.util";
import { getFormConfig } from "../config/form.config";
import AccountType from "../components/registration-steps/AccountType";
import Form from "@/components/forms/newForm/FormNew";
import { validateFields } from "@/api/auth";

const RegistrationPage = () => {
  const [type, setType] = useState(undefined);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const MIN_STEP = 0;
  const MAX_STEP = 5;

  const handlePageChange = (direction) => {
    setStep((prev) => {
      if (direction === "next") {
        if (type === "individual" && step === 0) return prev + 2; //skip 1 stem if acc type is individual
        return Math.min(prev + 1, MAX_STEP);
      }
      if (direction === "prev") {
        if (type === "individual" && step === 2) return prev - 2;
        return Math.max(prev - 1, MIN_STEP);
      }
      return prev;
    });
  };

  const handlePrev = () => step > MIN_STEP && handlePageChange("prev");

  const handleNext = () => step < MAX_STEP && handlePageChange("next");

  const handleCancel = (values) => {
    setFormData((prev) => ({ ...prev, ...values }));
    handlePrev();
  };
  const handleValidate = async ({ values, setError }) => {
    try {
      setLoading(true);
      setFormData((prev) => ({ ...prev, ...values }));

      if (step === 1 || step === 3) {
        const { organization, user } = values;
        const entity = step === 1 ? "organization" : "user";
        const currentValues = step === 1 && organization ? organization : user;
        const res = await validateFields(currentValues, { params: { entity } });
        if (!res.ok && res.status === 409) {
          const key = Object.keys(res.data)[0]; // access key inside keyValue from error
          setError(`${entity}.${key}`, { type: "manual", message: res.message });
          setLoading(false);
          return;
        }
      }

      handleNext();
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const validationSchema = getValidationSchema(step);
  const config = getFormConfig({ step, onSubmit: handleValidate, onCancel: handleCancel });

  useEffect(() => {
    if (!type) return;

    const values = getInitialValues(type);

    if (step === 0) setFormData(values);
    setFormData((prev) => ({ ...values, ...prev }));
  }, [type, step]);

  return (
    <div className="w-full h-full p-10 flex items-center justify-center">
      <div className="h-[350px] w-[350px] max-w-[400px] flex flex-col">
        {`step: ${step}`}
        <div className="flex-1 flex justify-center items-center">
          {step === MIN_STEP && (
            <AccountType
              setSelected={(selectedType) => {
                setType(selectedType);
                setFormData(getInitialValues(selectedType));
              }}
              selected={type}
              onButtonClick={() => handlePageChange("next")}
            />
          )}
          {step > MIN_STEP && step < MAX_STEP && (
            <Form
              values={formData}
              validationSchema={validationSchema}
              config={config}
              loading={loading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
