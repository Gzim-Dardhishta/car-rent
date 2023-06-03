import React from 'react'
import NavBar from '../shared/NavBar'
import Banner1 from '../Components/Banner1'
import Footer from '../shared/Footer'
import Cars from '../Components/Cars'

const Home = () => {
  return (
    <div className='home'>
        <NavBar />
        <Banner1 />
        <Cars />
        <Footer />
    </div>
  )
}

export default Home