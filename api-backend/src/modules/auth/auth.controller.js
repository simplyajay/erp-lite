import authService from "./auth.service.js";
import { handleResponse } from "../../core/services/api.service.js";

export const authenticateLogin = async (req, res) => {
  return await handleResponse({
    promise: authService.loginUser(req),
    res,
    successMessage: "Login successful",
    notFoundMessage: "Invalid Credentials",
  });
};

export const authenticateLogout = async (req, res) => {
  return await handleResponse({
    promise: authService.logoutUser(),
    res,
    successMessage: "Logout successful",
  });
};
