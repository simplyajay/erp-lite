import express from "express";
import requireAuth from "../../../core/middlewares/auth/requireAuth.js";
import { createProduct, getAllProducts, updateProduct } from "./product.controller.js";

const productRouter = express.Router();

productRouter.post("/add", requireAuth, createProduct);
productRouter.get("/", requireAuth, getAllProducts);
productRouter.put("/update/:id", requireAuth, updateProduct);

export default productRouter;
