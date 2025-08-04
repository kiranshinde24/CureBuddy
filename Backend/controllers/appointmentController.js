// controllers/appointmentController.js
const { sendEmail } = require('../utils/emailService');
const User = require('../models/User');
const Doctor = require('../models/DoctorProfile'); // ✅ Correct import






const Appointment = require('../models/Appointment');
const jwt = require('jsonwebtoken');

// exports.bookAppointment = async (req, res) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const userId = decoded.userId;

//     const { doctorId, doctorName, appointmentDate, appointmentTime } = req.body;

//     const alreadyBooked = await Appointment.findOne({ doctorId, appointmentDate, appointmentTime });
//     if (alreadyBooked) {
//       return res.status(400).json({ message: "Slot already booked" });
//     }

//     // 👇 Get patient's name using their ID
//     const user = await User.findById(userId);
//     const userName = user?.fullName || "Unknown";

//     const newAppointment = new Appointment({
//       doctorId,
//       doctorName,
//       appointmentDate,
//       appointmentTime,
//       userId,
//       userName // ✅ store name
//     });

//     await newAppointment.save();
//     res.status(200).json({ message: "Appointment booked successfully" });
//   } catch (error) {
//     console.error("Booking error:", error);
//     res.status(500).json({ message: "Booking failed" });
//   }

//   // ✅ Send confirmation email
// await sendEmail(
//   user.email,
//   "Appointment Confirmation - CureBuddy",
//   `Hi ${user.fullName},\n\nYour appointment with Dr. ${doctorName} is confirmed for ${appointmentDate} at ${appointmentTime}.\n\nRegards,\nCureBuddy Team`
// );
// };


exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, appointmentDate, appointmentTime } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    const doctor = await Doctor.findById(doctorId);

    if (!user || !doctor) return res.status(404).json({ message: 'User or doctor not found' });

    const existing = await Appointment.findOne({
      doctorId,
      appointmentDate,
      appointmentTime,
    });
    if (existing) return res.status(400).json({ message: 'Time slot already booked' });

    const newAppointment = new Appointment({
      doctorId,
      doctorName: doctor.fullName,
      patientId: userId,
      patientName: user.fullName,
      patientEmail: user.email, // ✅ Email stored here
      appointmentDate,
      appointmentTime,
    });

    await newAppointment.save();

    // ✅ Send confirmation email
    await sendEmail(
      user.email,
      'Appointment Confirmation',
      `Hi ${user.fullName}, your appointment with Dr. ${doctor.fullName} on ${appointmentDate} at ${appointmentTime} has been confirmed.`
    );

    res.status(201).json({ message: 'Appointment booked successfully' });
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ message: 'Server error' });
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
