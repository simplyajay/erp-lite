"use client";
import React from "react";
import Buttons from "./formElements/Buttons";
import AccountType from "./steps/AccountType";
import BusinessDetails from "./steps/BusinessDetails";
import PersonalInformation from "./steps/PersonalInformation";
import AccountInformation from "./steps/AccountInformation";
import ReviewInformation from "./steps/ReviewInformation";
import Success from "./steps/Success";
import StepIndicator from "./formElements/StepIndicator";
import useRegistration from "../hooks/useRegistration";
import LoadingBar from "./formElements/LoadingBar";
import useRegistrationUiStore from "@/store/useRegistraionUiStore";
import { FormProvider } from "react-hook-form";
import { ToastContainer } from "react-toastify";

const RegistrationForm = () => {
  const { handleValidate, handlePrev, handleNext, formMethods, currentStep, MAX_STEP } =
    useRegistration();

  const loading = useRegistrationUiStore((state) => state.loading);

  const { getValues, handleSubmit } = formMethods;

  const values = getValues();

  const stepsComponents = {
    1: AccountType,
    2: BusinessDetails,
    3: PersonalInformation,
    4: AccountInformation,
    5: ReviewInformation,
  };

  const Step = stepsComponents[currentStep];

  return (
    <div className="relative flex-1 card-container">
      <LoadingBar isLoading={loading} />
      <div className="flex-1 w-full flex flex-col p-8 gap-10 justify-start items-center">
        <StepIndicator currentStep={currentStep} accountType={values.accountType} />
        {currentStep === MAX_STEP ? (
          <Success />
        ) : currentStep === 5 ? (
          <ReviewInformation values={values} onCancel={handlePrev} onSubmit={handleNext} />
        ) : (
          <FormProvider {...formMethods}>
            <form
              className={`flex-1 w-full flex flex-col gap-10 ${
                loading ? "opacity-60" : "opacity-100"
              }`}
              onSubmit={handleSubmit(() => {
                handleValidate();
              })}
            >
              <Step />
              <Buttons step={currentStep} handleCancel={handlePrev} loading={loading} />
            </form>
          </FormProvider>
        )}
      </div>
      <ToastContainer className={"Toastify_toast-container"} />
    </div>
  );
};

export default RegistrationForm;
