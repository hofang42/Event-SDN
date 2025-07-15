const Registration = require("../models/registrationModel");
const Event = require("../models/eventModel");

module.exports = {
  registerEvent: async (req, res) => {
    const { eventId } = req.body;
    const studentId = req.user._id;
    if (!eventId) {
      return res.status(400).json({ message: "Event ID is required" });
    }
    try {
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      const alreadyRegistered = await Registration.findOne({
        studentId,
        eventId,
      });
      if (alreadyRegistered) {
        return res
          .status(400)
          .json({ message: "Already registered for this event" });
      }
      const count = await Registration.countDocuments({ eventId });
      if (count >= event.capacity) {
        return res.status(400).json({ message: "Event is full" });
      }
      const registration = await Registration.create({
        studentId,
        eventId,
      });
      return res.status(201).json({
        message: "Registered successfully",
        registration,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  unregisterEvent: async (req, res) => {
    const { registrationId } = req.params;
    const studentId = req.user._id;
    if (!registrationId) {
      return res.status(400).json({ message: "Registration ID is required" });
    }
    try {
      const registration = await Registration.findOne({
        _id: registrationId,
        studentId,
      });
      if (!registration) {
        return res.status(404).json({ message: "Registration not found" });
      }
      await Registration.deleteOne({ _id: registrationId });
      return res.status(200).json({ message: "Unregistered successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  viewListRegistrations: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      const count = await Registration.countDocuments();
      if (count === 0) {
        return res.json({ message: "No registrations found" });
      }
      const registrations = await Registration.find()
        .populate("eventId", "name date location")
        .populate("studentId", "username email")
        .skip(skip)
        .limit(limit);
      res.json({ count, page, limit, registrations });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  searchRegistrationsByDate: async (req, res) => {
    const { start, end } = req.query;
    if (!start || !end) {
      return res
        .status(400)
        .json({ message: "Start and end date are required" });
    }
    try {
      const startDate = new Date(start);
      const endDate = new Date(end);
      if (startDate >= endDate) {
        return res.status(400).json({
          message: "Start date must be before end date",
        });
      }
      const registrations = await Registration.find({
        registrationDate: { $gte: startDate, $lte: endDate },
      })
        .populate("eventId", "name date location")
        .populate("studentId", "username email");
      if (registrations.length === 0) {
        return res.json({ message: "No registrations found in this range" });
      }
      res.json({ count: registrations.length, registrations });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
