const jwt = require("jsonwebtoken");

module.exports = (allowedRoles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    console.log("🔐 AUTH HEADER:", authHeader);

    // Check for missing or malformed token
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing or invalid.",
      });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("✅ DECODED USER:", decoded);

      // Attach user info to request for downstream use
      req.user = {
        id: decoded.id,
        role: decoded.role,
        name: decoded.name,
        email: decoded.email,
      };

      // If roles are restricted, check user role
      if (
        allowedRoles.length > 0 &&
        !allowedRoles.includes(req.user.role)
      ) {
        return res.status(403).json({
          success: false,
          message: "Access denied: insufficient permissions.",
        });
      }

      next();
    } catch (err) {
      console.error("❌ JWT ERROR:", err);
      return res.status(401).json({
        success: false,
        message: "Token invalid or expired.",
      });
    }
  };
};
