"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useRegistration } from "../hooks/useRegistration";
import { getValidationSchema, getInitialValues } from "../util/form.util";
import { getFormConfig } from "../config/form.config";
import AccountType from "../components/registration-steps/AccountType";
import Form from "@/components/forms/newForm/FormNew";
import { validateOrgEmail, validateUserEmail } from "@/api/auth";

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
        if (type === "individual" && step === 0) return prev + 2;
        return Math.min(prev + 1, MAX_STEP);
      }
      if (direction === "prev") {
        if (type === "individual" && step === 2) return prev - 2;
        return Math.max(prev - 1, MIN_STEP);
      }
      return prev;
    });
  };

  const handlePrev = () => handlePageChange("prev");

  const handleNext = (values) => {
    if (step < MAX_STEP) handlePageChange("next");
  };

  const persistAndBlock = ({ values, field, message, setError }) => {
    setError(field, { type: "manual", message });
    setFormData((prev) => ({ ...prev, ...values }));
    setLoading(false);
  };

  const handleValidate = async ({ values, setError }) => {
    try {
      setLoading(true);
      if (step === 1) {
        const { organization } = values;
        const res = await validateOrgEmail(organization?.email);
        if (!res.ok && res.status === 409) {
          return persistAndBlock({
            values,
            field: "organization.email",
            message: "This email is already taken.",
            setError,
          });
        }
      }

      if (step === 3) {
        const { user } = values;
        const res = await validateUserEmail(user?.email);
        if (!res.ok && res.status === 409) {
          return persistAndBlock({
            values,
            field: "user.email",
            message: "This email is already taken.",
            setError,
          });
        }
      }

      setFormData((prev) => ({ ...prev, ...values }));
      handleNext(values);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const validationSchema = getValidationSchema(step);
  const config = getFormConfig({ step, onSubmit: handleValidate, onCancel: handlePrev });

  const values = (() => {
    const defaultValues = getInitialValues(type);

    return { ...defaultValues, ...formData };
  })();

  return (
    <div className="w-full h-full p-10 flex items-center justify-center">
      <div className="h-[350px] w-[350px] max-w-[400px] flex flex-col">
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
              values={values}
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
