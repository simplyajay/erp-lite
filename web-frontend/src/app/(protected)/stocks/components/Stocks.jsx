"use client";
import React, { useState } from "react";
import StockTable from "./StockTable";
import StockForm from "../common/StockForm";
import FormDialog from "@/components/dialogs/FormDialog";
import { useStocks } from "../hooks/useTableStocks";
import { getProducts } from "@/api/products";

const Stocks = ({ data }) => {
  const { state, updateState, fetchData } = useStocks(data);
  const { form } = state;

  const fetchProduct = ({ page = 1, sort = { by: "name", order: "asc" }, keyword = "" } = {}) => {
    const config = { params: { page, sort: JSON.stringify(sort), keyword } };
    return fetchData(() => getProducts(config)); // wrap getProducts inside fetchData function from the store
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-1 justify-between">
      <StockTable state={state} updateState={updateState} fetchProduct={fetchProduct} />

      {form.visible && (
        <FormDialog title={form.type === "edit" ? "Product Information" : "Add Product"}>
          <StockForm state={state} updateState={updateState} fetchProduct={fetchProduct} />
        </FormDialog>
      )}
    </div>
  );
};

export default Stocks;
