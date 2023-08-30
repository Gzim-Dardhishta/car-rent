import React from 'react'
import './styles/cart.scss'
import favorite from '../assets/heart2.svg'
import gas from '../assets/gas-station.svg'
import drivetype from '../assets/Car.svg'
import people from '../assets/profile-2user.svg'
import { Link } from 'react-router-dom'
import nissan from '../assets/image8.svg'

const Cart = () => {

    const cars = [
        {
            id: '1',
            name: "Nissan GT - R",
            type: "Sport",
            image: nissan,
            fuel: "80L",
            drivetype: "Manual",
            seats: 2,
            price: "$100"
        }
    ]
    return (
        <div className='cart'>

            {cars.map((car) => {
                return (
                    <div className='car' key={car.id}>
                        <div className="top-info">
                            <div className="name">
                                <div className="car-name">{car.name}</div>
                                <div className="car-type">{car.type}</div>
                            </div>
                            <div className="favorite">X Remove from Cart</div>
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
                        </div>
                    </div>
                )
            })}

            <div className="order-card">
                <div className="price">Price</div>
                <div className="rentnow">Rent Now</div>
            </div>
        </div>
    )
}

export default Cart