import hashService from "../../service/hash.service.js";
import ModelRepository from "../../repositories/model.repository.js";
import User from "./user.model.js";

class UserService {
  constructor() {
    this.userRepository = new ModelRepository(User);
  }
  async registerUser(req) {
    const { password, ...rest } = req.body;
    const hashedPassword = await hashService.hashPassword(password);
    return await this.userRepository.create({ password: hashedPassword, ...rest });
  }

  async findAllUsers() {
    return await this.userRepository.findAll(null, { password: 0 });
  }

  async findUserById(req) {
    const { id } = req.params;
    return await this.userRepository.findById(id, { password: 0 }); //exclude password
  }

  async findUserByIdentifier(req) {
    const { identifier } = req.body || {};
    return await this.userRepository.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });
  }

  async findCurrentUser(req) {
    const { _id } = req.user;
    return await this.userRepository.findById(_id, { password: 0 });
  }

  async emailExists(req) {
    const { email } = req.body;
    return await User.exists({ email: email.toLowerCase() });
  }
}

export default new UserService();
