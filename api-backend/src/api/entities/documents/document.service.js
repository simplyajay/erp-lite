import ModelRepository from "../../repositories/model.repository.js";
import Document from "./document.model.js";

class DocumentService {
  constructor() {
    this.documentRepository = new ModelRepository(Document);
  }
  async createDocument(req) {
    const _ownerId = req?.user?._orgId || req?.user?._id;
    const doc = req.body;
    const document = { _ownerId, ...doc };
    return await this.documentRepository.create(document);
  }

  async findDocumentById(req) {
    const { id } = req.params;
    return await this.documentRepository.findById(id);
  }

  async findAllDocuments(req) {
    const _ownerId = req?.user?._orgId || req?.user?._id;
    const queryParams = req.query;
    const searchableFields = ["_documentId", "description", "memorandum"];
    return await this.documentRepository.findAllWithFilter(
      { _ownerId },
      queryParams,
      searchableFields
    );
  }

  async findAllDocumentsByEntity(req) {
    const _ownerId = req?.user?._orgId || req?.user?._id;
    const { entityId } = req.params;
    const queryParams = req.query;
    const target = { _ownerId, _entityId: entityId };
    const searchableFields = ["_documentId", "description", "memorandum"];
    return await this.documentRepository.findAllWithFilter(target, queryParams, searchableFields);
  }

  async updateDocumentById(req) {
    const { id } = req.params;
    const updateData = req.body;
    return await this.documentRepository.updateById(id, updateData);
  }

  async deleteDocumentById() {
    const { id } = req.params;
    return await documentRepository.deleteById(id);
  }

  async generateDocumentId(prefix) {
    const number = Math.floor(10000 + Math.random() * 90000);
    return `${prefix}-${number}`;
  }
}

export default new DocumentService();
