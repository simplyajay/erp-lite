import userService from "./user.service.js";
import apiService from "../../service/api.service.js";

export const createUser = async (req, res) => {
  return await apiService.handleResponse({
    promise: userService.registerUser(req),
    res,
  });
};

export const getAllUsers = async (req, res) => {
  return await apiService.handleResponse({
    promise: userService.findAllUsers(),
    res,
  });
};

export const getUser = async (req, res) => {
  return await apiService.handleResponse({
    promise: userService.findUserById(req),
    res,
    notFoundMessage: "User not found",
  });
};

export const getCurrentUser = async (req, res) => {
  return await apiService.handleResponse({
    promise: userService.findCurrentUser(req),
    res,
    notFoundMessage: "User not found",
  });
};
