import React from "react";
import { CheckIcon } from "@/components/icons/Icons";

const StepGroup = ({
  step,
  isFirst,
  isLast,
  isCompleted,
  isNextActive,
  isPreviousCompleted,
  hasAnySubStepPassed,
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-between gap-2">
      <div className="w-full flex items-center justify-between">
        <div className="relative flex-1 flex items-center justify-center">
          {!isFirst && (
            <div
              className={`absolute left-0 top-1/2 w-1/2 h-[2px] -translate-y-1/2 z-0 transition-colors duration-100 ${
                isPreviousCompleted ? "bg-green-400" : "bg-gray-300"
              }`}
            />
          )}
          <div
            className={`relative z-10 h-7 w-7 rounded-full flex items-center justify-center border-3 text-sm font-semibold transition-all duration-100 select-none ${
              isCompleted
                ? "bg-green-400 border-green-400 text-white"
                : isNextActive
                ? "bg-blue-500 border-blue-500 text-white"
                : "bg-white border-gray-300 text-gray-600"
            }`}
          >
            {isCompleted ? (
              <CheckIcon className="text-white" />
            ) : (
              <span className={`text-xs ${isNextActive ? "text-white" : "text-gray-500"}`}>
                {step.number}
              </span>
            )}
          </div>
          {!isLast && (
            <div
              className={`absolute right-0 top-1/2 h-[2px] w-1/2 -translate-y-1/2 transition-colors duration-100 ${
                isCompleted ? "bg-green-400" : hasAnySubStepPassed ? "bg-blue-400" : "bg-gray-300"
              }`}
            />
          )}
        </div>
      </div>

      <span
        className={`text-xs select-none ${
          isNextActive ? "text-blue-600 font-semibold" : "text-gray-600 font-medium"
        }`}
      >
        {step.label}
      </span>
    </div>
  );
};

const StepIndicator = ({ currentStep, accountType }) => {
  if (currentStep === 6) return;
  const stepsTypeOrg = [
    { number: 1, steps: [1], label: "Type" },
    { number: 2, steps: [2, 3], label: "Info" },
    { number: 3, steps: [4], label: "Account" },
    { number: 4, steps: [5], label: "Review" },
  ];
  const stepsTypeInd = [
    { number: 1, steps: [1], label: "Type" },
    { number: 2, steps: [3], label: "Info" },
    { number: 3, steps: [4], label: "Account" },
    { number: 4, steps: [5], label: "Review" },
  ];

  const steps =
    accountType === "organization"
      ? stepsTypeOrg
      : accountType === "individual"
      ? stepsTypeInd
      : stepsTypeInd;

  return (
    <div className="w-full flex items-center justify-between">
      {steps.map((step, index) => {
        const isFirst = index === 0;
        const isLast = index === steps.length - 1;
        const isCompleted = currentStep > Math.max(...step.steps);
        const isNextActive = step.steps?.includes(currentStep);
        const isPreviousCompleted = index > 0 && currentStep > Math.max(...steps[index - 1].steps);
        const hasAnySubStepPassed = step.steps.some((subStep) => currentStep > subStep);

        return (
          <StepGroup
            key={index}
            step={step}
            isFirst={isFirst}
            isLast={isLast}
            isCompleted={isCompleted}
            isNextActive={isNextActive}
            isPreviousCompleted={isPreviousCompleted}
            hasAnySubStepPassed={hasAnySubStepPassed}
          />
        );
      })}
    </div>
  );
};

export default StepIndicator;
