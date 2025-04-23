import { createStore } from "zustand";

export const tableDataStore = (initialData = {}) =>
  createStore((set, get) => ({
    state: {
      data: initialData.items || [],
      currentData: {},
      page: initialData.page || 1,
      totalPages: initialData.totalPages || 1,
      sort: initialData.sort || {},
      keyword: initialData.keyword || null,
      loading: false,
      form: { visible: false, type: "add" },
    },

    updateState: (updates) => set((store) => ({ state: { ...store.state, ...updates } })),

    fetchData: async (fetchFn = undefined) => {
      try {
        set((store) => ({ state: { ...store.state, loading: true } }));
        const res = await fetchFn();
        const data = res.data;
        set((store) => ({
          state: {
            ...store.state,
            data: data.items,
            totalPages: data.totalPages,
            page: data.page,
            sort: data.sort,
            keyword: data.keyword,
            loading: false,
          },
        }));
      } catch (err) {
        console.error(err);
        set({ loading: false });
      }
    },
  }));
