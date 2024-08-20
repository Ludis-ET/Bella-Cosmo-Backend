const express = require("express");
const { registerAdmin, loginAdmin, getUsers } = require("../controllers/adminController");
const router = express.Router();
const {protectAdmin} = require("../middlewares/authMiddleware");


router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
// add protectAdmin to verify that only admins are allowed to get the list of users
router.get("/users", protectAdmin, getUsers);


module.exports = router;
