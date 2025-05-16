import express from "express";
import requireAuth from "../../../core/middlewares/auth/requireAuth.js";
import { createUser, getAllUsers, getCurrentUser, getUser } from "./user.controller.js";

const userRouter = express.Router();

userRouter.post("/register", createUser);
userRouter.get("/", requireAuth, getAllUsers);
userRouter.get("/me", requireAuth, getCurrentUser);
userRouter.get("/:id", requireAuth, getUser);

export default userRouter;
