import express from "express";
import requireAuth from "../../core/middlewares/auth/requireAuth.js";
import {
  authenticateLogin,
  authenticateLogout,
  validateRegistrationStep,
} from "../auth/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/login", authenticateLogin);
authRouter.post("/logout", requireAuth, authenticateLogout);
authRouter.post("/validate-register", validateRegistrationStep);

export default authRouter;
