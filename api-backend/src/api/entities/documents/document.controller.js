import documentService from "./document.service.js";
import apiService from "../../service/api.service.js";

export const createDocument = async (req, res) => {
  return await apiService.handleResponse({
    promise: documentService.createDocument(req),
    res,
    successMessage: "Document created successfully",
  });
};

export const getDocument = async (req, res) => {
  return await apiService.handleResponse({
    promise: documentService.findDocumentById(req),
    res,
    notFoundMessage: "Document Not Found",
  });
};

export const getAllDocuments = async (req, res) => {
  return await apiService.handleResponse({
    promise: documentService.findAllDocuments(req),
    res,
    notFoundMessage: "No data found",
  });
};

export const getDocumentsByEntity = async (req, res) => {
  return await apiService.handleResponse({
    promise: documentService.findAllDocumentsByEntity(req),
    res,
    notFoundMessage: "No data found",
  });
};

export const updateDocument = async (req, res) => {
  return await apiService.handleResponse({
    promise: documentService.updateDocumentById(req),
    res,
    notFoundMessage: "Document not found",
    successMessage: "Document updated successfully",
  });
};
