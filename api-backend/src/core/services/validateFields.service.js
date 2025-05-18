import userService from "../../modules/entities/user/user.service.js";
import organizationService from "../../modules/entities/organization/organization.service.js";
import createError from "http-errors";

class FieldValidationService {
  async validateFields(req) {
    const entity = req.query?.entity;
    const data = req.body;

    if (!["user", "organization"].includes(entity)) {
      console.error("Invalid entity type");
      return;
    }

    const fieldsToValidate = ["username", "email"]; // update whenever necessary
    const service = entity === "organization" ? organizationService : userService;

    for (const field of fieldsToValidate) {
      if (!data?.[field]) continue;

      const value = data[field];

      const exists = await service.fieldExists(field, value);

      if (exists) {
        const error = createError(409, `This ${field} is already taken.`);
        error.keyValue = { [field]: value };
        throw error;
      }
    }

    return { valid: true };
  }
}

export default new FieldValidationService();
