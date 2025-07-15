const Event = require("../models/eventModel");

module.exports = {
  // Get all events for display
  getAllEvents: async (req, res) => {
    try {
      const events = await Event.find().sort({ date: 1 });
      res.render("registerEvent", {
        events,
        user: req.user,
        message: req.query.message || null,
        error: req.query.error || null,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get event details
  getEventDetails: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.json(event);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create new event (admin only)
  createEvent: async (req, res) => {
    try {
      const { name, description, date, location, capacity } = req.body;
      const event = await Event.create({
        name,
        description,
        date,
        location,
        capacity: parseInt(capacity),
      });
      res.status(201).json(event);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
