import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getDefaultValues, getValidationSchema } from "../util/form.util";
import { validateFields } from "@/api/auth";
import { validationMap } from "../util/form.util";
import useRegistrationUiStore from "@/store/useRegistraionUiStore";

const useRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { setLoading, setServerError, setShowError } = useRegistrationUiStore((state) => state);

  const MIN_STEP = 1;
  const MAX_STEP = 6;

  const validationSchema = getValidationSchema(currentStep);

  const formMethods = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: yupResolver(validationSchema),
    defaultValues: { accountType: "" },
    shouldFocusError: false,
  });

  const { reset, getValues, setError, watch } = formMethods;

  const scrollToTop = () => {
    setTimeout(() => {
      const container = document.getElementById("root-public");
      if (container) {
        container.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 0);
  };

  const accountType = watch("accountType");

  useEffect(() => {
    const { user, organization } = getDefaultValues();
    if (!accountType) return;
    const base = {
      accountType,
      user,
    };

    const newValues = { ...base, ...(accountType === "organization" && { organization }) };
    reset(newValues);
  }, [accountType]);

  useEffect(() => {
    if (currentStep === 1) {
      reset();
    }
    scrollToTop();
  }, [reset, currentStep]);

  const handlePageChange = (direction) => {
    const accountType = getValues("accountType");
    setCurrentStep((prev) => {
      if (direction === "next") {
        if (accountType === "individual" && prev === 1) return prev + 2; //skip 1 step if acc accountType is individual
        return Math.min(prev + 1, MAX_STEP);
      }
      if (direction === "prev") {
        if (accountType === "individual" && prev === 3) return prev - 2;
        return Math.max(prev - 1, MIN_STEP);
      }
      return prev;
    });
  };

  const handlePrev = () => currentStep > MIN_STEP && handlePageChange("prev");

  const handleNext = () => currentStep < MAX_STEP && handlePageChange("next");

  const handleValidate = async () => {
    scrollToTop();

    try {
      setLoading(true);

      const config = validationMap[currentStep];
      if (config) {
        const currentValues = config.fields.reduce((acc, field) => {
          const fieldValue = getValues(field);
          const key = field.split(".").pop();
          acc[key] = fieldValue;
          return acc;
        }, {});
        const res = await validateFields(currentValues, { params: { entity: config.entity } });
        //await new Promise((resolve) => setTimeout(resolve, 5000));
        if (!res.ok) {
          if (res.status === 409) {
            const key = Object.keys(res.data)[0]; // access key inside keyValue from error
            setError(`${config.entity}.${key}`, { type: "manual", message: res.message });
          } else {
            console.log(res);
            setShowError(true);
            setServerError({ message: res.message, status: res.status });
          }
          setLoading(false);
          return;
        }
      }

      setShowError(false);
      handleNext();
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleRegister = async () => {};

  return {
    handleValidate,
    handlePrev,
    handleNext,
    formMethods,
    currentStep,
    MIN_STEP,
    MAX_STEP,
  };
};

export default useRegistration;
