import express from "express";
import requireAuth from "../../../core/middlewares/auth/requireAuth.js";
import {
  createDocument,
  getDocument,
  getAllDocuments,
  getDocumentsByEntity,
  updateDocument,
} from "./document.controller.js";

const documentRouter = express.Router();

documentRouter.post("/add", requireAuth, createDocument);
documentRouter.get("/:id", requireAuth, getDocument);
documentRouter.get("/", requireAuth, getAllDocuments);
documentRouter.get("/entity/:entityId", requireAuth, getDocumentsByEntity);
documentRouter.put("/update/:id", requireAuth, updateDocument);

export default documentRouter;
