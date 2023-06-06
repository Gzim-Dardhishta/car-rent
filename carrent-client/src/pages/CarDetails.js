import React from 'react'
import NavBar from '../shared/NavBar'
import CarDetail from '../Components/CarDetail'
import Footer from '../shared/Footer'

const CarDetails = () => {
  return (
    <div className='car-detail-page'>
        <NavBar />
        <CarDetail />
        <Footer /> 
    </div>
  )
}

export default CarDetails