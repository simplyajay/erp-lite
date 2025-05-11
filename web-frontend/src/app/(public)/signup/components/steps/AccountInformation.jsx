import React from "react";
import TextInput from "@/components/formfields/higher-order/TextInput";
import PasswordInput from "@/components/formfields/higher-order/PasswordInput";

const AccountInformation = ({ register, clearErrors, errors }) => {
  const fields = [
    { key: "user.username", label: "Username", placeholder: "yourusername123" },
    {
      key: "user.password",
      label: "Password",
      placeholder: "Enter your password",
      type: "password",
    },
    {
      key: "user.confirmpassword",
      label: "Confirm Password",
      placeholder: "Re-enter your password",
      type: "password",
    },
  ];
  return (
    <div className="h-full w-full flex flex-col gap-10">
      <div className="h-full w-full flex flex-col gap-8">
        <div className="w-full flex flex-col items-start justify-center gap-2 ">
          <span className="text-body-lg font-semibold">Account Setup</span>
          <span className="text-body-sm">Create your login credentials</span>
        </div>
        <div className="flex-1 w-full flex flex-col gap-4">
          {fields.map((field, index) =>
            field.key === "user.username" ? (
              <TextInput
                key={index}
                field={field}
                register={register}
                errors={errors}
                handleFocus={clearErrors}
              />
            ) : (
              <PasswordInput
                key={index}
                field={field}
                register={register}
                errors={errors}
                handleFocus={clearErrors}
              />
            )
          )}
        </div>
        <div className="w-full flex flex-col gap-2 p-4 bg-blue-100 rounded-lg">
          <span className="text-body-sm !text-blue-700 font-semibold">Password Requirements</span>
          <ul className="list-disc list-inside text-blue-600 md:text-sm text-xs">
            <li>At least 8 characters long</li>
            <li>Include at least one uppercase letter</li>
            <li>Include at least one number</li>
            <li>Include at least one special character</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AccountInformation;
