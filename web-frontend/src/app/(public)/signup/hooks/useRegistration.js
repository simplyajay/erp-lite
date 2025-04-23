import { useState } from "react";

export const useRegistration = ({}) => {
  const [state, setState] = useState({
    step: 1,
    formData: {},
    accountType: "individual",
  });

  const updateState = (updateData) => {
    setState((prev) => ({ ...prev, ...updateData }));
  };

  return { updateState, state };
};
