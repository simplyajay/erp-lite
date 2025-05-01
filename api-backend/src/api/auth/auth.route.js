import express from "express";
import { authenticateLogin, authenticateLogout } from "../auth/auth.controller.js";
import { validateData } from "./validation.controller.js";
import authMiddleWare from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/login", authenticateLogin);
authRouter.post("/logout", authMiddleWare, authenticateLogout);
authRouter.post("/validate-field-data", validateData);

export default authRouter;
