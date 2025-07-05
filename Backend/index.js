require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

/* ──────────────────────────  MIDDLEWARE  ────────────────────────── */

// ✅ Allow requests from local and deployed frontend (Vercel)
app.use(
  cors({
    origin: [
      'http://localhost:5173',           // Local frontend
      'https://cure-buddy.vercel.app',   // Deployed frontend on Vercel
    ],
    credentials: true,
  })
);

// Parse JSON request bodies
app.use(express.json());

// Serve uploaded images/docs
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/* ──────────────────────────  DATABASE  ─────────────────────────── */

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Error:', err));

/* ────────────────────────────  ROUTES  ─────────────────────────── */

// Core route files
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/auth');
const doctorRoutes = require('./routes/doctorRoutes');

// 🆕 NEW appointment routes 🆕
const appointmentRoutes = require('./routes/appointments');

// Mount routes
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);

// Health‑check
app.get('/', (_req, res) => res.send('✅ CureBuddy API is running...'));

/* ──────────────────────────  START SERVER  ─────────────────────── */

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at: http://localhost:${PORT}`)
);
