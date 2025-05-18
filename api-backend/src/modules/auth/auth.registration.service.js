// write the registration step validation here
// step1 = business fields [name, email, trn, etc]
// step2 = user personal information fields ( the person who is creating the business account) [name, email]
// step3 = user account information fields ( username and password )

// each step should utilize different service but execute it in the same function, 1 service fails = operation fails
// return status 500

import validateFieldsService from "../../core/services/validateFields.service.js";
import { Filter } from "bad-words";

class RegistrationValidationService {
  constructor(accountType, currentStep) {
    this.currentStep = currentStep;
    this.accountType = accountType;
  }

  async validateCurrentStep(req) {}

  //business name, email, check profanity
  async validateBusinessInformation(req) {}

  //name, email, check profanity
  async validateUserInformation(req) {}

  //pw, username
  async validateAccountInformation(req) {}
}

export default RegistrationValidationService;
