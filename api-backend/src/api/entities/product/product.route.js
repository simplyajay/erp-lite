import express from "express";
import { createProduct, getAllProducts, updateProduct } from "./product.controller.js";
import authMiddleWare from "../../middleware/auth.middleware.js";

const productRouter = express.Router();

productRouter.post("/add", authMiddleWare, createProduct);
productRouter.get("/", authMiddleWare, getAllProducts);
productRouter.put("/update/:id", authMiddleWare, updateProduct);

export default productRouter;
