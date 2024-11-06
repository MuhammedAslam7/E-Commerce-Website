import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res
      .status(403)
      .json({ message: "Token is required for authorization" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    req.user = decoded;
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
  return next();
};
