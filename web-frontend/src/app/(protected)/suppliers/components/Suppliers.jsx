"use client";
import React from "react";
import SuppliersTable from "./SuppliersTable";
import FormDialog from "@/components/dialogs/FormDialog";
import SupplierForm from "../common/SupplierForm";
import { useSupplier } from "../hooks/useSupplier";
import { getSuppliers } from "@/api/supplier";

const Suppliers = ({ data }) => {
  const { state, updateState, fetchData } = useSupplier(data);

  const { form } = state;

  const fetchProduct = ({ page = 1, sort = { by: "name", order: "asc" }, keyword = "" } = {}) => {
    const config = { params: { page, sort: JSON.stringify(sort), keyword } };
    return fetchData(() => getSuppliers(config)); // wrap getProducts inside fetchData function from the store
  };

  return (
    <div className="w-full h-full flex flex-col">
      <SuppliersTable state={state} updateState={updateState} fetchSuppliers={fetchProduct} />

      {form?.visible && (
        <FormDialog
          title={form.type === "edit" ? "Supplier Information" : "Create Supplier Product"}
        >
          <SupplierForm state={state} updateState={updateState} fetchSuppliers={fetchProduct} />
        </FormDialog>
      )}
    </div>
  );
};

export default Suppliers;
