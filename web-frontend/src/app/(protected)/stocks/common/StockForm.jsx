"use client";
import React, { useState } from "react";
import Form from "@/components/forms/v1/Form";
import { updateProduct } from "@/api/products";
import { addProduct } from "@/api/products";
import { getStockFormConfig, ProductSchema, getProductFormValues } from "../config/form.config";
import { notify } from "@/components/toast/ToastProvider";

const StockForm = ({ state, updateState, fetchProduct, entity }) => {
  const [updating, setUpdating] = useState(false);

  const { form } = state;

  const formValues = form.type === "edit" ? getProductFormValues(entity) : getProductFormValues();

  const hideForm = () => {
    updateState({ form: { ...form, visible: false } });
  };

  const handleSubmit = async ({ values = {}, setError, reset }) => {
    setUpdating(true);
    let res = undefined;
    if (form.type === "edit") {
      res = await updateProduct(entity._id, values);
    } else {
      res = await addProduct(values);
    }

    if (!res.ok && res.status === 409) {
      if (res.data.barcode) {
        setError("barcode", { type: "manual", message: "Barcode is already taken" });
      }
      if (res.data.sku) {
        setError("sku", { type: "manual", message: "SKU is already taken" });
      }
    } else {
      notify(res.message);
      reset();
      hideForm();

      if (fetchProduct) {
        fetchProduct();
      }
    }

    setUpdating(false);
  };

  const formConfig = getStockFormConfig({ onSubmit: handleSubmit, onCancel: hideForm });

  return (
    <div className="h-full w-full">
      <Form
        title="Product Form"
        values={formValues}
        config={formConfig}
        loading={updating}
        validationSchema={ProductSchema}
      />
    </div>
  );
};

export default StockForm;
