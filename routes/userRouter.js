const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware.js");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

router.post("/auth/login", authController.login);

router.post(
  "/registration",
  auth,
  role("student"),
  userController.registerEvent
);

router.delete(
  "/registrations/:registrationId",
  auth,
  role("student"),
  userController.unregisterEvent
);

router.get(
  "/listRegistrations",
  auth,
  role("admin"),
  userController.viewListRegistrations
);

router.get(
  "/getRegistrationsByDate",
  auth,
  role("admin"),
  userController.searchRegistrationsByDate
);

module.exports = router;
