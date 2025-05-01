import api from "@/lib/axios";
import { handleResponse } from "@/lib/api.service";

export const signIn = async (payload = {}, config = {}) => {
  return await handleResponse(api.post("api/auth/login", payload, config));
};

export const endSession = async (config = {}) => {
  return await handleResponse(api.get("api/auth/logout", config));
};

export const validateFields = async (values, config = {}) => {
  return await handleResponse(api.post("api/auth/validate-field-data", values, config));
};
