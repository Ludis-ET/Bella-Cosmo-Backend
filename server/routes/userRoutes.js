const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
//logout user
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.send("User logged out!");
});


module.exports = router;
