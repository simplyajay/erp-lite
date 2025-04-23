import userService from "../entities/user/user.service.js";
import hashService from "../service/hash.service.js";
import { generateAuthCookies, createClearCookie } from "../util/cookie.util.js";

class UserService {
  async loginUser(req) {
    const { password } = req.body || {};
    const user = await userService.findUserByIdentifier(req);
    if (!user) return null;

    const match = await hashService.comparePassword(password, user.password);
    if (!match) return null;

    const cookies = generateAuthCookies(user);

    return { loggedIn: true, cookies };
  }

  async logoutUser() {
    const clearCookies = [createClearCookie("auth_token")];

    return { loggedIn: false, clearCookies };
  }
}

export default new UserService();
