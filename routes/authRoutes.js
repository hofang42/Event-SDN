const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Show login page
router.get("/login", authController.showLoginPage);

// Handle login form submission
router.post("/login", authController.handleLogin);

// Handle logout
router.get("/logout", authController.logout);

module.exports = router;
