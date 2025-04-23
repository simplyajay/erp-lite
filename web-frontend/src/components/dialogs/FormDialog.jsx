import React from "react";

const FormDialog = ({ title, children }) => {
  return (
    <div className="h-full w-full fixed z-10 inset-0 flex items-center justify-center bg-gray-800/50">
      <div className="h-[80%] w-[80%] lg:w-[50%] flex flex-col bg-white rounded-sm">
        <div className="w-full flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default FormDialog;
