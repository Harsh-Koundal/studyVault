import User from '../model/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import VerificationToken from '../model/verificationToken.js';
import Profile from '../model/Profile.js';
import sgMail from '@sendgrid/mail';
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();


const transporter = nodemailer.createTransport({
  host:process.env.EMAIL_HOST,
  port : Number(process.env.EMAIL_PORT),
  secure:false,
  auth:{
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

// 🔹 SIGN IN
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    if (!user.verified)
      return res.status(400).json({ msg: "Please verify your email before signing in" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      msg: "Sign in successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Sign in failed", error: err.message || err });
  }
};

// 🔹 SIGN UP
export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // 1️⃣ Check if user exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // 🔁 If not verified → resend verification email
      if (!existingUser.verified) {
        // delete old tokens
        await VerificationToken.deleteMany({ userId: existingUser._id });

        // create new token
        const token = crypto.randomBytes(32).toString("hex");

        await VerificationToken.create({
          userId: existingUser._id,
          token,
          createdAt: Date.now(),
        });

        const verifyUrl = `${process.env.BACKEND_URL}/api/auth/verify/${token}`;

        // await transporter.sendMail({
        //   from: `"StudyVault" <${process.env.EMAIL_USER}>`,
        //   to: existingUser.email,
        //   subject: "Verify your email address",
        //   html: `
        //     <h2>Hello ${existingUser.fullName},</h2>
        //     <p>Your account already exists but is not verified.</p>
        //     <p>Please verify your email by clicking the link below:</p>
        //     <a href="${verifyUrl}" style="color:#6366f1;font-weight:bold;">
        //       Verify Email
        //     </a>
        //     <p>This link will expire in 1 hour.</p>
        //   `,
        // });

      //   return res.status(200).json({
      //     message:
      //       "Account exists but email not verified. Verification email has been resent.",
      //   });
      }

      // ❌ Already verified
      return res.status(400).json({ msg: "User already exists" });
    }

    // 2️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    // 3️⃣ Create user
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    // create profile
    await Profile.create({
      userId: user._id,
      fullName,
      email,
      password: hashedPassword,
    });

    // create verification token
    const token = crypto.randomBytes(32).toString("hex");

    await VerificationToken.create({
      userId: user._id,
      token,
      createdAt: Date.now(),
    });

    // 6️⃣ Send verification email
    const verifyUrl = `${process.env.BACKEND_URL}/api/auth/verify/${token}`;

    // await transporter.sendMail({
    //   from: `"StudyVault" <${process.env.EMAIL_USER}>`,
    //   to: user.email,
    //   subject: "Verify your email address",
    //   html: `
    //     <h2>Hello ${user.fullName},</h2>
    //     <p>Welcome to <b>StudyVault</b>!</p>
    //     <p>Please verify your email by clicking the link below:</p>
    //     <a href="${verifyUrl}" style="color:#6366f1;font-weight:bold;">
    //       Verify Email
    //     </a>
    //     <p>This link will expire in 1 hour.</p>
    //   `,
    // });

    return res.status(201).json({
      message:
        "User registered successfully!",
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({
      msg: "Signup failed",
      error: err.message || err,
    });
  }
};


// 🔹 VERIFY EMAIL
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const vToken = await VerificationToken.findOne({ token });
    if (!vToken)
      return res.redirect(`${process.env.FRONTEND_URL}/verify-email/failed`);

    // 1️⃣ Verify user
    await User.findByIdAndUpdate(vToken.userId, { verified: true });

    // 2️⃣ Delete token
    await VerificationToken.deleteOne({ _id: vToken._id });

    // 3️⃣ Redirect to frontend success page
    return res.redirect(`${process.env.FRONTEND_URL}/verify-email/success`);
  } catch (error) {
    console.error("Verification error:", error);
    return res.redirect(`${process.env.FRONTEND_URL}/verify-email/failed`);
  }
};
