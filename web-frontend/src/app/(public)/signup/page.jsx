"use client";
import React, { useState, useEffect, useRef } from "react";
import { getValidationSchema, getInitialValues } from "./util/form.util";
import { getFormConfig } from "./config/form.config";
import { validateFields } from "@/api/auth";
import AccountType from "./components/AccountType";
import Form from "@/components/forms/v2/Form";
import ConfirmDetails from "./components/ConfirmDetails";

const RegistrationPage = () => {
  const [type, setType] = useState(undefined);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const MIN_STEP = 0;
  const MAX_STEP = 5;

  const formRef = useRef(null);

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
  const handleValidate = async () => {
    try {
      const values = formRef.current.getValues();
      const setError = formRef.current.setError;
      const trigger = formRef.current.handleTrigger;
      setLoading(true);
      setFormData((prev) => ({ ...prev, ...values }));

      const isValid = await trigger();

      if (!isValid) {
        setLoading(false);
        return;
      }

      if (step === 1 || step === 3) {
        const { organization, user } = values;
        const entity = step === 1 ? "organization" : "user";
        const currentValues = step === 1 && organization ? organization : user;
        const res = await validateFields(currentValues, { params: { entity } });
        if (!res.ok && res.status === 409) {
          console.log("not ok");
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
  const { formConfig, detailsConfig } = getFormConfig({
    step,
    onSubmit: handleValidate,
    onCancel: handleCancel,
  });

  useEffect(() => {
    if (!type) return;

    const values = getInitialValues(type);

    if (step === 0) setFormData(values);
    setFormData((prev) => ({ ...values, ...prev }));
  }, [type, step]);

  return (
    <div className="w-full h-full p-10 flex items-center justify-center">
      <div className="h-[500px] md:h-[500px] w-[450px] max-w-[500px] p-2 gap-2 flex flex-col shadow-lg">
        <div className="w-full">steps go here</div>
        {step >= MIN_STEP && step <= MAX_STEP && (
          <div className="flex-1 w-full flex flex-col justify-around gap-4">
            <div className="h-[20%] w-full p-2 flex justify-center items-center">
              <h1 className="text-xl font-light">{formConfig?.title}</h1>
            </div>
            <div className="flex-1 h-full flex items-center justify-end overflow-hidden">
              {step === MIN_STEP ? (
                <AccountType
                  setSelected={(selectedType) => {
                    setType(selectedType);
                    setFormData(getInitialValues(selectedType));
                  }}
                  selected={type}
                  onButtonClick={handleNext}
                />
              ) : step === MAX_STEP ? (
                <ConfirmDetails values={formData} config={detailsConfig} onCancel={handlePrev} />
              ) : (
                <Form
                  ref={formRef}
                  values={formData}
                  validationSchema={validationSchema}
                  config={formConfig}
                  loading={loading}
                />
              )}
            </div>
            <div className="flex justify-end items-center p-2 gap-4 ">
              <button
                type="button"
                className="p-2 border border-gray-200 rounded-sm hover:cursor-pointer"
                onClick={step > MIN_STEP ? handlePrev : undefined}
              >
                Cancel
              </button>
              <button
                type="button"
                className="p-2 border border-gray-200 rounded-sm hover:cursor-pointer"
                onClick={step === MIN_STEP ? handleNext : handleValidate}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationPage;
