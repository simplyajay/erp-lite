import apiService from "../service/api.service.js";
import validationService from "./validation.service.js";

export const validateData = async (req, res) => {
  return await apiService.handleResponse({
    promise: validationService.validateFields(req),
    res,
  });
};
