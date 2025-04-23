import express from "express";
import { authenticateLogin, authenticateLogout } from "../auth/auth.controller.js";
import { validateOrgEmail, validateUserEmail } from "./validation.controller.js";
import authMiddleWare from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/login", authenticateLogin);
authRouter.post("/logout", authMiddleWare, authenticateLogout);
authRouter.post("/validate-org-email", validateOrgEmail);
authRouter.post("/validate-user-email", validateUserEmail);

export default authRouter;
