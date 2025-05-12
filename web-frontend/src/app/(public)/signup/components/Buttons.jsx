import React from "react";

const Buttons = ({ step, handleCancel, loading }) => {
  const MIN_STEP = 1;
  const MAX_STEP = 6;

  if (step === MAX_STEP) return;

  return (
    <div className="w-full flex flex-col justify-around gap-4 ">
      <div
        className={`flex-1 w-full flex gap-4 ${
          step !== MIN_STEP ? "justify-between" : "justify-end"
        }`}
      >
        {step !== MIN_STEP && (
          <button
            disabled={loading}
            type="button"
            className="btn btn-secondary-solid text-body"
            onClick={handleCancel || undefined}
          >
            Previous
          </button>
        )}

        <button disabled={loading} type="submit" className="btn btn-primary-solid text-body">
          {step === MAX_STEP - 1 ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Buttons;
