import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from './components/navbar'
import Home from './pages/Home.jsx'
import Footer from './components/Footer.jsx'
import { ScrollTop } from './components/Scroll.js'
function App() {
  return (
    <Router>
      <Navbar/>
      <ScrollTop/>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
