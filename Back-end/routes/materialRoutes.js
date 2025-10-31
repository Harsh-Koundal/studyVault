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
import upload from "../middleware/upload.js";

const router = express.Router();

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
