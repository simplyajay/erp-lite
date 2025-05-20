import {
  validateNoProfanity,
  validateUniqueness,
} from "../../core/services/validateFields.service.js";
import redisService from "../../core/services/redis.service.js";
import envConfig from "../../config/env.config.js";
import { v4 as uuidv4 } from "uuid";

const runValidators = async (validators) => {
  for (const validator of validators) {
    await validator();
  }
  return { valid: true };
};

const validateBusinessInformation = async (req) => {
  const data = req.body;
  const { entity } = req.query;

  const validators = [() => validateUniqueness(entity, data), () => validateNoProfanity(data)];

  const validatorRes = await runValidators(validators);

  if (validatorRes.valid) {
    redisService.setJSON("user:registration", data, 3600);
  }

  return validatorRes;
};

const validateUserInformation = async (req) => {
  const data = req.body;
  const { entity } = req.query;

  const validators = [() => validateUniqueness(entity, data), () => validateNoProfanity(data)];

  return await runValidators(validators);
};

const validateAccountInformation = async (req) => {};

export const createRegSession = async (req) => {
  const data = req.body;
  const { accountType, formData } = data;

  if (!accountType) return;

  const payload = formData ? { accountType, ...formData } : { accountType };

  const registrationSessionId = uuidv4();

  redisService.setJSON(
    `${envConfig.get("REDIS_REG_PREFIX")}:reg-session-id:${registrationSessionId}`,
    payload,
    1800
  );

  return { uuidv4: registrationSessionId };
};

export const validateRegSession = async (req) => {
  const { uuid } = req.body;

  if (!uuid) return;

  const data = await redisService.getJSON(
    `${envConfig.get("REDIS_REG_PREFIX")}:reg-session-id:${uuid}`
  );

  if (!data) {
    return { active: false, context: undefined };
  }

  return { active: true, context: data };
};

export const validateCurrentStep = async (req) => {
  const { step } = req.query;

  const validators = {
    2: validateBusinessInformation,
    3: validateUserInformation,
    4: validateAccountInformation,
  };

  const validate = validators[step];

  if (!validate) throw new Error(`Invalid validation step: ${step}`);

  return await validate(req);
};
