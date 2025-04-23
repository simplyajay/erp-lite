import { handleResponse } from "@/lib/api.service";
import api from "@/lib/axios";

export const getCurrentUser = async (config = {}) => {
  return await handleResponse(api.get("/api/users/me", config));
};
