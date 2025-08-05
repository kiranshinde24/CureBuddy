require('dotenv').config();

const Appointment = require('../models/Appointment');
const { sendEmail } = require('./emailService');

const sendReminders = async () => {
  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const nextDay = new Date(tomorrow);
    nextDay.setDate(nextDay.getDate() + 1);

    const appointments = await Appointment.find({
      appointmentDate: { $gte: tomorrow, $lt: nextDay },
    });

    for (const appointment of appointments) {
      // Send to patient
      await sendEmail(
        appointment.patientEmail,
        'Appointment Reminder',
        `Dear ${appointment.patientName}, this is a reminder for your appointment with Dr. ${appointment.doctorName} on ${appointment.appointmentDate.toDateString()} at ${appointment.appointmentTime}.`
      );

      // Send to doctor
      await sendEmail(
        appointment.doctorEmail, // make sure this exists in your Appointment schema
        'Appointment Reminder',
        `Dear Dr. ${appointment.doctorName}, you have an appointment with ${appointment.patientName} on ${appointment.appointmentDate.toDateString()} at ${appointment.appointmentTime}.`
      );
    }

    console.log(`✅ Sent reminders for ${appointments.length} appointments (to both patients and doctors)`);
  } catch (err) {
    console.error('❌ Reminder job failed:', err);
  }
};

module.exports = sendReminders;
