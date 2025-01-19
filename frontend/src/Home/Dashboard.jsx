import React from 'react'
import Hero from './Hero'
import Navbar from './Navbar'
import Contact from './Contact'
import Footer from './Footer'
import Services from './Services'
import About from './About'


const Dashboard = () => {
  return (
    <div>
    <Navbar/>
    <Hero id = 'hero'/>
    <About id='about'/>
    <Services id = 'services'/>
    <Contact id = 'contact'/>
    <Footer/>
    </div>
  )
}

export default Dashboard
