"use client";
import React, { useRef } from "react";
import Table from "@/components/table/Table";
import Pagination from "@/components/table/Pagination";
import TableInfo from "@/components/table/TableInfo";
import TableLayout from "@/components/table/TableLayout";
import { useRouter } from "next/navigation";
import { useTableHandler } from "@/components/table/hooks/useTableHandler";
import { getSuppliersTableColumns } from "../config/table.config";

const SuppliersTable = ({ state, updateState, fetchSuppliers }) => {
  const searchRef = useRef(null);
  const router = useRouter();

  const { data, page, totalPages, sort, keyword, loading } = state;

  const { searchItem, clearSearch, handleSort, pageNext, pagePrev } = useTableHandler({
    state,
    fetchTableData: fetchSuppliers,
  });

  const handleEdit = (supplier) => {
    updateState({ currentData: supplier });
    router.push(`/suppliers/${supplier._id}`);
  };

  const tableColumns = getSuppliersTableColumns({ handleEdit });

  return (
    <div className="flex-1 overflow-auto">
      <TableLayout>
        <TableInfo
          title={"SUPPLIERS"}
          buttonText={"Add Supplier"}
          onButtonClick={() => updateState({ form: { visible: true, type: "add" } })}
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

export default SuppliersTable;
