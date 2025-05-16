import ModelRepository from "../../repositories/model.repository.js";
import Organization from "./organization.model.js";

class OrganizationService {
  constructor() {
    this.organizationRepository = new ModelRepository(Organization);
  }

  async createOrganization(req) {
    const organization = req.body;
    return await this.organizationRepository.create(organization);
  }

  async findOrganizationById(req) {
    const { id } = req.params;
    return await this.organizationRepository.findById(id);
  }

  async fieldExists(field, value) {
    if (field) return await this.organizationRepository.doesExist(field, value);

    return false;
  }

  async updateOrganizationById() {}
}

export default new OrganizationService();
