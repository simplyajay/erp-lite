import { useCallback } from "react";

export const useTableHandler = ({ state, fetchTableData }) => {
  const { page, sort, totalPages, keyword } = state;

  const searchItem = useCallback(
    (keyword = "") => {
      fetchTableData({ keyword });
    },
    [fetchTableData]
  );

  const clearSearch = useCallback(
    (searchRef) => {
      if (searchRef.current) {
        searchRef.current.clearInput();
        fetchTableData();
      }
    },
    [fetchTableData]
  );

  const handleSort = useCallback(
    (by = "name", order = "asc") => {
      if (by === "actions") return;
      const newSort = { by, order };
      fetchTableData({ keyword, page, sort: newSort });
    },
    [fetchTableData, page, keyword]
  );

  const pageNext = useCallback(() => {
    if (page < totalPages) {
      const newPage = Number(page) + 1;
      fetchTableData({ keyword, page: newPage, sort });
    }
  }, [fetchTableData, page, totalPages, sort, keyword]);

  const pagePrev = useCallback(() => {
    if (page > 1) {
      const newPage = Number(page) - 1;
      fetchTableData({ keyword, page: newPage, sort });
    }
  }, [fetchTableData, page, sort, keyword]);

  return {
    searchItem,
    clearSearch,
    handleSort,
    pageNext,
    pagePrev,
  };
};
