import User from '../model/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import VerificationToken from '../model/verificationToken.js';
 
 export const signin = async(req,res)=>{
     try{
         const {email,password} = req.body;
         const user = await User.findOne({email});
         if(!user) return res.status(400).json({msg:"User not found"});
         
         const isMatch = await bcrypt.compare(password,user.password);
         if(!isMatch)
           return res.status(400).json({msg:"Invalid credentials"});
 
         if(!user.verified)
             return res.status(400).json({msg:"Please verify your email"});
         const token = jwt.sign(
             {id:user._id , email:user.email , role:user.role},
             process.env.JWT_SECRET,
             {expiresIn:"7D"}
         );
 
         res.json({msg:"Sign in successful",token})
     }catch(err){
        res.status(500).json({msg:"Sign in failed", error: err.message || err})
     }
 
 }
 
 export const signup = async (req, res) => {
     try {
        const { name, email, password } = req.body;
         //check if user already exists
         const existingUser = await User.findOne({ email });
         if (existingUser)
             return res.status(400).json({ msg: "User already exists" });
         const hashedPassword = await bcrypt.hash(password, 10);
 
         const user = await User.create({
             name,
             email,
             password: hashedPassword,
 
         });
 
         // verification token 
         const token = crypto.randomBytes(32).toString("hex");

        await VerificationToken.create({
            userId: user._id,
            token,
            createdAt: Date.now()
        });
 
         //send verification email
         const transporter = nodemailer.createTransport({
             service: "gmail",
             auth: {
                 user: process.env.EMAIL_USER,
                 pass: process.env.EMAIL_PASS,
             },
         });
 
       // include token in verification URL (adjust /verify route on frontend)
       const verifyUrl = `${process.env.FRONTEND_URL}/verify/${token}`;
 
         await transporter.sendMail({
             from: `"StudyVault"<${process.env.EMAIL_USER}>`,
             to: user.email,
             subject: "verify your email address",
             html: `
         <h2>Hello ${user.name},</h2>
         <p>Thank you for signing up! Please verify your email by clicking the link below:</p>
        <a href="${verifyUrl}">${verifyUrl}</a>
         <p>This link will expire in 1 hour.</p>
       `,
         });
 
         res.status(201).json({
             message:
                 "User registered successfully! Please check your email to verify to your account."
         });
     } catch (err) {
         console.error(err);
         res.status(500).json({ msg: "signup failed", err })
 
     }
 }
 
 export const verifyEmail = async (req, res) => {
     try {
         const { token } = req.params;
        const vToken = await VerificationToken.findOne({ token });
        if (!vToken) return res.status(400).json({ msg: "Invalid or expired token" });

        await User.findByIdAndUpdate(vToken.userId, { verified: true });
        await VerificationToken.deleteOne({ _id: vToken._id });

        res.json({ message: "Email verified successfully! You can now log in." });
     } catch (error) {
        res.status(500).json({ message: "Verification failed", error: error.message || error });
     }
 }