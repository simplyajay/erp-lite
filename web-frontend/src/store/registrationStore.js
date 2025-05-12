import { createStore } from "zustand";

export const registrationStore = (initialData) =>
  createStore((set, get) => ({
    MIN_STEP: 1,
    MAX_STEP: 2,
    currentStep: 1,
    accountType: undefined,
    setAccountType: (type) => set({ accountType: type }),
    loading: false,
  }));
