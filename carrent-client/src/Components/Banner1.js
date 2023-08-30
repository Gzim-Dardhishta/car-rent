import React from 'react'
import './styles/banner1.scss'
import carimage from "../assets/hero.png"

const Banner1 = () => {
    return (
        <div className='banner1'>

            <div className="hero-section">
                <div className="introduction" data-aos="fade-right">
                    <h3>Find, book, rent a car—quick and super easy!</h3>

                    <p>Streamline your car rental experience with our effortless booking process.</p>

                    <button>Explore Cars</button>
                </div>

                <div className="hero-images">
                    <div className="car-image" data-aos="zoom-in">
                        <img src={carimage} alt="" />
                    </div>

                    <div className="hero_image-overlay"></div>
                </div>
            </div>
        </div>
    )
}

export default Banner1