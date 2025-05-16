import validationService from "./validation.service.js";
import { handleResponse } from "../../core/services/api.service.js";

export const validateData = async (req, res) => {
  return await handleResponse({
    promise: validationService.validateFields(req),
    res,
  });
};
