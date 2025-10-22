import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Footer from './components/Footer.jsx'
import { ScrollTop } from './components/Scroll.js'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import UploadPage from './pages/Upload.jsx'
import Profile from './pages/Profile.jsx'
import EmailVerifySuccess from './components/emailVerifySuccess.jsx'
import EmailVerifyFailed from './components/EmailVerifyFailed.jsx'
function App() {
  return (
    <Router>
      <Navbar/>
      <ScrollTop/> 
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/upload' element={<UploadPage/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/verify-email/success' element={<EmailVerifySuccess/>}/>
        <Route path='/verify-email/failed' element={<EmailVerifyFailed/>}/>


      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
