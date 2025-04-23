import express from "express";
import authMiddleWare from "../../middleware/auth.middleware.js";
import { createUser, getAllUsers, getCurrentUser, getUser } from "./user.controller.js";

const userRouter = express.Router();

userRouter.post("/register", createUser);
userRouter.get("/", authMiddleWare, getAllUsers);
userRouter.get("/me", authMiddleWare, getCurrentUser);
userRouter.get("/:id", authMiddleWare, getUser);

export default userRouter;
