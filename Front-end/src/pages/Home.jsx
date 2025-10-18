import React from 'react'
import { Upload,ArrowRight,Download,UsersIcon } from 'lucide-react'
const Home = () => {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className='container mx-auto px-4 py-10 text-center flex justify-around items-center flex-wrap'>
          <div className='justify-center items-start flex flex-col'>
          <div className="inline-flex items-center gap-2 glass px-10 py-1.5 rounded-full shadow-lg border border-white/60 hover-scale mb-5">
          <span>Powered By NerathiX</span></div>
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
            <button className='flex gap-3 items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl p-3'><Upload size={15}/>Upload Notes <ArrowRight/></button>
            <button className='flex gap-3 items-center bg-gradient-to-tl from-indigo-500 via-purple-500 rounded-xl p-3'><Download/> Find Question Paper</button>
          </div>
          <div className='flex flex-wrap gap-6 mt-10'>
            <div className='flex items-center gap-3 glass-card rounded-xl p-4 hover-lift'><UsersIcon className='h-12 w-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg text-white p-3' size={30}/>
            10,000+ <br />
            Active Students</div>
            <div className='flex items-center gap-3 glass-card rounded-xl p-4 hover-lift bg-white'><UsersIcon className='h-12 w-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg text-white p-3' size={30}/>
            10,000+ <br />
            Active Students</div>
          </div>
          
          </div>
          <div>
          <img
            src='https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3R1ZHl8ZW58MHx8MHx8fDA%3D&w=1000&q=80'
            alt='Study Illustration'
            className='w-full max-w-md mx-auto mt-10'
          />
          </div>
        </div>
          
      </section>
    </div>
  )
}

export default Home
