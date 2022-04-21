const express = require("express");
const {
  registerUser,
  loginUser,
  refreshAccessToken,
  getUserById,
} = require("../controller/auth");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Auth Route");
});

router.get("/:id", getUserById);

// User Registration and login
router.post("/register", registerUser);
router.post("/login", loginUser);

//Access Token Refresh Route
router.post("/refresh_token", refreshAccessToken);

module.exports = router;
