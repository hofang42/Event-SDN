const express = require("express");
const router = express.Router();
const registrationController = require("../controllers/registrationController");
const userController = require("../controllers/userController");
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");
const sessionAuth = require("../middlewares/sessionAuthMiddleware");

// Session-based role check
function sessionRole(roleName) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== roleName) {
      return res
        .status(403)
        .render("login", { error: "Unauthorized", message: null });
    }
    next();
  };
}

// Student routes (web)
router.get(
  "/register-event",
  sessionAuth,
  sessionRole("student"),
  registrationController.showRegistrationPage
);

router.get(
  "/cancel-registration",
  sessionAuth,
  sessionRole("student"),
  registrationController.showCancelRegistrationPage
);

// Admin routes (web)
router.get(
  "/list-registrations",
  sessionAuth,
  sessionRole("admin"),
  registrationController.showListRegistrationsPage
);

router.get(
  "/search-registrations",
  sessionAuth,
  sessionRole("admin"),
  registrationController.showSearchRegistrationsPage
);

// Session-based API routes (for web interface)
router.post(
  "/api/registration",
  sessionAuth,
  sessionRole("student"),
  userController.registerEvent
);

router.delete(
  "/api/registrations/:registrationId",
  sessionAuth,
  sessionRole("student"),
  userController.unregisterEvent
);

// JWT-based API routes (for external API usage)
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
