const Registration = require("../models/registrationModel");
const Event = require("../models/eventModel");

module.exports = {
  // Display registration page
  showRegistrationPage: async (req, res) => {
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

  // Display cancel registration page
  showCancelRegistrationPage: async (req, res) => {
    try {
      const registrations = await Registration.find({
        studentId: req.user._id,
      }).populate("eventId", "name date location");
      res.render("cancelRegistration", {
        registrations,
        user: req.user,
        message: req.query.message || null,
        error: req.query.error || null,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Display list registrations page (admin)
  showListRegistrationsPage: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const count = await Registration.countDocuments();
      const registrations = await Registration.find()
        .populate("eventId", "name date location")
        .populate("studentId", "username email")
        .skip(skip)
        .limit(limit)
        .sort({ registrationDate: -1 });

      const totalPages = Math.ceil(count / limit);

      res.render("listRegistrations", {
        registrations,
        user: req.user,
        currentPage: page,
        totalPages,
        totalCount: count,
        message: req.query.message || null,
        error: req.query.error || null,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Display search registrations page (admin)
  showSearchRegistrationsPage: async (req, res) => {
    try {
      const { start, end } = req.query;
      let registrations = [];
      let searchPerformed = false;

      if (start && end) {
        searchPerformed = true;
        const startDate = new Date(start);
        const endDate = new Date(end);

        registrations = await Registration.find({
          registrationDate: { $gte: startDate, $lte: endDate },
        })
          .populate("eventId", "name date location")
          .populate("studentId", "username email")
          .sort({ registrationDate: -1 });
      }

      res.render("searchRegistrations", {
        registrations,
        user: req.user,
        start: start || "",
        end: end || "",
        searchPerformed,
        message: req.query.message || null,
        error: req.query.error || null,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
