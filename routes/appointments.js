const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const authMiddleware = require("../middleware/authMiddleware");
const DoctorProfile = require("../models/DoctorProfile");
// GET: Fetch appointments by doctorId and date (used for disabling booked slots)
router.get("/", async (req, res) => {
  const { doctorId, date } = req.query;

  try {
    const appointments = await Appointment.find({
      doctorId,
      appointmentDate: date,
    });

    res.json({ success: true, appointments });
  } catch (err) {
    console.error("Error fetching appointments:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// POST: Book appointment (requires login)
router.post("/book", authMiddleware(), async (req, res) => {
  const {
    doctorId,
    doctorName,
    patientId,
    patientName,
    appointmentDate,
    appointmentTime,
  } = req.body;

  if (
    !doctorId ||
    !doctorName ||
    !patientId ||
    !patientName ||
    !appointmentDate ||
    !appointmentTime
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
  }

  try {
    const alreadyBooked = await Appointment.findOne({
      doctorId,
      appointmentDate,
      appointmentTime,
    });

    if (alreadyBooked) {
      return res.status(400).json({
        success: false,
        message: "This slot is already booked.",
      });
    }

    const appointment = new Appointment({
      doctorId,
      doctorName,
      patientId,
      patientName,
      appointmentDate,
      appointmentTime,
    });

    await appointment.save();

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully.",
      appointment,
    });
  } catch (err) {
    console.error("Booking error:", err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});

// GET: Fetch all appointments for a logged-in patient
router.get("/patient/:patientId", authMiddleware(["patient"]), async (req, res) => {
  try {
    const { patientId } = req.params;

    if (req.user.id !== patientId) {
      return res.status(403).json({ success: false, message: "Access denied." });
    }

    const appointments = await Appointment.find({ patientId })
      .populate("doctorId", "name professionalInfo.specialization profilePicture")
      .sort({ appointmentDate: -1 });

    res.json({ success: true, appointments });
  } catch (err) {
    console.error("Error fetching patient appointments:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// DELETE: Cancel appointment by ID (only patient who booked it can cancel)
router.delete("/:id", authMiddleware(["patient"]), async (req, res) => {
  const appointmentId = req.params.id;
  const userId = req.user.id;

  try {
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found." });
    }

    // Ensure only the patient who booked it can delete
    if (appointment.patientId.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized." });
    }

    await Appointment.findByIdAndDelete(appointmentId);

    return res.json({ success: true, message: "Appointment cancelled." });
  } catch (error) {
    console.error("Error cancelling appointment:", error.message);
    return res.status(500).json({ success: false, message: "Server error." });
  }
});
// ✅ Fetch all appointments for logged-in doctor
router.get("/doctor/me", authMiddleware(["doctor"]), async (req, res) => {
  try {
    const doctorProfile = await DoctorProfile.findOne({ userId: req.user.id });
    if (!doctorProfile) {
      return res.status(404).json({ success: false, message: "Doctor profile not found." });
    }

    const appointments = await Appointment.find({ doctorId: doctorProfile._id }).sort({ appointmentDate: -1 });

    res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (err) {
    console.error("Error fetching doctor's appointments:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Doctor dashboard summary: today, upcoming, history
router.get("/doctor/summary", authMiddleware(["doctor"]), async (req, res) => {
  try {
    const doctorProfile = await DoctorProfile.findOne({ userId: req.user.id });
    if (!doctorProfile) {
      return res.status(404).json({ success: false, message: "Doctor profile not found." });
    }

    const allAppointments = await Appointment.find({ doctorId: doctorProfile._id }).sort({ appointmentDate: 1 });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const todayAppointments = allAppointments.filter((appt) => {
      const date = new Date(appt.appointmentDate);
      return date >= today && date < tomorrow;
    });

    const upcomingAppointments = allAppointments.filter((appt) => {
      const date = new Date(appt.appointmentDate);
      return date >= tomorrow;
    });

    const pastAppointments = allAppointments.filter((appt) => {
      const date = new Date(appt.appointmentDate);
      return date < today;
    });

    res.status(200).json({
      success: true,
      data: {
        today: todayAppointments,
        upcoming: upcomingAppointments,
        history: pastAppointments,
      },
    });
  } catch (err) {
    console.error("Error fetching doctor summary:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
