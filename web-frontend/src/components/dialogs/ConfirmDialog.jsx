import React from "react";

const ConfirmDialog = ({ option }) => {
  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-5 rounded shadow-lg">
        <div className="py-5">
          <p className="mb-4">{option?.message}</p>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={option?.cancel?.onCancel}
            className="w-[70px] p-2 rounded-sm hover:cursor-pointer bg-gray-200"
          >
            {option?.cancel?.placeholder}
          </button>
          <button
            type="button"
            onClick={option?.confirm?.onConfirm}
            className="w-[70px] p-2 rounded-sm hover:cursor-pointer bg-red-200"
          >
            {option?.confirm?.placeholder}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
