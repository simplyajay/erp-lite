import React from "react";
import { getSupplier } from "@/api/supplier";
//import { getGeoData } from "@/utils/bussinessEntityForm.util";
import SupplierDetails from "./components/SupplierDetails";
import { getDocumentsByEntity } from "@/api/documents";
import { serverAPI } from "@/lib/axios.server";
export const metadata = {
  robots: "noindex, nofollow", // Prevent search engines from indexing this page
  title: "Suppliers | Detail",
};

const SupplierDetailPage = async ({ params }) => {
  const supplierRes = await serverAPI((headers) => getSupplier(params.id, { headers }));
  const supplier = supplierRes.data;

  const documentsRes = await serverAPI((headers) =>
    getDocumentsByEntity(supplier._id, { headers })
  );
  const documentsData = documentsRes.data;
  //const geoData = await getGeoData();
  const geoData = { countries: ["United Arab Emirates", "Panama"] };

  return (
    <div className="w-full h-full bg-white">
      <SupplierDetails supplier={supplier} documents={documentsData} geoData={geoData} />
    </div>
  );
};

export default SupplierDetailPage;
