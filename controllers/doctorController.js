  const DoctorProfile = require('../models/DoctorProfile');
  const mongoose      = require('mongoose');

  /* ------------------------------------------------------------------ */
  /* 🔵  Doctor registration                                            */
  /* ------------------------------------------------------------------ */
  exports.registerDoctor = async (req, res) => {
    try {
      const {
        userId, name, email, gender, dob, phone,
        specialization, university, licenseNo, qualification,
        yearsOfExperience, hospitalName, address, city, state, pincode,
        fee, availableDays, availableTimeSlots
      } = req.body;

      if (!userId) {
        return res
          .status(400)
          .json({ success: false, message: 'User ID is required.' });
      }

      const files = req.files || {};

      const doctor = new DoctorProfile({
        userId,
        name,
        email,
        gender,
        dob,
        phone,
        profilePicture: files?.profilePicture?.[0]?.filename || '',
        professionalInfo: {
          specialization,
          university,
          licenseNo,
          qualification,
          yearsOfExperience: Number(yearsOfExperience) || 0
        },
        hospitalInfo: {
          name: hospitalName,
          address,
          city,
          state,
          pincode
        },
        consultationInfo: {
          fee: Number(fee) || 0,
          availableDays: Array.isArray(availableDays)
            ? availableDays
            : typeof availableDays === 'string'
            ? JSON.parse(availableDays)
            : [],
          availableTimeSlots: Array.isArray(availableTimeSlots)
            ? availableTimeSlots
            : typeof availableTimeSlots === 'string'
            ? JSON.parse(availableTimeSlots)
            : []
        },
        documents: {
          degreeCertificate: files?.degreeCertificate?.[0]?.filename || '',
          medicalLicense:   files?.medicalLicense?.[0]?.filename   || '',
          idProof:          files?.idProof?.[0]?.filename          || ''
        },
        status: 'pending'
      });

      await doctor.save();
      return res
        .status(201)
        .json({ success: true, message: 'Doctor registered successfully', data: doctor });
    } catch (err) {
      console.error('Doctor Registration Error:', err);
      if (err.name === 'ValidationError') {
        return res.status(400).json({ success: false, message: err.message });
      }
      return res.status(500).json({ success: false, message: err.message });
    }
  };

  /* ------------------------------------------------------------------ */
  /* 🔵  Logged‑in doctor profile (dashboard)                           */
  /* ------------------------------------------------------------------ */
  exports.getLoggedInDoctorProfile = async (req, res) => {
    try {
      const userId = req.headers['x-user-id'];
      if (!userId) {
        return res
          .status(400)
          .json({ success: false, message: 'User ID header is required.' });
      }

      const doctor = await DoctorProfile
        .findOne({ userId })
        .populate('userId', 'email');

      if (!doctor) {
        return res
          .status(404)
          .json({ success: false, message: 'Doctor profile not found.' });
      }

      return res.status(200).json({ success: true, doctor });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  };

  /* ------------------------------------------------------------------ */
  /* 🔵  Admin actions: approve / reject                                */
  /* ------------------------------------------------------------------ */
  exports.approveDoctor = async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid doctor ID' });
      }

      const doctor = await DoctorProfile.findByIdAndUpdate(
        id,
        { status: 'approved' },
        { new: true }
      );

      if (!doctor) {
        return res.status(404).json({ success: false, message: 'Doctor not found' });
      }

      return res.status(200).json({ success: true, message: 'Doctor approved', doctor });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  };

  exports.rejectDoctor = async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid doctor ID' });
      }

      const doctor = await DoctorProfile.findByIdAndUpdate(
        id,
        { status: 'rejected' },
        { new: true }
      );

      if (!doctor) {
        return res.status(404).json({ success: false, message: 'Doctor not found' });
      }

      return res.status(200).json({ success: true, message: 'Doctor rejected', doctor });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  };

  /* ------------------------------------------------------------------ */
  /* 🔵  Fetch lists                                                    */
  /* ------------------------------------------------------------------ */

  /**
   * ADMIN: get every doctor, any status
   * GET /api/doctors            (protected, role = admin)
   */
  exports.getAllDoctors = async (_req, res) => {
    try {
      const doctors = await DoctorProfile.find().populate('userId', 'email');
      return res.status(200).json({ success: true, data: doctors });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  };

  /**
   * PUBLIC: only approved doctors (used by React patient side)
   * GET /api/doctors/approved   (public)
   */
  exports.getApprovedDoctors = async (_req, res) => {
    try {
      const doctors = await DoctorProfile.find({ status: 'approved' });
      return res.status(200).json(doctors);        // plain array for FE
    } catch (err) {
      return res.status(500).json({ message: 'Error fetching doctors' });
    }
  };

  /* ------------------------------------------------------------------ */
  /* 🔵  Fetch single doctor by ID (public)                             */
  /* ------------------------------------------------------------------ */
  exports.getDoctorById = async (req, res) => {
    try {
      const doctor = await DoctorProfile
        .findById(req.params.id)
        .populate('userId', 'email');

      if (!doctor) {
        return res
          .status(404)
          .json({ success: false, message: 'Doctor not found' });
      }

      return res.status(200).json({ success: true, data: doctor });
    } catch (err) {
      console.error('Error fetching doctor by ID:', err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  };
