import React from 'react'
import logo from '../assets/logo1.o.png'
import dashboard from '../assets/dashboard.png'
import { Upload, ArrowRight, Download, UsersIcon, FileTextIcon, Star, BookOpen, GraduationCap, ShieldIcon, Heart, UserIcon, CalendarIcon, Eye, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
const Home = () => {
  const cardVariants = {
    hover: {
      y: -8,
      scale: 1.03,
    },
  };

  const iconVariants = {
    hover: {
      scale: 1.1,
      transition: { type: "spring", stiffness: 250, damping: 10 },
    },
  };

  const studyMaterials = [
  {
    id: 1,
    icon: FileTextIcon,
    title: "Data Structures Complete Notes",
    category: "Data Structures",
    semester: "3rd Sem",
    description:
      "Comprehensive notes covering arrays, linked lists, trees, graphs, and algorithms.",
    author: "Alice Johnson",
    date: "Oct 2025",
    downloads: 1500,
  },
  {
    id: 2,
    icon: FileTextIcon,
    title: "Operating Systems Question Paper",
    category: "Operating Systems",
    semester: "4th Sem",
    description:
      "Previous year question papers with detailed solutions for OS concepts.",
    author: "Bob Smith",
    date: "Sep 2025",
    downloads: 1200,
  },
  {
    id: 3,
    icon: FileTextIcon,
    title: "Database Management Systems Notes",
    category: "DBMS",
    semester: "4th Sem",
    description:
      "Detailed notes on relational models, normalization, SQL queries, and transactions.",
    author: "Charlie Brown",
    date: "Aug 2025",
    downloads: 1000,
  },
];
  return (
    <>
      <section className="elative overflow-hidden bg-gradient-to-br from-[#d6dcff] via-[#e3d2fa] to-[#d0f1ff] min-h-screen flex items-center pt-20 md:pt-24">
        <div className='container mx-auto px-4 py-10 text-center flex justify-around items-center flex-wrap'>
          <div className='justify-center items-start flex flex-col'>
            <div className="inline-flex items-center gap-2 glass px-7 py-1.5 rounded-full shadow-lg border border-white/60 hover-scale mb-5 bg-white">
              <span className='text-purple-400 flex items-center  gap-3'><span><img src={logo} alt="" className='w-10' /></span>Powered By NerathiX</span></div>
            <div>
              <p className='text-xl mb-8'>Empowering Students with <span className='text-purple-400'>Knowledge</span></p>
              <div className="h-1.5 w-28 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mb-6 shadow-glow"></div>
            </div>
            <div>
              <p className="text-slate-600 text-lg max-w-lg leading-relaxed text-start mb-8">
                A modern platform for students to upload, share, and access study materials. Built with innovation and designed for efficiency.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <button className='flex gap-3 items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl p-3 transition transform hover:-translate-y-1 hover:shadow-lg'><Upload size={15} />Upload Notes <ArrowRight /></button>
              <button className='flex gap-3 items-center bg-gradient-to-tl from-indigo-500 via-purple-500 rounded-xl p-3 transition transform hover:-translate-y-1 hover:shadow-lg'><Download /> Find Question Paper</button>
            </div>
            <div className='flex flex-wrap gap-6 mt-10'>
              <div className='cursor-pointer flex items-center bg-white gap-3 glass-card rounded-xl p-4 transition transform hover:-translate-y-2 hover:shadow-lg pr-20'><UsersIcon className='h-12 w-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg text-white p-3 ' size={30} />
                10,000+ <br />
                Active Students</div>
              <div className='flex items-center gap-3 glass-card rounded-xl p-4 hover-lift bg-white transition transform hover:-translate-y-2 hover:shadow-lg pr-20'><FileTextIcon className='h-12 w-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg text-white p-3 ' size={30} />
                5,000+ <br />
                Study Materials</div>
            </div>

          </div>
          <div>
            <img
              src={dashboard}
              alt='Study Illustration'
              className='w-full max-w-md mx-auto mt-10'
            />
          </div>
        </div>

      </section>
      {/* status */}
      <section className='flex bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white justify-around items-center py-10 flex-wrap gap-6 text-center'>
        <div className='items-center flex flex-col'>
          <UsersIcon />
          10,000+  <br />
          Active Students</div>
        <div className='items-center flex flex-col'>
          <FileTextIcon />
          5,000+ <br />
          Study Materials
        </div>
        <div className='items-center flex flex-col'>
          <Star />
          4.8/5 <br />
          User Rating
        </div>
        <div className='items-center flex flex-col'>
          <Download />
          15,000+ <br />
          Downloads
        </div>
      </section>

      {/* Browse by category */}
      <section className='container mx-auto px-4 pt-14 bg-slate-50 min-h-full py-32'>
        <div className='flex flex-col items-center'>
          <h2 className='text-2xl font-semibold mb-4 text-center'>Browse by Category</h2>
          <div className="h-1.5 w-28 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mb-6 shadow-glow"></div>
        </div>
        <div className='flex justify-center text-xl text-slate-500'>
          <p>Access thousands of study materials across different categories</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto mt-10">
          {/* Purple Card */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="group bg-white rounded-xl p-6 hover:shadow-xl hover:bg-purple-50 transition-all duration-300 cursor-pointer lg:w-72 border"
          >
            <motion.div variants={iconVariants}>
              <FileTextIcon
                size={50}
                className="mt-5 text-white bg-purple-600 p-2 rounded-xl shadow-md"
              />
            </motion.div>
            <h3 className=" text-lg font-semibold mt-4 text-gray-800">
              Study Notes
            </h3>
            <p className=" text-slate-500 mt-2">
              <span className="text-purple-600 font-medium">2,500+</span> <br />
              Resources available
            </p>
          </motion.div>

          {/* Pink Card */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="group bg-white rounded-xl p-6 hover:shadow-xl hover:bg-pink-50 transition-all duration-300 cursor-pointer lg:w-72 border"
          >
            <motion.div variants={iconVariants}>
              <BookOpen
                size={50}
                className="mt-5 text-white bg-gradient-to-tl from-purple-500 to-pink-500 p-2 rounded-xl shadow-md"
              />
            </motion.div>
            <h3 className=" text-lg font-semibold mt-4 text-gray-800">
              Courses
            </h3>
            <p className=" text-slate-500 mt-2">
              <span className="text-pink-600 font-medium">500+</span> <br />
              Interactive lessons
            </p>
          </motion.div>

          {/* Blue Card */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="group bg-white rounded-xl p-6 hover:shadow-xl hover:bg-cyan-50 transition-all duration-300 cursor-pointer lg:w-72 border"
          >
            <motion.div variants={iconVariants}>
              <GraduationCap
                size={50}
                className="mt-5 text-white bg-gradient-to-tl from-blue-500 to-cyan-500 p-2 rounded-xl shadow-md"
              />
            </motion.div>
            <h3 className=" text-lg font-semibold mt-4 text-gray-800">
              Achievements
            </h3>
            <p className=" text-slate-500 mt-2">
              <span className="text-cyan-600 font-medium">10,000+</span> <br />
              Students succeeded
            </p>
          </motion.div>
        </div>
      </section>
      {/* why choose our platform */}
      <section className='bg-gradient-to-r from-cyan-100 to-purple-100 min-h-full flex flex-col items-center justify-center py-14'>
        <div className='flex flex-col items-center pt-14 pb-16'>
          <h1>Why Choose Our Platform?</h1>
          <div className="h-1.5 w-28 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mb-6 shadow-glow mt-2"></div>
          <p className='max-w-2xl text-center text-slate-600 text-lg'>Built with modern technology to provide the best experience for students</p>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto mt-10 px-4">
  {/* Upload Card */}
  <motion.div
    variants={cardVariants}
    whileHover="hover"
    className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-2xl hover:bg-cyan-50 transition-all duration-300 cursor-pointer"
  >
    <motion.div
      variants={iconVariants}
      className="flex justify-center"
      whileHover={{ rotate: 15 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
    >
      <Upload
        size={50}
        className="mt-3 text-white bg-gradient-to-tl from-blue-500 to-cyan-500 p-2 rounded-xl shadow-md"
      />
    </motion.div>

    <h3 className="text-center text-lg font-semibold mt-5 text-gray-800">
      Easy Upload
    </h3>
    <p className="text-center text-slate-500 mt-2">
      Drag and drop your notes and question papers in seconds.
    </p>
  </motion.div>

  {/* Download Card */}
  <motion.div
    variants={cardVariants}
    whileHover="hover"
    className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-2xl hover:bg-pink-50 transition-all duration-300 cursor-pointer"
  >
    <motion.div
      variants={iconVariants}
      className="flex justify-center"
      whileHover={{ rotate: 15 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
    >
      <Download
        size={50}
        className="mt-3 text-white bg-gradient-to-tl from-purple-500 to-pink-500 p-2 rounded-xl shadow-md"
      />
    </motion.div>

    <h3 className="text-center text-lg font-semibold mt-5 text-gray-800">
      Quick Access
    </h3>
    <p className="text-center text-slate-500 mt-2">
      Download study materials instantly with one click.
    </p>
  </motion.div>

  {/* Secure Card */}
  <motion.div
    variants={cardVariants}
    whileHover="hover"
    className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-2xl hover:bg-purple-50 transition-all duration-300 cursor-pointer"
  >
    <motion.div
      variants={iconVariants}
      className="flex justify-center"
      whileHover={{ rotate: 15 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
    >
      <ShieldIcon
        size={50}
        className="mt-3 text-white bg-purple-600 p-2 rounded-xl shadow-md"
      />
    </motion.div>

    <h3 className="text-center text-lg font-semibold mt-5 text-gray-800">
      Secure & Reliable
    </h3>
    <p className="text-center text-slate-500 mt-2">
      Your data is protected with industry-standard security.
    </p>
  </motion.div>
</div>

        </div>
      </section>
      {/* study materials */}
      <section>
        <div className='flex flex-col items-center pt-14 pb-16'>
          <h1>Popular Study Materials</h1>
          <div className="h-1.5 w-28 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mb-6 shadow-glow mt-2"></div>
          <p className='max-w-2xl text-center text-slate-600 text-lg mb-5'>Most downloaded notes and question papers this week</p>

           <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
      {studyMaterials.map((material) => (
        <div
          key={material.id}
          className="glass-card border border-gray-200 rounded-2xl p-6 m-4 w-[360px] hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 text-purple-600 p-3 rounded-2xl">
                <material.icon size={28} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {material.title}
              </h3>
            </div>
            <button className="group p-2 rounded-full transition-all duration-300 hover:bg-pink-100">
              <Heart className="w-5 h-5 text-slate-400 fill-transparent group-hover:fill-pink-500 group-hover:text-pink-500 transition-all duration-300" />
            </button>
          </div>

          {/* Tags */}
          <div className="flex gap-2 mt-3">
            <span className="bg-purple-100 text-purple-700 text-xs font-medium px-3 py-1 rounded-full">
              {material.category}
            </span>
            <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
              {material.semester}
            </span>
          </div>

          {/* Description */}
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">
            {material.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between mt-5 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <UserIcon size={16} />
              <span>{material.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon size={16} />
              <span>{material.date || "Invalid Date"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Download size={16} />
              <span>{material.downloads}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between mt-6">
            <button className="border border-gray-300 px-4 py-2 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 transition-all duration-200 flex items-center gap-2">
             <Eye/> Preview
            </button>
            <button className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-all duration-200">
              <Download size={16} />
              Download
            </button>
          </div>
        </div>
      ))}
    </div>
    <button className='mt-6 px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition transform hover:-translate-y-1 flex'>Explore All Materials <ArrowRight/>
    </button>
        </div>
        <div className="relative py-24 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white overflow-hidden flex flex-col items-center justify-center">
          <h1>Ready to Start Sharing <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Knowledge?</span></h1>
          <p className='p-10 mb-6 text-center max-w-2xl text-slate-300 text-lg'>
            Join thousands of students who are already benefiting from our platform. Upload your first material today and contribute to the community.
          </p>
          <div className="mt-8 flex  items-center gap-4">
            <button className='bg-white text-black px-6 py-3 rounded-xl hover:shadow-lg transition transform hover:-translate-y-1 flex items-center gap-2'>
              Get Started Free <ArrowRight className="inline ml-1" />
            </button>
            <button className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition transform hover:-translate-y-1 flex items-center gap-2'>
              Browse Materials <Clock className="inline ml-2" />
            </button>
            
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
