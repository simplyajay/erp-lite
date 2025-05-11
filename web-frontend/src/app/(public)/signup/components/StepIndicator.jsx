import React from "react";
import { CheckIcon } from "@/components/icons/Icons";

const Step = ({ step, currentStep }) => {
  const isActive = step.steps.includes(currentStep);
  const isCompleted = currentStep > Math.max(...step.steps);
  return (
    <div className="w-full flex flex-col items-center justify-start gap-2">
      <div className="w-full flex items-center justify-center">
        <div
          className={`h-[2px] flex-1 ${
            isActive ? "bg-blue-500" : isCompleted ? "bg-green-400" : "bg-gray-300"
          }`}
        />
        <div
          className={`h-10 w-10 p-2 flex items-center justify-center rounded-full border-[2px] ${
            isActive
              ? "border-blue-500 bg-blue-500 text-white"
              : isCompleted
              ? "border-green-400 bg-green-400 text-white"
              : "border-gray-300 text-gray-600"
          }`}
        >
          {isCompleted ? <CheckIcon className="text-white" /> : step.number}
        </div>
        <div
          className={`h-[2px] flex-1 ${
            isActive ? "bg-blue-500" : isCompleted ? "bg-green-400" : "bg-gray-300"
          }`}
        />
      </div>
      <span
        className={`text-sm font-medium ${
          isActive ? "text-blue-500 font-semibold" : "text-gray-600 font-medium"
        }`}
      >
        {step?.label}
      </span>
    </div>
  );
};

const StepIndicator = ({ currentStep }) => {
  const steps = [
    { number: 1, steps: [1], label: "Type" },
    { number: 2, steps: [2, 3], label: "Info" },
    { number: 3, steps: [4], label: "Account" },
    { number: 4, steps: [5], label: "Review" },
  ];

  return (
    <div className="w-full flex justify-between">
      {steps.map((step, index) => (
        <Step key={index} step={step} currentStep={currentStep} />
      ))}
    </div>
  );
};

export default StepIndicator;
