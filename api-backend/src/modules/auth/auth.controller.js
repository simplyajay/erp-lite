import authService from "./auth.session.service.js";
import validationService from "../../core/services/validateFields.service.js";
import RegistrationValidationService from "./auth.registration.service.js";
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

export const validateRegistrationStep = async (req, res) => {
  const { accountType, currentStep } = req.body;

  const regValidationService = new RegistrationValidationService(accountType, currentStep);

  return await handleResponse({
    promise: regValidationService.validateCurrentStep(),
    res,
  });
};

// mawala ni
export const validateFields = async (req, res) => {
  return await handleResponse({
    promise: validationService.validateFields(req),
    res,
  });
};
