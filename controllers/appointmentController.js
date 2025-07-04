// controllers/appointmentController.js
const Appointment = require('../models/Appointment');
const jwt = require('jsonwebtoken');

exports.bookAppointment = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const { doctorId, doctorName, appointmentDate, appointmentTime } = req.body;

    const alreadyBooked = await Appointment.findOne({ doctorId, appointmentDate, appointmentTime });
    if (alreadyBooked) {
      return res.status(400).json({ message: "Slot already booked" });
    }

    // 👇 Get patient's name using their ID
    const user = await User.findById(userId);
    const userName = user?.fullName || "Unknown";

    const newAppointment = new Appointment({
      doctorId,
      doctorName,
      appointmentDate,
      appointmentTime,
      userId,
      userName // ✅ store name
    });

    await newAppointment.save();
    res.status(200).json({ message: "Appointment booked successfully" });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Booking failed" });
  }
};

exports.getUserAppointments = async (req, res) => {
  try {
    const userId = req.user.userId;
    const appointments = await Appointment.find({ userId });
    res.json(appointments);
  } catch (err) {
    console.error("Fetch appointments error:", err);
    res.status(500).json({ message: "Failed to fetch appointments" });
  }
};


exports.getBookedSlots = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const slots = await Appointment.find({ doctorId });
    res.json(slots);
  } catch (err) {
    res.status(500).json({ message: "Failed to get booked slots" });
  }
};
