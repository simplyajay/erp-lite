import validationService from "../services/fields.validation.service.js";
import { handleResponse } from "../services/api.service.js";

export const validateData = async (req, res) => {
  return await handleResponse({
    promise: validationService.validateFields(req),
    res,
  });
};
