import apiService from "../service/api.service.js";
import validationService from "./validation.service.js";

export const validateOrgEmail = async (req, res) => {
  return await apiService.handleResponse({
    promise: validationService.validateOrganizationEmail(req),
    res,
    conflictMessage: "This email is already taken",
  });
};

export const validateUserEmail = async (req, res) => {
  return await apiService.handleResponse({
    promise: validationService.validateUserEmail(req),
    res,
    conflictMessage: "This email is already taken",
  });
};
