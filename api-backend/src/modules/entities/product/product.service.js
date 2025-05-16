import ModelRepository from "../../repositories/model.repository.js";
import Product from "./product.model.js";

class ProductService {
  constructor() {
    this.productRepository = new ModelRepository(Product);
  }
  async createProduct(req) {
    const _ownerId = req?.user?._orgId || req?.user?._id;
    const prod = req.body;
    const product = { _ownerId, ...prod };
    return await this.productRepository.create(product);
  }

  async findAllProducts(req) {
    const _ownerId = req?.user?._orgId || req?.user?._id;
    const target = { _ownerId };
    let queryParams = req.query;
    const searchableFields = ["name", "description", "sku"];
    return await this.productRepository.findAllWithFilter(target, queryParams, searchableFields);
  }

  async updateProductById(req) {
    const { id } = req?.params;
    return await this.productRepository.updateById(id, req.body, { returnOriginal: false });
  }

  async deleteProductById(req) {
    const { id } = req.params;
    return await this.productRepository.deleteById(id);
  }
}

export default new ProductService();
