const express = require("express");
const {
  registerAdmin,
  loginAdmin,
  getUsers,
  logoutAdmin,
} = require("../controllers/adminController");
const router = express.Router();
const { protectAdmin } = require("../middlewares/authMiddleware");

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/logout", protectAdmin, logoutAdmin);
router.get("/users", protectAdmin, getUsers);


module.exports = router; 
