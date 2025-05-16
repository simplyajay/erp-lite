import authService from "./auth.session.service.js";
import { handleResponse } from "../../core/services/api.service.js";

export const authenticateLogin = async (req, res) => {
  return await handleResponse({
    promise: authService.login(req),
    res,
    successMessage: "Login successful",
    notFoundMessage: "Invalid Credentials",
  });
};

export const authenticateLogout = async (req, res) => {
  return await handleResponse({
    promise: authService.logout(),
    res,
    successMessage: "Logout successful",
  });
};
