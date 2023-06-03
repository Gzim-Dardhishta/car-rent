import React from 'react'
import car1 from '../assets/image 7.svg'
import car2 from '../assets/image8.svg'
import './styles/banner1.scss'
import arrowDown from '../assets/arrow-down.svg'

const Banner1 = () => {
    return (
        <div className='banner1'>
            <div className="banner1-row">
                <div className="add1" data-aos="zoom-in-down">
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

                <div className="add2" data-aos="zoom-in-down">
                    <div className="add-text">
                        <div className="add2-title">Easy way to rent a car at a low price</div>
                        <div className="add2-text">Providing cheap car rental services and safe and comfortable facilities.</div>
                        <button className="add2-button">
                            Rental Car
                        </button>
                    </div>
                    <div className="add2-photo">
                        <img src={car2} width={250} alt="" />
                    </div>
                </div>
            </div>

            <div className="pick-drop-cards">
                <div className="p-card" data-aos="fade-right">
                    <div className="p-card-title">
                        <input type="radio" checked="checked" />
                        <p>Pick Up</p>
                    </div>
                    <div className="p-card-info">
                        <div className="location">
                            <p className='b'>Locations</p>
                            <div className='row'>
                                <p>Select city</p>
                                <span className='arrow-down'></span>
                            </div>
                        </div>
                        <div className='date'>
                            <p className='b'>Date</p>
                            <div className='row'>
                                <p>Select date</p>
                                <span className='arrow-down'></span>
                            </div>
                        </div>
                        <div className='time'>
                            <p className='b'>Time</p>
                            <div className='row'>
                                <p>Select time</p>
                                <span className='arrow-down'></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="switch-button" data-aos="zoom-out">
                    <div className="button-icon"></div>
                </div>

                <div className="d-card" data-aos="fade-left">
                    <div className="d-card-title">
                        <input type="radio" checked="checked" />
                        <p>Drop-Off</p>
                    </div>
                    <div className="d-card-info">
                        <div className="location">
                            <p className='b'>Locations</p>
                            <div className='row'>
                                <p>Select city</p>
                                <span className='arrow-down'></span>
                            </div>
                        </div>
                        <div className='date'>
                            <p className='b'>Date</p>
                            <div className='row'>
                                <p>Select date</p>
                                <span className='arrow-down'></span>
                            </div>
                        </div>
                        <div className='time'>
                            <p className='b'>Time</p>
                            <div className='row'>
                                <p>Select time</p>
                                <span className='arrow-down'></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner1