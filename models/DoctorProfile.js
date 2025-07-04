const mongoose = require('mongoose');

const doctorProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String },
  dob: { type: Date },
  phone: { type: String },
  profilePicture: { type: String },
  professionalInfo: {
    specialization: String,
    university: String,
    licenseNo: String,
    qualification: String,
    yearsOfExperience: Number
  },
  hospitalInfo: {
    name: String,
    address: String,
    city: String,
    pincode: String
  },
  consultationInfo: {
    fee: Number,
    availableDays: [String],
    availableTimeSlots: [String]
  },
  documents: {
    degreeCertificate: String,
    medicalLicense: String,
    idProof: String
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
});

module.exports = mongoose.model('DoctorProfile', doctorProfileSchema);
