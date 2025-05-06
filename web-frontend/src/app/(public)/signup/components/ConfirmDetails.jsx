import React, { use } from "react";

const renderDetails = (entity, entityName, config) => {
  return (
    <div className="flex-1 w-full">
      {Object.entries(entity).map(([key, value], index) => {
        const format = config?.[entityName]?.[key]?.format || undefined;
        const placeholder = config?.[entityName]?.[key]?.value || key;

        return (
          <div key={index} className={`w-full flex justify-between`}>
            <span>{`${placeholder} :`}</span>
            <span>{value ? (format ? format(value) : value) : "N/A"}</span>
          </div>
        );
      })}
    </div>
  );
};

const ConfirmDetails = ({ values, config, onCancel, onConfirm }) => {
  const { user, organization } = values;
  return (
    <div className="h-full w-full flex flex-col gap-2 overflow-hidden">
      <div className="flex justify-center items-center p-2 text-lg">
        <span>Confirm Details</span>
      </div>
      <div className="flex-1 flex flex-col gap-6 p-6 overflow-auto">
        {organization && (
          <div className="w-full flex flex-col gap-2 border-gray-200 ">
            <h2 className="text-lg font-semibold">Company Details</h2>
            {renderDetails(organization, "organization", config)}
          </div>
        )}
        <div className="flex-1 w-full flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Account Details</h2>
          {renderDetails(user, "user", config)}
        </div>
      </div>
      <div className="w-full flex justify-end items-center gap-2 p-2">
        <button
          type="button"
          className="p-2 hover:cursor-pointer rounded-sm border disabled:border-gray-300 disabled:text-gray-400"
          onClick={onCancel || undefined}
        >
          Back
        </button>
        <button
          type="button"
          className="p-2 hover:cursor-pointer rounded-sm border disabled:border-gray-300 disabled:text-gray-400"
          onClick={onConfirm || undefined}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmDetails;
