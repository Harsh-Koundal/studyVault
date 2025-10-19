import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from './components/navbar'
import Home from './pages/Home.jsx'
import Footer from './components/Footer.jsx'
import { ScrollTop } from './components/Scroll.js'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
function App() {
  return (
    <Router>
      <Navbar/>
      <ScrollTop/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
