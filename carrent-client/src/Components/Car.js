import React, { useContext } from 'react'
import favorite from '../assets/heart2.svg'
import gas from '../assets/gas-station.svg'
import drivetype from '../assets/Car.svg'
import people from '../assets/profile-2user.svg'
import { Link, useNavigate } from 'react-router-dom'

const Car = ({ cars }) => {

    const navigate = useNavigate()

    const addToCart = () => {
        localStorage.setItem("cart", JSON.stringify(cars))
        navigate('/cart')
    }

    const carPhotoUrl = (id) =>
        `http://localhost:8000/api/v1/cars/car/${id}/photo`;

    return (
        <>
            <div className='car'>
                <div className="top-info">
                    <div className="name">
                        <div className="car-name">{cars.model}</div>
                        <div className="car-type">{cars.engineType}</div>
                    </div>
                    <div className="favorite" style={{ content: `url(${favorite})`, width: '1.3em' }}></div>
                </div>
                <div className="mobile-responsive">
                    <div className="car-image" style={{ content: `url(${carPhotoUrl(cars.id)})` }}></div>
                    <div className="inside-car-info">
                        <div className="gas">
                            <div className="gas-icon" style={{ content: `url(${gas})` }}></div>
                            <div className="litter">{cars.gasoline}</div>
                        </div>
                        <div className="drive-type">
                            <div className="type-icon" style={{ content: `url(${drivetype})` }}></div>
                            <div className="type">{cars.steering}</div>
                        </div>
                        <div className="car-seats">
                            <div className="seats-icon" style={{ content: `url(${people})` }}></div>
                            <div className="seats">{cars.capacity} People</div>
                        </div>
                    </div>
                </div>
                <div className="price">
                    <div className="car-price">{cars.price}<b>$/day</b></div>
                    <div className="rent-button" onClick={() => addToCart(cars)}>
                        <Link to='/'>Rent Now</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Car