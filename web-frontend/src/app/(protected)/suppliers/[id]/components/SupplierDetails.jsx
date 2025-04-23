"use client";
import React, { useState, useEffect } from "react";
import SupplierDocumentsTable from "./SupplierDocumentsTable";
import SupplierDetailsOverview from "./SupplierDetailsOverview";
import { useSupplierDocuments } from "../hooks/useSupplierDocuments";
import FormDialog from "@/components/dialogs/FormDialog";
import SupplierForm from "../../common/SupplierForm";
import { useRouter } from "next/navigation";
import { getDocumentsByEntity } from "@/api/documents";

const SupplierDetails = ({ supplier, documents, geoData }) => {
  const { state, updateState, fetchData } = useSupplierDocuments(documents);
  const { form } = state;

  const fetchDocuments = ({
    page = 1,
    sort = { by: "_documentId", order: "asc" },
    keyword = "",
  } = {}) => {
    const config = { params: { page, sort: JSON.stringify(sort), keyword } };
    return fetchData(() => getDocumentsByEntity(supplier._id, config));
  };

  const router = useRouter();

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex flex-wrap">
        <SupplierDetailsOverview
          supplier={supplier}
          onEdit={() => updateState({ form: { visible: true, type: "edit" } })}
        />
      </div>

      <SupplierDocumentsTable
        state={state}
        updateState={updateState}
        fetchDocuments={fetchDocuments}
      />

      {form?.visible && (
        <FormDialog>
          <SupplierForm
            entity={supplier}
            state={state}
            updateState={updateState}
            fetchSuppliers={() => console.log("test")}
          />
        </FormDialog>
      )}
    </div>
  );
};

export default SupplierDetails;
