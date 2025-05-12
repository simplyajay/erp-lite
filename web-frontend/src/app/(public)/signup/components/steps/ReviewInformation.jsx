import React from "react";
import { motion } from "framer-motion";
import { fadeTransitionv1 } from "@/components/motion/transitions";

const detailsConfig = {
  organization: {
    name: { value: "Company Name" },
    email: { value: "Email" },
    phone: { value: "Phone", format: (text) => text },
  },
  user: {
    firstname: { value: "First Name" },
    middlename: { value: "Middle Name" },
    lastname: { value: "Last Name" },
    username: { value: "Username" },
    email: { value: "Email" },
    phone: { value: "Phone", format: (text) => text },
  },
};

const renderDetails = (entity, entityName, config) => {
  return (
    <>
      {Object.entries(entity).map(([key, value], index) => {
        const format = config?.[entityName]?.[key]?.format || undefined;
        const placeholder = config?.[entityName]?.[key]?.value || key;

        if (!config?.[entityName]?.[key] || !value) return;

        return (
          <div key={index} className="w-full flex flex-col">
            <span className="text-sm font-primary !text-gray-500">{`${placeholder}`}</span>
            <span className="text-body-sm font-semibold">
              {value ? (format ? format(value) : value) : "N/A"}
            </span>
          </div>
        );
      })}
    </>
  );
};

const ReviewInformation = ({ values, onCancel, onSubmit }) => {
  const { user, organization } = values;
  return (
    <motion.div className="h-full w-full flex flex-col gap-10" {...fadeTransitionv1}>
      <div className="w-full flex flex-col items-center justify-center gap-4 ">
        <span className="text-body-lg font-semibold">Review Your Information</span>
        <span className="text-body-sm">Please review your information before submitting</span>
      </div>
      <div className="h-full w-full flex flex-col gap-8 ">
        {organization && (
          <div className="w-full flex flex-col gap-3 p-4 bg-gray-100 rounded-lg scrollbar-thin">
            <h2 className="text-lg font-semibold">Company Details</h2>
            <hr className="text-gray-300" />
            <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-3 justify-between">
              {renderDetails(organization, "organization", detailsConfig)}
            </div>
          </div>
        )}
        <div className="flex-1 w-full flex flex-col gap-3 p-4 bg-gray-100 rounded-lg scrollbar-thin">
          <h2 className="text-lg font-semibold">Account Details</h2>
          <hr className="text-gray-300" />
          <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-3 justify-between">
            {renderDetails(user, "user", detailsConfig)}
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-4">
        <button className="btn btn-secondary-solid text-body" onClick={onCancel}>
          Previous
        </button>
        <button className="btn btn-primary-solid text-body" onClick={onSubmit}>
          Submit
        </button>
      </div>
    </motion.div>
  );
};

export default ReviewInformation;
