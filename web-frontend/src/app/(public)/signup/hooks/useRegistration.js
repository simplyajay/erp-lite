import { useState } from "react";

export const useRegistration = ({ defaultValues }) => {
  const [state, setState] = useState({
    step: 1,
    formValues: { ...defaultValues, ...someOtherObj },
    accountType: "individual",
  });

  const updateState = (updateData) => {
    setState((prev) => ({ ...prev, ...updateData }));
  };

  return { updateState, state };
};
