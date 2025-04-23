import jwt from "jsonwebtoken";

export const createCookie = (key, value, options = {}) => ({
  key,
  value,
  options: {
    httpOnly: true,
    maxAge: 30 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    ...options,
  },
});

export const createClearCookie = (key, options = {}) => ({
  key,
  options: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    ...options,
  },
});

export const generateAuthCookies = (user) => {
  const tokenPayload = {
    _id: user._id,
    ...(user._orgId && { _orgId: user._orgId }),
  };

  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);

  return [createCookie("auth_token", token)];
};
