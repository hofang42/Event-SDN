const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registrationSchema = new Schema({
  studentId: {
    type: String,
    ref: "users",
    required: true,
  },
  eventId: {
    type: String,
    ref: "events",
    required: true,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("registrations", registrationSchema);
