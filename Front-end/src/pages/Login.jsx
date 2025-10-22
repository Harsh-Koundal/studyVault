import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, Zap, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import logo from '../assets/logo.png';
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const nevigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin && userData.password !== userData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      if (isLogin) {
        const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/auth/signin`, {
          email: userData.email,
          password: userData.password,
        }, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        localStorage.setItem("token", res.data.token);

        window.dispatchEvent(new Event("login"));

        toast.success("Logged in successfully!", {
          duration: 2000, 
          position: 'top-right',
        });
        setTimeout(() => {
          nevigate("/");
        }, 500); 

      }
      else {
        const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/auth/signup`, {
          name: userData.fullName,
          email: userData.email,
          password: userData.password,
        }, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        toast.success("Registered successfully! Check your email.")
      }
    } catch (err) {
      console.log()
      console.error(err);
      const msg = err.response?.data?.msg || err.message || "Something went wrong!";
      toast.error(msg)
    }
  };

  const features = [
    {
      icon: React.createElement(Users, { className: "w-6 h-6" }),
      title: "10,000+ Active Students",
      gradient: "from-purple-500 to-indigo-600"
    },
    {
      icon: React.createElement(Shield, { className: "w-6 h-6" }),
      title: "100% Secure & Free",
      gradient: "from-indigo-500 to-purple-600"
    },
    {
      icon: React.createElement(Zap, { className: "w-6 h-6" }),
      title: "Instant Access",
      gradient: "from-purple-600 to-pink-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 flex items-center justify-center p-4 mt-16">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        <Toaster position="top-right" reverseOrder={true} />
        {/* Left Section - Info (Hidden on mobile) */}
        <motion.div
          className="hidden lg:block space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <img src={logo} alt="" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">NerathiX</h1>
              <p className="text-sm text-gray-600">StudyVault Platform</p>
            </div>
          </div>

          {/* Main Heading */}
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
              Join the Future of{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Student Collaboration
              </span>
            </h2>
            <p className="text-lg text-gray-600">
              Access thousands of study materials, share your notes, and collaborate with students worldwide.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center text-white shadow-md`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">{feature.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quote */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <p className="text-gray-700 italic">
              "Education is the most powerful weapon which you can use to change the world."
            </p>
            <p className="text-gray-500 text-sm mt-2">- Nelson Mandela</p>
          </div>
        </motion.div>

        {/* Right Section - Login Form (Full width on mobile) */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 w-full max-w-md lg:max-w-none mx-auto"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Form Header */}
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome to <span className="text-indigo-600">NerathiX</span>
            </h3>
            <p className="text-gray-600">Access thousands of study materials</p>
          </div>

          {/* Google Sign In */}
          <motion.button
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 rounded-xl py-3 mb-6 hover:bg-gray-50 transition-colors font-medium text-gray-700"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </motion.button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Toggle Login/Register */}
          <div className="flex gap-2 mb-6 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-lg font-semibold transition-all ${isLogin ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' : 'text-gray-600'
                }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-lg font-semibold transition-all ${!isLogin ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' : 'text-gray-600'
                }`}
            >
              Register
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            {/* Full Name - Only for Register */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={userData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-600 transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-600 transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={userData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-600 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password - Only for Register */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={userData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-600 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLogin ? 'Login' : 'Register'}
            </motion.button>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-500 mt-6">
            By continuing, you agree to our{' '}
            <a href="#" className="text-indigo-600 hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;