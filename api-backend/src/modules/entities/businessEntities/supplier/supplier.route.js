import express from "express";
import requireAuth from "../../../../core/middlewares/auth/requireAuth.js";
import {
  createSupplier,
  getSupplier,
  getAllSuppliers,
  updateSupplier,
} from "./supplier.controller.js";

const supplierRouter = express.Router();

supplierRouter.post("/add", requireAuth, createSupplier);
supplierRouter.get("/:id", requireAuth, getSupplier);
supplierRouter.get("/", requireAuth, getAllSuppliers);
supplierRouter.put("/update/:id", requireAuth, updateSupplier);

export default supplierRouter;
