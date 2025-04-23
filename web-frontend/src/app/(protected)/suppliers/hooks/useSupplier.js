import { useStore } from "zustand";
import { tableDataStore } from "@/store/tableDataStore";
import { useMemo } from "react";

export const useSupplier = (initialData) => {
  const store = useMemo(() => tableDataStore(initialData), [initialData]);
  return useStore(store);
};
