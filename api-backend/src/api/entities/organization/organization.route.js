import express from "express";
import {
  createOrganization,
  findOrganization,
  updateOrganization,
} from "./organization.controller.js";
import authMiddleWare from "../../middleware/auth.middleware.js";

const organizationRouter = express.Router();

organizationRouter.post("/", createOrganization);
organizationRouter.get("/:id", authMiddleWare, findOrganization);
organizationRouter.put("/:id", authMiddleWare, updateOrganization);

export default organizationRouter;
