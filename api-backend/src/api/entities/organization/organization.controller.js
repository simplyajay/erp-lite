import User from "../user/user.model.js";
import Organization from "./organization.model.js";
import organizationService from "./organization.service.js";
import apiService from "../../service/api.service.js";

export const createOrganization = async (req, res) => {
  return await apiService.handleResponse({
    promise: organizationService.createOrganization(req),
    res,
  });
};

export const findOrganization = async (req, res) => {
  return await apiService.handleResponse({
    promise: organizationService.createOrganization(req),
    res,
    notFoundMessage: "Organization not found",
  });
};

export const updateOrganization = async (req, res) => {
  try {
    const { id } = req.params;

    const org = await Organization.findByIdAndUpdate(id, req.body);

    if (!org) {
      return res.status(404).json({ message: "Organization not found" });
    }

    const updatedOrg = await Organization.findById(id);
    res.status(200).json(updatedOrg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
