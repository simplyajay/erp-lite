"use client";
import React, { useState } from "react";
import Form from "@/components/forms/newForm/FormNew";
import { updateSupplier } from "@/api/supplier";
import { addSupplier } from "@/api/supplier";
import {
  getSupplierFormConfig,
  getEntityFormValues,
  BusinessEntitySchema,
} from "../config/form.config";
import { notify } from "@/components/toast/ToastProvider";

const SupplierForm = ({ state, updateState, fetchSuppliers, entity }) => {
  const [updating, setUpdating] = useState(false);

  const { form } = state;

  const formValues = form.type === "edit" ? getEntityFormValues(entity) : getEntityFormValues();

  const hideForm = () => {
    updateState({ form: { ...form, visible: false } });
  };

  const handleSubmit = async ({ values = {}, setError, errors, reset }) => {
    setUpdating(true);
    let res = undefined;
    if (form.type === "edit") {
      res = await updateSupplier(entity._id, values);
    } else {
      res = await addSupplier(values);
    }

    if (!res.ok) {
      if (res.status === 409) {
        if (res.data.trn) {
          setError("trn", { type: "manual", message: "TRN is already taken" });
        }
      } else {
        console.error(res.message);
      }
    } else {
      notify(res.message);
      reset();
      hideForm();

      if (fetchSuppliers) {
        fetchSuppliers();
      }
    }

    setUpdating(false);
  };

  const formConfig = getSupplierFormConfig({ onSubmit: handleSubmit, onCancel: hideForm });
  return (
    <div className="h-full w-full">
      <Form
        title="Supplier Details"
        values={formValues}
        config={formConfig}
        loading={updating}
        validationSchema={BusinessEntitySchema}
      />
    </div>
  );
};

export default SupplierForm;
