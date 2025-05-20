import express from "express";
import requireAuth from "../../core/middlewares/auth/requireAuth.js";
import {
  authenticateLogin,
  authenticateLogout,
  validateRegistrationStep,
  regSessionInit,
  regSessionStatus,
} from "../auth/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/login", authenticateLogin);
authRouter.post("/logout", requireAuth, authenticateLogout);
authRouter.post("/validate-register", validateRegistrationStep);
authRouter.post("/registration-session/init", regSessionInit);
authRouter.post("/registration-session/status", regSessionStatus);

export default authRouter;
