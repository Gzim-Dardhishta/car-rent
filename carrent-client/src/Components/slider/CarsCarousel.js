import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { CarsData } from '../data';
import favorite from '../../assets/heart2.svg'
import gas from '../../assets/gas-station.svg'
import drivetype from '../../assets/Car.svg'
import people from '../../assets/profile-2user.svg'
import { Link } from 'react-router-dom'
import '../styles/carousel.scss'
import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react';


const CarsCarousel = () => {

    const [width, setWidth] = useState(0);

    const carousel = useRef();

    useEffect(() => {
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    }, [])

    return (
        <div>
            <motion.div ref={carousel} className='carousel' whileTap={"grabbing"}>
                <motion.div drag="x" dragConstraints={{right: 0, left: -width}} className='inner-carousel'>
                    {CarsData.map((car, index) => {
                        if (index >= 4) {
                            return
                        }
                        else {
                            return (
                                <motion.div className='car' data-aos="zoom-in" key={index}>
                                    <div className="top-info">
                                        <div className="name">
                                            <div className="car-name">{car.name}</div>
                                            <div className="car-type">{car.type}</div>
                                        </div>
                                        <div className="favorite" style={{ content: `url(${favorite})`, width: '1.3em' }}></div>
                                    </div>
                                    <div className="car-image" style={{ content: `url(${car.image})` }}></div>
                                    <div className="inside-car-info">
                                        <div className="gas">
                                            <div className="gas-icon" style={{ content: `url(${gas})` }}></div>
                                            <div className="litter">{car.fuel}</div>
                                        </div>
                                        <div className="drive-type">
                                            <div className="type-icon" style={{ content: `url(${drivetype})` }}></div>
                                            <div className="type">{car.drivetype}</div>
                                        </div>
                                        <div className="car-seats">
                                            <div className="seats-icon" style={{ content: `url(${people})` }}></div>
                                            <div className="seats">{car.seats} People</div>
                                        </div>
                                    </div>
                                    <div className="price">
                                        <div className="car-price">{car.price}<b>/day</b></div>
                                        <div className="rent-button">
                                            <Link to='/'>Rent Now</Link>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        }
                    })}
                </motion.div>
            </motion.div>
        </div>
    )
}

export default CarsCarousel