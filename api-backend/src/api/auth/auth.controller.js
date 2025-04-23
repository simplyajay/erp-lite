import apiService from "../service/api.service.js";
import authService from "./auth.service.js";

export const authenticateLogin = async (req, res) => {
  return await apiService.handleResponse({
    promise: authService.loginUser(req),
    res,
    successMessage: "Login successful",
    notFoundMessage: "Invalid Credentials",
  });
};

export const authenticateLogout = async (req, res) => {
  return await apiService.handleResponse({
    promise: authService.logoutUser(),
    res,
    successMessage: "Logout successful",
  });
};
