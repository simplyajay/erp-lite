import React from "react";
import TextInput from "@/components/formfields/higher-order/TextInput";
import { motion } from "framer-motion";
import { fadeTransitionv1 } from "@/components/motion/transitions";

const PersonalInformation = ({ register, clearErrors, errors }) => {
  const fields = [
    { key: "user.firstname", label: "First Name", placeholder: "John" },
    { key: "user.middlename", label: "Middle Name", placeholder: "Jane (Optional)" },
    { key: "user.lastname", label: "Last Name", placeholder: "Doe" },
    { key: "user.phone", label: "Phone", placeholder: "(123) 456-7890 (Optional)" },
    { key: "user.email", label: "Email", placeholder: "you@example.com" },
  ];
  return (
    <motion.div className="w-full h-full flex flex-col gap-10" {...fadeTransitionv1}>
      <div className="w-full flex flex-col items-start justify-center gap-2 ">
        <span className="text-body-lg font-semibold">Personal Information</span>
        <span className="text-body-sm">Please provide your personal details</span>
      </div>
      <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field, index) => (
          <div
            key={index}
            className={`w-full ${
              fields.length % 2 === 1 && index === fields.length - 1 ? "md:col-span-2" : ""
            }`}
          >
            <TextInput
              field={field}
              register={register}
              errors={errors}
              handleFocus={clearErrors}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default PersonalInformation;
