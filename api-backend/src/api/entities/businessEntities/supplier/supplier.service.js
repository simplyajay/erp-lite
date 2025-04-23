import ModelRepository from "../../../repositories/model.repository.js";
import BusinessEntity from "../businessEntity.model.js";

class SupplierService {
  constructor() {
    this.supplierRepository = new ModelRepository(BusinessEntity);
  }

  async createSupplier(req) {
    const _ownerId = req?.user?._orgId || req?.user?._id;
    const supplier = { _ownerId, type: "supplier", ...req.body };
    return await this.supplierRepository.create(supplier);
  }

  async findSupplierById(req) {
    const { id } = req.params;
    return await this.supplierRepository.findById(id, { returnOriginal: false });
  }

  async findAllSuppliers(req) {
    const _ownerId = req?.user?._orgId || req?.user?._id;
    const target = { _ownerId, type: "supplier" };
    const queryParams = req.query;
    const searchableFields = ["address.country", "address.state", "name", "description"];
    return await this.supplierRepository.findAllWithFilter(target, queryParams, searchableFields);
  }

  async updateSupplierById(req) {
    const { id } = req.params;
    return await this.supplierRepository.updateById(id, req.body, { returnOriginal: false });
  }

  async deleteSupplierById(req) {
    const { id } = req.paras;
    return await this.supplierRepository.deleteById(id);
  }
}

export default new SupplierService();
