import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getInitialValues, getValidationSchema } from "../util/form.util";

const useRegistration = () => {
  const [accountType, setAccountType] = useState(undefined);
  const [currentStep, setCurrentStep] = useState(1);

  const MIN_STEP = 1;
  const MAX_STEP = 6;

  const validationSchema = getValidationSchema(currentStep);

  const { errors, ...formMethods } = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: yupResolver(validationSchema),
    defaultValues: getInitialValues(accountType),
    shouldFocusError: false,
  });

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

  const handleValidate = async ({ values }) => {
    try {
      setLoading(true);

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

  return {
    handleValidate,
    handlePrev,
    handleNext,
    formMethods,
    currentStep,
    accountType,
    setAccountType,
  };
};

export default useRegistration;
