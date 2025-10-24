import express from 'express'
import StudyMaterial from '../model/StudyMaterial.js'
import User from '../model/User.js'

// upload document
export const uploadMaterials = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Multer stores file info in req.file
        const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

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


// Add or remove favorite material
export const toggleFavorite = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const id = req.params.id;
        const index = user.favorites.indexOf(id);

        if (index > -1) {
            user.favorites.splice(index, 1);
        } else {
            user.favorites.push(id);
        }

        await user.save();
        res.json(user.favorites);
    } catch (err) {
        console.error("Error toggling favorite:", err);
        res.status(500).json({ msg: "Failed to toggle favorite" });
    }
};

// get user favorite material 
export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: "favorites",
        populate: { path: "author", select: "fullName" }
      });

    res.json(user.favorites);
  } catch (err) {
    console.error("Error fetching favorites:", err);
    res.status(500).json({ msg: "Failed to fetch favorites" });
  }
};
