import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  uploadMaterials,
  getAllMaterials,
  getPopularMaterials,
  getMyUploads,
  toggleFavorite,
  getFavorites,
  getMaterialById,
  downloadMaterialFile,
  updateDownloadCount,
} from "../controllers/materialController.js";
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Ensure uploads folder exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${Date.now()}-${name}${ext}`);
  }
});

// Optional file filter to allow only PDFs/images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) cb(null, true);
  else cb(new Error('Only PDF, JPEG, PNG files are allowed'));
};

const upload = multer({ storage, fileFilter });

// Public routes
router.get("/", getAllMaterials);
router.get("/popular", getPopularMaterials);
router.get("/favorites", authMiddleware, getFavorites);
router.put("/download/:id", authMiddleware, updateDownloadCount);
router.get("/file/:id", authMiddleware, downloadMaterialFile);

// Protected routes
router.post("/uploads", authMiddleware, upload.single('file'), uploadMaterials);
router.get("/my-uploads", authMiddleware, getMyUploads);
router.put("/favorite/:id", authMiddleware, toggleFavorite);

// Parameterized route LAST
router.get('/:id', authMiddleware, getMaterialById);

export default router;
