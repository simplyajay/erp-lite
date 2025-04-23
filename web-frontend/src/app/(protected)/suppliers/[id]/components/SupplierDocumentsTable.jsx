"use client";
import React, { useRef } from "react";
import TableLayout from "@/components/table/TableLayout";
import TableInfo from "@/components/table/TableInfo";
import Table from "@/components/table/Table";
import Pagination from "@/components/table/Pagination";
import { useTableHandler } from "@/components/table/hooks/useTableHandler";
import { getSupplierDocumentsTableColumns } from "../config/table.config";

const SupplierDocumentsTable = ({ state, updateState, fetchDocuments }) => {
  const searchRef = useRef(null);

  const { data, loading, keyword, sort, page, totalPages } = state;

  const handleTableButtonClick = () => {
    console.log("redirect to document table ( different kind of table)");
  };

  const handleEdit = () => {
    console.log("redirect to document table ( different kind of table)");
  };

  const { pageNext, pagePrev, searchItem, clearSearch, handleSort } = useTableHandler({
    state,
    updateState,
    fetchTableData: fetchDocuments,
  });

  const tableColumns = getSupplierDocumentsTableColumns({ handleEdit });

  return (
    <div className="flex-1 w-full overflow-auto">
      <TableLayout>
        <TableInfo
          title={"Documents"}
          buttonText={"New Document"}
          onButtonClick={handleTableButtonClick}
          searchRef={searchRef}
          handleSearch={searchItem}
          handleSearchClear={clearSearch}
          searchKeyword={keyword}
        />
        <Table
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

export default SupplierDocumentsTable;
