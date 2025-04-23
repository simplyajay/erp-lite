class QueryService {
  static getFilter(target = {}, queryParams = {}, searchableFields = []) {
    let filter = { ...target };

    if (queryParams.keyword && searchableFields.length) {
      const keyword = queryParams.keyword.trim();
      const searchQuery = searchableFields.map((field) => ({
        [field]: { $regex: keyword, $options: "i" },
      }));

      filter.$or = filter.$or ? [...filter.$or, ...searchQuery] : searchQuery;
    }

    return filter;
  }
  static getSort(queryParams = {}) {
    if (queryParams?.sort) {
      const { by, order } = JSON.parse(queryParams.sort);
      const sort = { [by]: order === "asc" ? 1 : -1 };
      return sort;
    } else {
      const sort = { _createdAt: 1 };
      return sort;
    }
  }

  static getPagination(queryParams = {}) {
    const page = parseInt(queryParams.page) || 1;
    const limit = parseInt(queryParams.limit) || 15;
    const skip = (page - 1) * limit;

    return { page, limit, skip };
  }
}

export default QueryService;
