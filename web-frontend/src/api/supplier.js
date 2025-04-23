import api from "@/lib/axios";
import { handleResponse } from "@/lib/api.service";

export const addSupplier = async (payload = {}, config = {}) => {
  return await handleResponse(api.post("/api/suppliers/add", payload, config));
};
export const getSuppliers = async (config = {}) => {
  return await handleResponse(api.get("/api/suppliers", config));
};
export const getSupplier = async (id, config = {}) => {
  return await handleResponse(api.get(`/api/suppliers/${id}`, config));
};
export const updateSupplier = async (id, payload = {}, config = {}) => {
  return await handleResponse(api.put(`/api/suppliers/update/${id}`, payload, config));
};
