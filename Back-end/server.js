import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/authRoutes.js'
import profileRoutes from './routes/profileRoutes.js'
import materialRoutes from './routes/materialRoutes.js'

dotenv.config();

const app = express();

// env variables
const PORT = process.env.PORT || 5020;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ DB_URI is missing. Please check your .env file.");
  process.exit(1);
}


// allowed origins for CORS
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://studyvault.com',
  'https://studyvault.vercel.app',   
  'http://localhost:5173',      
];

app.use(cors({
    origin: function(origin, callback) {
        if(!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }   else{
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
})
);

app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("✅ Connected to MongoDB");
}).catch((error) => {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1);
});

// get file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth',authRoutes)
app.use('/api/profile',profileRoutes)
app.use('/api/materials',materialRoutes)



app.get('/', (req, res) => {
    res.send('Welcome to the StudyVault API');
});

// server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});


