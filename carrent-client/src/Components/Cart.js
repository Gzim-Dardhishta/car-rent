import React, { useState } from 'react'
import './styles/cart.scss'
import gas from '../assets/gas-station.svg'
import drivetype from '../assets/Car.svg'
import people from '../assets/profile-2user.svg'
import { BsCheck2Circle } from 'react-icons/bs'
import { MdErrorOutline } from 'react-icons/md'

const Cart = () => {

    const [clientMessage, setClientMessage] = useState('');

    const [showM, setShowM] = useState(false);
    const [messageIcon, setMessageIcon] = useState(<BsCheck2Circle />)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
    };

    const showMessageBox = (message) => {
        setClientMessage(message)
        setShowM(true)
    }

    const closePopup = () => {
        setShowM(false)
        window.location.reload()
    }


    const cart = JSON.parse(localStorage.getItem('cart'));
    const user = JSON.parse(localStorage.getItem('user'));

    const cartItem = cart

    const carPhotoUrl = (id) =>
        `http://localhost:8000/api/v1/cars/car/${id}/photo`;

    const removeFromCart = () => {
        localStorage.removeItem("cart");
        localStorage.setItem('cart', null)
        window.location.reload()
    }

    const accessToken = localStorage.getItem("access_token");

    const handleSubmit = (e) => {
        e.preventDefault();

        const newOrder = { carId: cartItem.id, userId: user.id};

        fetch('http://localhost:8000/api/v1/orders/new-order', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify(
                { carId: cart.id, userId: user.id}
            )
        }).then(res => {
            if (!res.ok) {
                throw Error('Error');
            }
            return res.json()
        })
            .then(() => {
                console.log("Added")
                showMessageBox('Order Added')
            }).catch(err => {
                console.log(err)
                setMessageIcon(<MdErrorOutline />)
                showMessageBox('Error!! Order was not added')
            })
    }

    return (
        <>
            {cart !== null ? (
                <div className='cart'>

                    <div className='car'>
                        <div className="top-info">
                            <div className="name">
                                <div className="car-name">{cartItem.model}  {cartItem.brand}</div>
                                <div className="car-type">{cartItem.type}</div>
                            </div>
                            <div className="favorite" onClick={removeFromCart}>X Remove</div>
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
                        <div className="rentnow" onClick={handleSubmit}>Proceed to checkout</div>
                    </div>
                </div>
            ) : (
                <div className='cart'>

                    <div className='car'>
                        There is nothing in cart
                    </div>

                    <div className="order-card">
                        <div className="price">Subtotal (1 item): $/day</div>
                        <div className="rentnow">Proceed to checkout</div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Cart