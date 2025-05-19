import userService from "../../modules/entities/user/user.service.js";
import organizationService from "../../modules/entities/organization/organization.service.js";
import createError from "http-errors";
import { Filter } from "bad-words";

export const validateUniqueness = async (entity = null, data) => {
  if (!["user", "organization"].includes(entity)) {
    console.error("Unknown entity: ", entity);
    return;
  }

  const fieldsToValidate = ["username", "email"];

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
};

export const validateNoProfanity = async (data) => {
  const filter = new Filter();

  for (const [field, value] of Object.entries(data)) {
    if (typeof value !== "string" || !value.trim()) continue;

    if (filter.isProfane(value)) {
      const error = createError(422, `Profanity is not allowed.`);
      error.keyValue = { [field]: value };
      throw error;
    }
  }

  return { valid: true };
};
