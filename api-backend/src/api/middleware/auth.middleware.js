import authService from "../service/token.service.js";

const authMiddleWare = (req, res, next) => {
  const token = authService.extractToken(req);

  if (!token) {
    return res
      .status(401)
      .json({ ok: false, data: null, message: "Unauthorized. No token provided" });
  }

  try {
    const decoded = authService.verifyToken(token);

    if (!decoded) {
      return res
        .status(401)
        .json({ ok: false, data: null, message: "Unauthorized, Invalid token" });
    }
    req.user = decoded; // attach user object to req before sending it to the endpoint
    return next();
  } catch (error) {
    console.error("Error", error);
    return res.status(401).json({ ok: false, data: null, message: "Unauthorized, Invalid token" });
  }
};

export default authMiddleWare;
