import QueryService from "../../core/services/query.service.js";

class ModelRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      return await this.model.create(data);
    } catch (error) {
      throw error;
    }
  }

  async findOne(projection = {}) {
    try {
      return await this.model.findOne(projection).lean();
    } catch (error) {
      throw error;
    }
  }

  async findAll(options = {}, projection = {}) {
    try {
      return await this.model.find(options, projection).lean();
    } catch (error) {
      throw error;
    }
  }

  async findAllWithFilter(target, queryParams, searchableFields) {
    try {
      const keyword = queryParams?.keyword;
      const filter = QueryService.getFilter(target, queryParams, searchableFields);
      const sort = QueryService.getSort(queryParams);

      const by = Object.keys(sort)[0]; // sort by
      const order = sort[by] === 1 ? "asc" : "desc"; // sort order

      const { page, limit, skip } = QueryService.getPagination(queryParams);

      const items = await this.model
        .find(filter)
        .sort(sort)
        .collation({ locale: "en", strength: 1 }) // case-insensitive sorting
        .limit(limit)
        .skip(skip);
      const totalItems = await this.model.countDocuments(filter);
      const totalPages = Math.max(1, Math.ceil(totalItems / limit));

      return { items, totalItems, page, totalPages, sort: { by, order }, keyword };
    } catch (error) {
      throw error;
    }
  }

  async findById(id, projection = {}) {
    try {
      return await this.model.findById(id, projection).lean();
    } catch (error) {
      throw error;
    }
  }

  async doesExist(key, value) {
    try {
      return await this.model.exists({ [key]: value.toLowerCase() });
    } catch (error) {
      throw error;
    }
  }

  async updateById(id, updateData, options = {}) {
    try {
      return await this.model.findByIdAndUpdate(id, updateData, options);
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id) {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }

  async getCount(options = {}) {
    try {
      return await this.model.countDocuments(options);
    } catch (error) {
      throw error;
    }
  }
}

export default ModelRepository;
