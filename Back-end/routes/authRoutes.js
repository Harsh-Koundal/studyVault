import express from 'express';
import { signin, signup, verifyEmail } from '../controllers/authController.js';

const router = express.Router();

// 
router.post("/signin",signin)

// signup route 
router.post("/signup",signup);

// verify route
router.get("/verify/:token",verifyEmail);

export default router;
