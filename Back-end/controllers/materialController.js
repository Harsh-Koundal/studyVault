import express from 'express'
import StudyMaterial from '../model/StudyMaterial.js'
import User from '../model/User.js'
import mongoose from 'mongoose';
import path from 'path'
import fs from 'fs'

// upload document
export const uploadMaterials = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Multer stores file info in req.file
        const fileUrl = req.file?.secure_url || req.file?.path;


        // Validate required fields
        const { title, subject, description } = req.body;
        if (!title || !subject) {
            return res.status(400).json({ message: 'Title and Subject are required' });
        }

        const material = await StudyMaterial.create({
            title,
            subject,
            description,
            author: req.user._id,
            fileUrl,
        });

        const populatedMaterial = await material.populate("author", "fullName");

        res.status(201).json(populatedMaterial);
    } catch (error) {
        console.error('Error uploading material:', error);
        res.status(500).json({ message: 'Failed to upload material' });
    }
};

// get study material
export const getAllMaterials = async (req, res) => {
    try {
        const material = await StudyMaterial.find().populate("author", "fullName");
        res.json(material);
    } catch (err) {
        console.error("Error fetching materials:", err);
        res.status(500).json({ msg: "Failed to fetch materials" });
    }
};

// get study material by Id 
export const getMaterialById = async(req,res)=>{
    try{
        const material = await StudyMaterial.findById(req.params.id).populate("author", "fullName");

        if(!material){
            return res.status(404).json({msg:"Material not found"});
        }

        material.views = (material.views ||0) + 1;
        await material.save();

        res.json(material);
    }catch(err){
        console.error("Error fetching material:",err);
        res.status(500).json({msg:"Failed to fetch material"});
    }
};

// get popular materials
export const getPopularMaterials = async (req, res) => {
  try {
    const popular = await StudyMaterial.find()
      .populate("author", "fullName")
      .sort({ downloads: -1 })
      .limit(10);

    res.json(popular);
  } catch (err) {
    console.error("Error fetching popular materials:", err);
    res.status(500).json({ msg: "Failed to fetch popular materials" });
  }
};


// users uploads
export const getMyUploads = async (req, res) => {
  try {
    const uploads = await StudyMaterial.find({ author: req.user._id })
      .populate("author", "fullName");

    res.json(uploads);
  } catch (err) {
    console.error("Error fetching uploads:", err);
    res.status(500).json({ msg: "Failed to fetch uploads" });
  }
};


export const toggleFavorite = async (req, res) => {
  try {
    const { id: materialId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(materialId)) {
      return res.status(400).json({ message: "Invalid material ID" });
    }

    const material = await StudyMaterial.findById(materialId);
    if (!material) return res.status(404).json({ message: "Material not found" });

    const userId = req.user._id;
    const index = material.favorites.findIndex(
      (favId) => favId.toString() === userId.toString()
    );

    if (index === -1) material.favorites.push(userId);
    else material.favorites.splice(index, 1);

    await material.save();

    res.json(material.favorites);
  } catch (err) {
    console.error("Error toggling favorite:", err);
    res.status(500).json({ message: "Failed to toggle favorite." });
  }
};

// get user favorite material 
export const getFavorites = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    const userId = new mongoose.Types.ObjectId(req.user._id);

    const favorites = await StudyMaterial.find({ favorites: userId })
      .populate("author", "fullName");

    res.json(favorites);
  } catch (err) {
    console.error("Error fetching favorites:", err);
    res.status(500).json({ msg: "Failed to fetch favorites" });
  }
};


// download material
// ✅ Update download count only
export const updateDownloadCount = async (req, res) => {
  try {
    const id = req.params.id;
    const material = await StudyMaterial.findById(id);

    if (!material) {
      return res.status(404).json({ msg: "Material not found" });
    }

    material.downloads += 1;
    await material.save();

    res.json({ msg: "Download count updated", downloads: material.downloads });
  } catch (err) {
    console.error("Download count update error:", err);
    res.status(500).json({ msg: "Failed to update download count" });
  }
};

// ✅ Serve file properly from Cloudinary or local
export const downloadMaterialFile = async (req, res) => {
  try {
    const id = req.params.id;
    const material = await StudyMaterial.findById(id);

    if (!material || !material.fileUrl) {
      return res.status(404).json({ msg: "File not found" });
    }

    // If stored on Cloudinary → redirect to file URL
    if (material.fileUrl.startsWith("http")) {
      return res.redirect(material.fileUrl);
    }

    // If file stored locally (for local dev)
    const fullPath = path.join(process.cwd(), material.fileUrl);
    if (!fs.existsSync(fullPath)) {
      return res.status(404).json({ msg: "File not found on server" });
    }

    res.download(fullPath, path.basename(fullPath));
  } catch (err) {
    console.error("File download error:", err);
    res.status(500).json({ msg: "File download failed" });
  }
};

