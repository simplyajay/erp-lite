import { create } from "zustand";

const useRegistrationUiStore = create((set) => ({
  loading: false,
  setLoading: (val) => set({ loading: val }),
  showError: false,
  setShowError: (val) => set({showError: val}),
  serverError: { message: null, status: 0},
  setServerError: (val) => set({serverError: val})
}));

export default useRegistrationUiStore;
