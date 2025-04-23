import express from "express";
import authMiddleWare from "../../middleware/auth.middleware.js";
import {
  createDocument,
  getDocument,
  getAllDocuments,
  getDocumentsByEntity,
  updateDocument,
} from "./document.controller.js";

const documentRouter = express.Router();

documentRouter.post("/add", authMiddleWare, createDocument);
documentRouter.get("/:id", authMiddleWare, getDocument);
documentRouter.get("/", authMiddleWare, getAllDocuments);
documentRouter.get("/entity/:entityId", authMiddleWare, getDocumentsByEntity);
documentRouter.put("/update/:id", authMiddleWare, updateDocument);

export default documentRouter;
