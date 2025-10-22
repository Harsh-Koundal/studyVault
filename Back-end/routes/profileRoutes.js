import express from 'express'
import { getProfile, updateProfile, deleteProfile } from '../controllers/profileController.js';
import {authMiddleware} from '../middleware/auth.js'

const router = express.Router();

// get profile 
router.get('/',authMiddleware,getProfile);

// update profile
router.put('/',authMiddleware,updateProfile);

// delete profile
router.delete('/',authMiddleware,deleteProfile);

export default router;
