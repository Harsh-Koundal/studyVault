import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from './components/navbar'
import Home from './pages/Home.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
      {/* <Footer/> */}
    </Router>
  )
}

export default App
