import React from "react";
import TextInput from "@/components/formfields/higher-order/TextInput";

const BusinessDetails = ({ register, clearErrors, errors }) => {
  const fields = [
    { key: "organization.name", label: "Company Name", placeholder: "Company Inc." },
    { key: "organization.email", label: "Email", placeholder: "company@example.com" },
    { key: "organization.phone", label: "Phone", placeholder: "(123) 456-7890" },
  ];

  return (
    <div className="h-full w-full flex flex-col gap-10">
      <div className="w-full flex flex-col items-start justify-center gap-2 ">
        <span className="text-body-lg font-semibold">Business Information</span>
        <span className="text-body-sm">Please provide business details</span>
      </div>
      <div className="flex-1 w-full flex flex-col gap-4">
        {fields.map((field, index) => (
          <TextInput
            key={index}
            field={field}
            register={register}
            errors={errors}
            handleFocus={clearErrors}
          />
        ))}
      </div>
    </div>
  );
};

export default BusinessDetails;
