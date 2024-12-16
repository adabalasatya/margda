import React from 'react'
import Navbar from '../Components/navbar'
import HeroSection from './HeroSection'
import MainSection from './MainSection'
import Footer from './Footer'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <MainSection/>
      <Footer/>
    </div>
  )
}

export default Home
