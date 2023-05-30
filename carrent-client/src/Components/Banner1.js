import React from 'react'
import car1 from '../assets/image 7.svg'
import car2 from '../assets/image 8.svg'
import './styles/banner1.scss'

const Banner1 = () => {
    return (
        <div className='banner1'>
            <div className="add1">
                <div className="add-text">
                    <div className="add1-title">The Best Platform for Car Rental</div>
                    <div className="add1-text">Ease of doing a car rental safely and reliably. Of course at a low price.</div>
                    <button className="add1-button">
                        Rental Car
                    </button>
                </div>
                <div className="add1-photo">
                    <img src={car1} width={280} alt="" />
                </div>
            </div>

            <div className="add2">
                <div className="add-text">
                    <div className="add2-title">Easy way to rent a car at a low price</div>
                    <div className="add2-text">Providing cheap car rental services and safe and comfortable facilities.</div>
                    <button className="add2-button">
                        Rental Car
                    </button>
                </div>
                <div className="add2-photo">
                    <img src={car2} width={280} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Banner1