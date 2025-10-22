import React from "react";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const EmailVerifySuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl rounded-2xl p-8 max-w-md text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="flex justify-center mb-4"
        >
          <CheckCircle className="w-16 h-16 text-green-500" />
        </motion.div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Email Verified Successfully!
        </h1>
        <p className="text-gray-600 mb-6">
          Your email has been verified successfully. You can now log in to your
          account and start using StudyVault.
        </p>

        <Link
          to="/login"
          className="inline-block bg-green-500 text-white py-2 px-6 rounded-lg font-medium hover:bg-green-600 transition-all duration-200"
        >
          Go to Login
        </Link>
      </motion.div>
    </div>
  );
};

export default EmailVerifySuccess;
