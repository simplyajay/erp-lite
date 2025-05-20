import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getDefaultValues, getValidationSchema } from "../util/form.util";
import { validateRegistrationStep, generateRegSessionId, validateRegSessionId } from "@/api/auth";
import { validationMap } from "../util/form.util";
import { notify } from "@/components/toast/ToastProvider";
import { Slide } from "react-toastify";
import useRegistrationUiStore from "@/store/useRegistration";

const useRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { setLoading } = useRegistrationUiStore((state) => state);
  const toastIdRef = useRef(null);

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

  const { reset, getValues, setError, watch, resetField } = formMethods;

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
    if (!accountType) return;

    const { user, organization } = getDefaultValues();
    const base = {
      accountType,
      user,
    };
    const newValues = { ...base, ...(accountType === "organization" && { organization }) };
    reset(newValues);
  }, [reset, accountType]);

  const previousStepRef = useRef(null);

  useEffect(() => {
    if (previousStepRef.current === 4 && currentStep !== 4) {
      resetField("user.password");
      resetField("user.confirmpassword");
    }
    previousStepRef.current = currentStep;
    scrollToTop();
  }, [resetField, currentStep]);

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

        const res = await validateRegistrationStep(currentValues, {
          params: { step: currentStep, entity: config.entity },
        });
        //await new Promise((resolve) => setTimeout(resolve, 5000));
        if (!res.ok) {
          if (res.status === 409 || res.status === 422) {
            const key = Object.keys(res.data)[0]; // access key inside keyValue from error
            setError(`${config.entity}.${key}`, { type: "manual", message: res.message });
          } else {
            const message = `Oops! Something went wrong (Status ${res.status}): ${res.message}`;

            notify(
              message,
              {
                type: "error",
                autoClose: 5000,
                draggable: false,
                transition: Slide,
                theme: "colored",
              },
              toastIdRef
            );
          }
          setLoading(false);
          return;
        }
      } else {
        //request new uuid if has no active uuid
        if (!sessionStorage.getItem("reg-session")) {
          const res = await generateRegSessionId({ accountType });

          if (!res.ok) {
            console.warn("Failed to create uuid. Proceeding without cache");
            return;
          }

          const { uuidv4 } = res.data;

          sessionStorage.setItem("reg-session", uuidv4);
        } else {
          //ask backend if uuid is still active

          const uuid = sessionStorage.getItem("reg-session");
          const res = await validateRegSessionId({ uuid });

          if (!res.ok) {
            console.warn("Validation Failed.");
            return;
          }

          const data = res.data;

          if (!data.active) {
            const res = await generateRegSessionId({ accountType });

            if (!res.ok) {
              console.warn("Failed to create uuid. Proceeding without cache");
              return;
            }

            const { uuidv4 } = res.data;

            sessionStorage.setItem("reg-session", uuidv4);
          }
        }
      }

      handleNext();
      setLoading(false);
    } catch (error) {
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
