import jwt from "jsonwebtoken";

export const extractToken = (req) => {
  const authHeader = req?.headers?.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }

  return req?.cookies?.[process.env.AUTH_TOKEN] || null;
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};
