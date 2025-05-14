"use client";
import React, { useState } from "react";
import { CloseThick } from "@/components/icons/Icons";

const ServerError = ({ error, handleClose }) => {
  const [showButton, setShowButton] = useState(false);
  return (
    <div
      className="h-8 w-full flex items-center justify-between rounded-md  bg-red-100"
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
    >
      <div className="flex-1 flex items-center p-2">
        <p className="text-sm font-semibold !text-red-400">{`Error ${error.status}: ${error.message}`}</p>
      </div>

      {showButton && (
        <button
          className="text-red-300 hover:text-red-400 transition-all duration-300  rounded-md flex items-center justify-center cursor-pointer h-auto p-2"
          onClick={handleClose}
        >
          <CloseThick />
        </button>
      )}
    </div>
  );
};

export default ServerError;
