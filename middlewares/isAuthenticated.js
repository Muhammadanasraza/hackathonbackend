import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  try {
    let token;

    // Check Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // If not in Authorization header, check cookie
    if (!token && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is missing.",
      });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({
            success: false,
            message: "Token has expired. Please log in again.",
          });
        } else if (err.name === "JsonWebTokenError") {
          return res.status(401).json({
            success: false,
            message: "Invalid token. Please log in again.",
          });
        } else {
          return res.status(401).json({
            success: false,
            message: "Authentication failed.",
          });
        }
      }

      req.user = decoded; // Attach decoded payload to `req.user`
      req._id = decoded.id; // Attach user ID to `req._id`
      next(); // Continue to the next middleware/route
    });
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

// Middleware to check if user is admin
export const isAdmin = (req, res, next) => {
  if (!req.userId)
    return res.status(403).json({ success: false, message: "Unauthorized." });

  UserModal.findById(req.userId)
    .then((user) => {
      if (user.role !== "admin") {
        return res
          .status(403)
          .json({ success: false, message: "Access denied. Admins only." });
      }
      next();
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ success: false, message: "Error verifying admin role." });
    });
};


export default isAuthenticated;
