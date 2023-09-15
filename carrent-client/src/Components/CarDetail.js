import React from 'react'
import './styles/carDetail.scss'
import star from '../assets/ic-actions-star.svg'
import { Link, useParams } from 'react-router-dom'
import Reviews from './Reviews'
import g from '../assets/g.jpg'
import useFetch from '../hooks/useFetch'

const CarDetail = () => {

  const { carId } = useParams();

  const { data: car, isLoading, error } = useFetch(`http://localhost:8000/api/v1/cars/car/${carId}`)

  console.log(car)

  const carPhotoUrl = (id) =>
    `http://localhost:8000/api/v1/cars/car/${carId}/photo`;

  return (
    <>
      <div className='car-details'>
        <div className="car-gallery" data-aos="flip-right">
          <div className="default">
            <div className="default-text">
              <div className="description-title">Sports car with the best designn and acceleration</div>
              <div className="description-text">Safety and comfort while driving a futuristic and elegant sports car</div>
            </div>
            <div className="default-image">
              <img src={carPhotoUrl()} alt="" />
            </div>
          </div>
        </div>

        <div className='car-info-reviews'>
          <div className="car-infos" data-aos="fade-left">
            <div className="car-infos-title">{car?.brand} {car?.model}</div>
            <div className="star-review">
              <div className="stars">
                {Array(4).fill().map((_) => (
                  <div className="star" style={{ content: `url(${star})` }}></div>
                ))}
              </div>
              <div className="num-reviewer">{car?.carReviews.length}+ Reviewer</div>
            </div>
            <div className="text-review">
              <p>{car?.description}</p>
            </div>
            <div className="car-info">
              <div className="car-type">
                <div className="car-type-title">Type Car</div>
                <div className="car-type-text">{car?.engineType}</div>
              </div>
              <div className="car-capacity">
                <div className="car-capacity-title">Capacity</div>
                <div className="car-capacity-text">{car?.capacity} Person</div>
              </div>
              <div className="car-steer">
                <div className="car-steer-title">Steering</div>
                <div className="car-steer-text">{car?.steering}</div>
              </div>
              <div className="car-gas">
                <div className="car-gas-title">Gasoline</div>
                <div className="car-gas-text">{car?.gasoline}L</div>
              </div>
            </div>
            <div className="car-price">
              <div className="price-perday"><strong>${car?.price}/</strong>day</div>

              <div className="rent-button">
                <Link to='/'>
                  Rent Now
                </Link>
              </div>
            </div>
          </div>

          <div className='reviews' data-aos="fade-right">
            <div className="reviews-title">
              <h2>Reviews</h2>
              <div className="reviews-number">{car?.carReviews.length}</div>
            </div>

            <div className="review-list">

              {car?.carReviews.map((r, index) => (
                <div className="review">
                  <div className="user-info">
                    <div className="user">
                      <div className="image"></div>
                      <div className="name">{r.fromUser.username}</div>
                    </div>
                    <div className="date-rating">
                      <div className="date">{r.dateSubmitted}</div>
                      <div className="rating">
                        {Array(5).fill().map((_) => (
                          <div className="star" style={{ content: `url(${star})` }}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="user-review">{r.message} </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CarDetail