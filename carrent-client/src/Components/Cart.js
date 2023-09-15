import React, { useContext } from 'react'
import './styles/cart.scss'
import favorite from '../assets/heart2.svg'
import gas from '../assets/gas-station.svg'
import drivetype from '../assets/Car.svg'
import people from '../assets/profile-2user.svg'
import { Link } from 'react-router-dom'
import nissan from '../assets/image8.svg'
import { ContextProvider } from '../context/ContextProvider'

const Cart = () => {

    const { removeFromCart } = useContext(ContextProvider);

    const cart = JSON.parse(localStorage.getItem('cartItems'));

    const cartItem = cart.cart[0]

    const carPhotoUrl = (id) =>
        `http://localhost:8000/api/v1/cars/car/${id}/photo`;

    console.log(cartItem)
    return (
        <div className='cart'>

            <div className='car' key={cartItem.id}>
                <div className="top-info">
                    <div className="name">
                        <div className="car-name">{cartItem.model}  {cartItem.brand}</div>
                        <div className="car-type">{cartItem.type}</div>
                    </div>
                    <div className="favorite" onClick={() => removeFromCart(1)}>X Remove</div>
                </div>
                <div className="mobile-responsive">
                    <div className="car-image" style={{ content: `url(${carPhotoUrl(cartItem.id)})` }}></div>
                    <div className="inside-car-info">
                        <div className="gas">
                            <div className="gas-icon" style={{ content: `url(${gas})` }}></div>
                            <div className="litter">{cartItem.gasoline}</div>
                        </div>
                        <div className="drive-type">
                            <div className="type-icon" style={{ content: `url(${drivetype})` }}></div>
                            <div className="type">{cartItem.steering}</div>
                        </div>
                        <div className="car-seats">
                            <div className="seats-icon" style={{ content: `url(${people})` }}></div>
                            <div className="seats">{cartItem.capacity} People</div>
                        </div>
                    </div>
                </div>
                <div className="price">
                    <div className="car-price">{cartItem.price}<b>/day</b></div>
                </div>
            </div>

            <div className="order-card">
                <div className="price">Subtotal (1 item): <b>{cartItem.price}</b>$/day</div>
                <div className="rentnow">Proceed to checkout</div>
            </div>
        </div>
    )
}

export default Cart