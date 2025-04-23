import express from "express";
import authMiddleWare from "../../../middleware/auth.middleware.js";
import {
  createSupplier,
  getSupplier,
  getAllSuppliers,
  updateSupplier,
} from "./supplier.controller.js";

const supplierRouter = express.Router();

supplierRouter.post("/add", authMiddleWare, createSupplier);
supplierRouter.get("/:id", authMiddleWare, getSupplier);
supplierRouter.get("/", authMiddleWare, getAllSuppliers);
supplierRouter.put("/update/:id", authMiddleWare, updateSupplier);

export default supplierRouter;
