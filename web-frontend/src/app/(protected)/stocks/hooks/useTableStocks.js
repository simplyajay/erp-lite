import { useStore } from "zustand";
import { tableDataStore } from "@/store/tableDataStore";
import { useMemo } from "react";

export const useStocks = (initialData, fn) => {
  const store = useMemo(() => tableDataStore(initialData, fn), [initialData, fn]);
  return useStore(store);
};
