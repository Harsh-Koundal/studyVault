import React from "react";
import { XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const EmailVerifyFailed = () => {
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
          <XCircle className="w-16 h-16 text-red-500" />
        </motion.div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Email Verification Failed
        </h1>
        <p className="text-gray-600 mb-6">
          The verification link may have expired or is invalid.  
          Please try signing up again or request a new verification email.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Link
            to="/login"
            className="inline-block bg-red-500 text-white py-2 px-6 rounded-lg font-medium hover:bg-red-600 transition-all duration-200"
          >
            Sign Up Again
          </Link>

          <Link
            to="/login"
            className="inline-block border border-gray-300 text-gray-700 py-2 px-6 rounded-lg font-medium hover:bg-gray-100 transition-all duration-200"
          >
            Go to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default EmailVerifyFailed;
