import userService from "../entities/user/user.service.js";
import organizationService from "../entities/organization/organization.service.js";
import createError from "http-errors";

class ValidationService {
  async validateOrganizationEmail(req) {
    const exists = await organizationService.emailExists(req);

    if (exists) {
      throw createError(409, "Email already taken");
    }

    return { emailValid: true };
  }

  async validateUserEmail(req) {
    const exists = await userService.emailExists(req);

    if (exists) {
      throw createError(409, "Email already taken");
    }

    return { emailValid: true };
  }
}

export default new ValidationService();
