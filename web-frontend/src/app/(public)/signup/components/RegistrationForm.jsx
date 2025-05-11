"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getInitialValues, getValidationSchema } from "../util/form.util";
import Buttons from "./Buttons";
import AccountType from "./steps/AccountType";
import BusinessDetails from "./steps/BusinessDetails";
import PersonalInformation from "./steps/PersonalInformation";
import AccountInformation from "./steps/AccountInformation";
import ReviewInformation from "./steps/ReviewInformation";
import StepIndicator from "./StepIndicator";

const RegistrationForm = () => {
  const [accountType, setAccountType] = useState(undefined);
  const [currentStep, setCurrentStep] = useState(1);

  const MIN_STEP = 1;
  const MAX_STEP = 5;

  const validationSchema = getValidationSchema(currentStep);

  const { register, formState, clearErrors, reset, setError, getValues, handleSubmit } = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: yupResolver(validationSchema),
    defaultValues: getInitialValues(accountType),
    shouldFocusError: false,
  });

  useEffect(() => {
    reset();
  }, [reset, currentStep]);

  const { errors } = formState;

  const handlePageChange = (direction) => {
    setCurrentStep((prev) => {
      if (direction === "next") {
        if (accountType === "individual" && currentStep === 1) return prev + 2; //skip 1 stem if acc accountType is individual
        return Math.min(prev + 1, MAX_STEP);
      }
      if (direction === "prev") {
        if (accountType === "individual" && currentStep === 3) return prev - 2;
        return Math.max(prev - 1, MIN_STEP);
      }
      return prev;
    });
  };

  const handlePrev = () => currentStep > MIN_STEP && handlePageChange("prev");

  const handleNext = () => currentStep < MAX_STEP && handlePageChange("next");

  const handleValidate = async () => {
    try {
      setLoading(true);
      setFormData((prev) => ({ ...prev, ...values }));

      if (currentStep === 2 || currentStep === 4) {
        const { organization, user } = values;
        const entity = currentStep === 1 ? "organization" : "user";
        const currentValues = currentStep === 1 && organization ? organization : user;
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

  const stepsComponents = {
    1: AccountType,
    2: BusinessDetails,
    3: PersonalInformation,
    4: AccountInformation,
    5: ReviewInformation,
  };

  const Step = stepsComponents[currentStep];

  return (
    <div className="card-container gap-10 justify-start items-center">
      <StepIndicator currentStep={currentStep} />
      <form
        className="flex-1 w-full flex flex-col gap-10"
        onSubmit={handleSubmit((values) => {
          handleNext();
        })}
      >
        <Step
          currentStep={currentStep}
          selected={accountType}
          setSelected={setAccountType}
          register={register}
          clearErrors={clearErrors}
          errors={errors}
          getValues={getValues}
        />
        <Buttons step={currentStep} handleCancel={handlePrev} type={accountType} />
      </form>
    </div>
  );
};

export default RegistrationForm;
