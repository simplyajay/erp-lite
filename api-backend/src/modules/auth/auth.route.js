import express from "express";
import requireAuth from "../../core/middlewares/auth/requireAuth.js";
import { authenticateLogin, authenticateLogout } from "../auth/auth.controller.js";
import { validateData } from "./validation.controller.js";

const authRouter = express.Router();

authRouter.post("/login", authenticateLogin);
authRouter.post("/logout", requireAuth, authenticateLogout);
authRouter.post("/validate-field-data", validateData);

export default authRouter;
