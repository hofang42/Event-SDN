const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

// Get all events (public)
router.get("/events", eventController.getAllEvents);

// Get event details
router.get("/events/:id", eventController.getEventDetails);

// Create new event (admin only)
router.post("/events", auth, role("admin"), eventController.createEvent);

module.exports = router;
