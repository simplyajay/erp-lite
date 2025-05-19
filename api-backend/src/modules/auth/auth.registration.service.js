import {
  validateNoProfanity,
  validateUniqueness,
} from "../../core/services/validateFields.service.js";
import redisService from "../../core/services/redis.service.js";

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
    redisService.setJSON("user:registration", data, 3600); // 1 hr life. // update to be killed immediately when user navigates away from reg form
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
