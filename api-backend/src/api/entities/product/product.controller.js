import apiService from "../../service/api.service.js";
import productService from "./product.service.js";

export const createProduct = async (req, res) => {
  return await apiService.handleResponse({
    promise: productService.createProduct(req),
    res,
    successMessage: "Successfully added new product",
  });
};

export const getAllProducts = async (req, res) => {
  return await apiService.handleResponse({
    promise: productService.findAllProducts(req),
    res,
  });
};

export const updateProduct = async (req, res) => {
  return await apiService.handleResponse({
    promise: productService.updateProductById(req),
    res,
    successMessage: "Update successful",
  });
};
