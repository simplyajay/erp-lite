import api from "@/lib/axios";
import { handleResponse } from "@/lib/api.service";

export const signIn = async (payload = {}, config = {}) => {
  return await handleResponse(api.post("api/auth/login", payload, config));
};

export const endSession = async (config = {}) => {
  return await handleResponse(api.get("api/auth/logout", config));
};

export const validateRegistrationStep = async (payload = {}, config = {}) => {
  return await handleResponse(api.post(`api/auth/validate-register`, payload, config));
};

export const generateRegSessionId = async (payload = {}, config = {}) => {
  return await handleResponse(api.post(`api/auth/registration-session/init`, payload, config));
};

export const validateRegSessionId = async (payload = {}, config = {}) => {
  return await handleResponse(api.post(`api/auth/registration-session/status`, payload, config));
};
