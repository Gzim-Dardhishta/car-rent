import React, { useState } from 'react'
import star from '../assets/ic-actions-star.svg'
import './styles/reviews.scss'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const Reviews = () => {

    return (
        <div className='reviews' data-aos="fade-right">
            <div className="reviews-title">
                <h2>Reviews</h2>
                <div className="reviews-number">13</div>
            </div>

            <div className="review-list">

                {Array(4).fill().map((_, index) => (
                    <div className="review">
                        <div className="user-info">
                            <div className="user">
                                <div className="image"></div>
                                <div className="name">Alex Stanton</div>
                            </div>
                            <div className="date-rating">
                                <div className="date">21 July 2022</div>
                                <div className="rating">
                                    {Array(5).fill().map((_) => (
                                        <div className="star" style={{ content: `url(${star})` }}></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="user-review">We are very happy with the service from the MORENT App. Morent has a low price . . . </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Reviews