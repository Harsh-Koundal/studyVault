import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import path from 'path';

// Routes
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import materialRoutes from './routes/materialRoutes.js';

dotenv.config();

const app = express();

// --- Environment variables ---
const PORT = process.env.PORT || 5020;
const MONGODB_URI = process.env.MONGODB_URI;

// --- Database connection check ---
if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is missing. Please check your .env file.");
  process.exit(1);
}

// --- CORS setup ---
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://studyvault.vercel.app',
  'https://studyvault.com',
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) callback(null, true);
    else callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  optionsSuccessStatus: 200,
}));

// --- MongoDB connection ---
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  });

// --- Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/materials', materialRoutes);
app.use(express.json({limit:'50mb'}));


// --- Health check route ---
app.get('/', (req, res) => {
  res.send('🚀 StudyVault API is live and running!');
});

// --- Start server ---
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
