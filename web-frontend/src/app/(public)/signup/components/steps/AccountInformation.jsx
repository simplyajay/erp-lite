"use client";
import React, { useState, useEffect } from "react";
import TextInput from "@/components/formfields/higher-order/TextInput";
import PasswordInput from "@/components/formfields/higher-order/PasswordInput";
import PasswordStrengthIndicator from "../formElements/PasswordStrengthIndicator";
import { motion } from "framer-motion";
import { fadeTransitionv1 } from "@/components/motion/transitions";
import { useFormContext } from "react-hook-form";
import { debounce } from "lodash";
import useRegistrationUiStore from "@/store/useRegistraionUiStore";

const AccountInformation = () => {
  const [showIndicator, setShowIndicator] = useState(false);
  const { loading } = useRegistrationUiStore((state) => state);
  const { formState, register, clearErrors, watch } = useFormContext();
  const { errors } = formState;
  const password = watch("user.password");

  const fields = {
    username: { key: "user.username", label: "Username", placeholder: "yourusername123" },
    password: {
      key: "user.password",
      label: "Password",
      placeholder: "Enter your password",
      type: "password",
    },
    confirmpassword: {
      key: "user.confirmpassword",
      label: "Confirm Password",
      placeholder: "Re-enter your password",
      type: "password",
    },
  };

  const handlePasswordChange = debounce(() => {
    if (password && password.length > 0) {
      setShowIndicator(true);
    }
  }, 100);

  useEffect(() => {
    handlePasswordChange();
    return () => handlePasswordChange.cancel(); // Cleanup debounce on component unmount
  }, [password]);
  return (
    <motion.div className="h-full w-full flex flex-col gap-10" {...fadeTransitionv1}>
      <div className="h-full w-full flex flex-col gap-8">
        <div className="w-full flex flex-col items-start justify-center gap-2 ">
          <span className="text-body-lg font-semibold">Account Setup</span>
          <span className="text-body-sm">Create your login credentials</span>
        </div>
        <div className="flex-1 w-full flex flex-col gap-4">
          <TextInput
            autoComplete="off"
            disabled={loading}
            field={fields["username"]}
            register={register}
            errors={errors}
            clearErrors={clearErrors}
          />
          <div className="flex flex-col gap-2">
            <PasswordInput
              disabled={loading}
              field={fields["password"]}
              register={register}
              errors={errors}
              clearErrors={clearErrors}
              onFocus={() => {
                if (password.length > 0) setShowIndicator(true);
              }}
              onBlur={() => {
                setShowIndicator(false);
              }}
            />
            <PasswordStrengthIndicator password={password} showIndicator={showIndicator} />
          </div>
          <PasswordInput
            disabled={loading}
            field={fields["confirmpassword"]}
            register={register}
            errors={errors}
            clearErrors={clearErrors}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default AccountInformation;
