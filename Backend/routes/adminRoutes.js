// // routes/adminRoutes.js
// const express = require('express');
// const router = express.Router();
// const DoctorProfile = require('../models/DoctorProfile');
// const User = require('../models/User');

// // ✅ Get all doctors
// router.get('/doctors', async (req, res) => {
//   try {
//     const doctors = await DoctorProfile.find().sort({ createdAt: -1 });
//     res.status(200).json({ success: true, data: doctors });
//   } catch (error) {
//     console.error('Error fetching doctors:', error);
//     res.status(500).json({ success: false, message: 'Error fetching doctors' });
//   }
// });

// // ✅ Get all patients
// router.get('/patients', async (req, res) => {
//   try {
//     const patients = await User.find({ role: 'patient' }).sort({ createdAt: -1 });
//     res.status(200).json({ success: true, data: patients });
//   } catch (error) {
//     console.error('Error fetching patients:', error);
//     res.status(500).json({ success: false, message: 'Error fetching patients' });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();

const DoctorProfile = require('../models/DoctorProfile');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware'); // 🔐 Import the middleware
const Appointment = require("../models/Appointment");

// ✅ Get all doctors (admin only)
router.get('/doctors', authMiddleware(['admin']), async (req, res) => {
  try {
    const doctors = await DoctorProfile.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: doctors });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ success: false, message: 'Error fetching doctors' });
  }
});

// ✅ Get all patients (admin only)
router.get('/patients', authMiddleware(['admin']), async (req, res) => {
  try {
    const patients = await User.find({ role: 'patient' }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: patients });
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ success: false, message: 'Error fetching patients' });
  }
});
// ✅ Admin: Get all appointments
router.get('/appointments', authMiddleware(['admin']), async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('doctorId', 'name profileImage')
      .populate('patientId', 'name profileImage')
      .sort({ appointmentDate: -1 });

    const formatted = appointments.map((appt) => ({
      _id: appt._id,
      doctorName: appt.doctorName || appt.doctorId?.name || 'N/A',
      doctorImg: appt.doctorId?.profileImage || '/doctor-profile.jpg',
      patientName: appt.patientName || appt.patientId?.name || 'N/A',
      patientImg: appt.patientId?.profileImage || '/doctor-profile.jpg',
      appointmentDate: appt.appointmentDate || null,
      appointmentTime: appt.appointmentTime || null,
      department: 'General',
    }));

    res.status(200).json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching appointments",
    });
  }
});
// ✅ Delete a patient by ID (admin only)
router.delete('/patients/:id', authMiddleware(['admin']), async (req, res) => {
  const patientId = req.params.id;

  try {
    const patient = await User.findById(patientId);

    if (!patient || patient.role !== 'patient') {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    await User.findByIdAndDelete(patientId);

    res.status(200).json({ success: true, message: 'Patient removed successfully' });
  } catch (error) {
    console.error("Error deleting patient:", error);
    res.status(500).json({ success: false, message: 'Error removing patient' });
  }
});

module.exports = router;
