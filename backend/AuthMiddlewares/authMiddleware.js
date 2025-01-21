const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("Authorization Header: ", authHeader); // Log header for debugging
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: Token is missing" });
    }
  
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token: ", decoded); // Log decoded token for debugging
      req.user = decoded; // Attach user info to the request
      next(); // Proceed to the next middleware or route handler
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized: Token expired or invalid" });
    }
  };

module.exports = authMiddleware;
