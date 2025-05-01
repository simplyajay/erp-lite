import userService from "../entities/user/user.service.js";
import organizationService from "../entities/organization/organization.service.js";
import createError from "http-errors";

class ValidationService {
  async validateFields(req) {
    const { user, organization } = req.body;

    const allowedFields = ["username", "email"];

    const checkField = async (entity, name, service, field) => {
      if (!entity?.[field]) return;

      const value = entity[field];

      const exists = await service.fieldExists(field, value);

      if (exists) {
        const error = createError(409, `This ${field} is already taken.`);
        error.data = { entity: name, keyValue: { [field]: value } };
        throw error;
      }
    };

    for (const field of allowedFields) {
      await checkField(user, "user", userService, field);
      await checkField(organization, "organization", organizationService, field);
    }

    return { valid: true };
  }
}

export default new ValidationService();
