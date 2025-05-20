import { create } from "zustand";

const useRegistrationUiStore = create((set) => ({
  loading: false,
  setLoading: (val) => set({ loading: val }),
}));

export default useRegistrationUiStore;
