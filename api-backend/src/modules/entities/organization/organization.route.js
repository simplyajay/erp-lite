import express from "express";
import requireAuth from "../../../core/middlewares/auth/requireAuth.js";
import {
  createOrganization,
  findOrganization,
  updateOrganization,
} from "./organization.controller.js";

const organizationRouter = express.Router();

organizationRouter.post("/", createOrganization);
organizationRouter.get("/:id", requireAuth, findOrganization);
organizationRouter.put("/:id", requireAuth, updateOrganization);

export default organizationRouter;
