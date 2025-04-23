import React from "react";
import Suppliers from "./components/Suppliers";
import { getSuppliers } from "@/api/supplier";
import { serverAPI } from "@/lib/axios.server";

export const metadata = {
  robots: "noindex, nofollow", // Prevent search engines from indexing this page
  title: "Suppliers",
};

const SuppliersPage = async () => {
  const res = await serverAPI((headers) => getSuppliers({ headers }));
  return (
    <div className="h-full w-full bg-white">
      <Suppliers data={res.data} />
    </div>
  );
};

export default SuppliersPage;
