"use client";
import React from "react";
import TextInput from "@/components/formfields/higher-order/TextInput";
import { motion } from "framer-motion";
import { fadeTransitionv1 } from "@/components/motion/transitions";
import { useFormContext } from "react-hook-form";
import useRegistrationUiStore from "@/store/useRegistration";

const BusinessDetails = () => {
  const { loading } = useRegistrationUiStore((state) => state);
  const { formState, register, clearErrors } = useFormContext();
  const { errors } = formState;
  const fields = [
    { key: "organization.name", label: "Company Name", placeholder: "Company Inc." },
    { key: "organization.email", label: "Email", placeholder: "company@example.com" },
    { key: "organization.phone", label: "Phone", placeholder: "(123) 456-7890" },
  ];

  return (
    <motion.div className="h-full w-full flex flex-col gap-10" {...fadeTransitionv1}>
      <div className="w-full flex flex-col items-start justify-center gap-2 ">
        <span className="text-body-lg font-semibold">Business Information</span>
        <span className="text-body-sm">Please provide business details</span>
      </div>
      <div className="flex-1 w-full flex flex-col gap-4">
        {fields.map((field, index) => (
          <TextInput
            key={index}
            autoComplete={field.key === "organization.email" ? "off" : "on"}
            disabled={loading}
            field={field}
            register={register}
            errors={errors}
            clearErrors={clearErrors}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default BusinessDetails;
