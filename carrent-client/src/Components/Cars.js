import React from 'react'
import { CarsData } from './data'
import favorite from '../assets/heart2.svg'
import gas from '../assets/gas-station.svg'
import drivetype from '../assets/Car.svg'
import people from '../assets/profile-2user.svg'
import './styles/cars.scss'
import { Link } from 'react-router-dom'
import CarsCarousel from './slider/CarsCarousel'

const Cars = () => {
    console.log(CarsData)
    return (
        <div className='cars'>
            <h5 className='popular-cars-title'>Popular Cars</h5>
            <CarsCarousel />

            <h5 className='recomendation-cars-title'>Recomendation Car</h5>
            <div className="car-list">
                {CarsData.map(car => {
                    return (
                        <Link to={`/car/${car.id}`} key={car.id}>
                            <div className='car' data-aos="zoom-in">
                                <div className="top-info">
                                    <div className="name">
                                        <div className="car-name">{car.name}</div>
                                        <div className="car-type">{car.type}</div>
                                    </div>
                                    <div className="favorite" style={{ content: `url(${favorite})`, width: '1.3em' }}></div>
                                </div>
                                <div className="mobile-responsive">
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
                                </div>
                                <div className="price">
                                    <div className="car-price">{car.price}<b>/day</b></div>
                                    <div className="rent-button">
                                        <Link to='/'>Rent Now</Link>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default Cars