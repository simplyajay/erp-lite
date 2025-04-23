"use client";
import React, { useRef } from "react";
import TableLayout from "@/components/table/TableLayout";
import TableInfo from "@/components/table/TableInfo";
import TableNew from "@/components/table/Table";
import Pagination from "@/components/table/Pagination";
import { useTableHandler } from "@/components/table/hooks/useTableHandler";
import { getStockTableColumns } from "../config/table.config";

const StockTable = ({ state, updateState, fetchProduct }) => {
  const searchRef = useRef(null);
  const { data, page, totalPages, sort, keyword, loading } = state;

  const { searchItem, clearSearch, handleSort, pageNext, pagePrev } = useTableHandler({
    state,
    updateState: updateState,
    fetchTableData: fetchProduct,
  });

  const onEditClick = (product) => {
    updateState({ currentData: product });
  };

  const tableColumns = getStockTableColumns({ handleEdit: onEditClick });

  return (
    <div className="flex-1 overflow-auto">
      <TableLayout>
        <TableInfo
          title={"PRODUCTS"}
          buttonText={"Add Product"}
          onButtonClick={() => updateState({ form: { visible: true, type: "add" } })}
          searchRef={searchRef}
          handleSearch={searchItem}
          handleSearchClear={clearSearch}
          searchKeyword={keyword}
        />
        <TableNew
          columns={tableColumns}
          data={data}
          sortSettings={sort}
          onSort={handleSort}
          loading={loading}
        />
        <Pagination
          handlePrevious={pagePrev}
          handleNext={pageNext}
          currentPage={page}
          totalPages={totalPages}
          loading={loading}
        />
      </TableLayout>
    </div>
  );
};

export default StockTable;
