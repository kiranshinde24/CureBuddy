const express        = require('express');
const router         = express.Router();

const upload         = require('../middleware/uploadMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

const {
  registerDoctor,
  approveDoctor,
  rejectDoctor,
  getDoctorById,
  getAllDoctors,          // admin – all statuses
  getLoggedInDoctorProfile,
  getApprovedDoctors      // public – only approved
} = require('../controllers/doctorController');

/* ------------------------------------------------------- */
/* 🔓  Public routes                                        */
/* ------------------------------------------------------- */

/** Doctor self‑registration (with file uploads) */
router.post(
  '/register',
  upload.fields([
    { name: 'profilePicture',    maxCount: 1 },
    { name: 'degreeCertificate', maxCount: 1 },
    { name: 'medicalLicense',    maxCount: 1 },
    { name: 'idProof',           maxCount: 1 }
  ]),
  registerDoctor
);

/** List of doctors visible to patients (status = approved) */
router.get('/approved', getApprovedDoctors);

/* ------------------------------------------------------- */
/* 🔐  Routes requiring authentication                      */
/* ------------------------------------------------------- */

/** Doctor’s own profile (role = doctor) */
router.get('/me', authMiddleware(['doctor']), getLoggedInDoctorProfile);

/** Admin actions & admin list (role = admin) */
router.patch('/:id/approve', authMiddleware(['admin']), approveDoctor);
router.patch('/:id/reject',  authMiddleware(['admin']), rejectDoctor);
router.get('/',              authMiddleware(['admin']), getAllDoctors);

/* ------------------------------------------------------- */
/* 🔓  Catch‑all: view any single doctor profile (public)   */
/* ------------------------------------------------------- */
router.get('/:id', getDoctorById);

module.exports = router;
