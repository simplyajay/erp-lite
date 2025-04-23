import React from "react";
import Stocks from "./components/Stocks";
import { getProducts } from "@/api/products";
import { serverAPI } from "@/lib/axios.server";

export const metadata = {
  robots: "noindex, nofollow", // Prevent search engines from indexing this page
  title: "Stocks",
};

const StocksPage = async () => {
  const res = await serverAPI((headers) => getProducts({ headers }));

  return (
    <div className="h-full w-full">
      <Stocks data={res.data} />
    </div>
  );
};

export default StocksPage;
