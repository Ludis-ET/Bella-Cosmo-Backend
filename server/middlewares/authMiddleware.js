const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Admin = require("../models/Admin");

/*These middleware functions are typically used to protect routes that require user or admin authentication.
For example, you might use the protectUser middleware for routes that require the user to be logged in,
and the protectAdmin middleware for routes that require the user to be an admin.  */

const protectUser = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");

  }
};
//new update
/* Wrapped the entire middleware function in a try-catch block to handle any errors that might occur.
Moved the if (!token) block inside the try block, as it's part of the same logical flow.
Instead of throwing an error, the middleware now sends a JSON response with an appropriate error message and HTTP status code.
The return statement is added after the error response to ensure the middleware function doesn't continue to the next middleware or route handler. */

const protectAdmin = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // i have used different JWT token that has admin role in it when an admin register
      if (decoded.role !== "admin") {
        res.status(403).json({message : "Admin Role Required" });
      return;
    }
      req.admin = await Admin.findById(decoded.id).select("-password");
      next();
    } else {
      res.status(401).json({ message: "Not authorized, no token" });
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Not authorized, Invalid token failed" });
    return;
  }
};

module.exports = { protectUser, protectAdmin };
