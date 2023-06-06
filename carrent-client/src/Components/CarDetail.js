import React, { useState, useRef, useEffect } from 'react'
import defaultCar from '../assets/image8.svg'
import look1 from '../assets/Look 1.svg'
import look2 from '../assets/Look 2.svg'
import look3 from '../assets/Look 3.svg'
import './styles/carDetail.scss'
import star from '../assets/ic-actions-star.svg'
import { Link } from 'react-router-dom'
import Reviews from './Reviews'

const CarDetail = () => {

  const [image, setImage] = useState();

  const imageRef = useRef();

  return (
    <>
      <div className='car-details'>
        <div className="car-gallery" data-aos="flip-right">
          {image ?
            <div className="car-image">
              <img src={image} alt="" />
            </div>
            :
            <div className="default">
              <div className="default-text">
                <div className="description-title">Sports car with the best designn and acceleration</div>
                <div className="description-text">Safety and comfort while driving a futuristic and elegant sports car</div>
              </div>
              <div className="default-image">
                <img src={defaultCar} alt="" />
              </div>
            </div>}
          <div className="car-images">
            <div className="image"><img src={look1} onClick={() => setImage(look1)} alt="" /></div>
            <div className="image"><img src={look2} onClick={() => setImage(look2)} alt="" /></div>
            <div className="image"><img src={look3} onClick={() => setImage(look3)} alt="" /></div>
          </div>
        </div>

        <div className='car-info-reviews'>
          <div className="car-infos" data-aos="fade-left">
            <div className="car-infos-title">Nissan GT - R</div>
            <div className="star-review">
              <div className="stars">
                {Array(4).fill().map((_) => (
                  <div className="star" style={{ content: `url(${star})` }}></div>
                ))}
              </div>
              <div className="num-reviewer">440+ Reviewer</div>
            </div>
            <div className="text-review">
              <p>NISMO has become the embodiment of Nissan's outstanding performance,
                inspired by the most unforgiving proving ground, the "race track".</p>
            </div>
            <div className="car-info">
              <div className="car-type">
                <div className="car-type-title">Type Car</div>
                <div className="car-type-text">Sports</div>
              </div>
              <div className="car-capacity">
                <div className="car-capacity-title">Capacity</div>
                <div className="car-capacity-text">2 Person</div>
              </div>
              <div className="car-steer">
                <div className="car-steer-title">Steering</div>
                <div className="car-steer-text">Manual</div>
              </div>
              <div className="car-gas">
                <div className="car-gas-title">Gasoline</div>
                <div className="car-gas-text">70L</div>
              </div>
            </div>
            <div className="car-price">
              <div className="price-perday"><strong>$100/</strong>day</div>

              <div className="rent-button">
                <Link to='/'>
                  Rent Now
                </Link>
              </div>
            </div>
          </div>

          <Reviews />
        </div>
      </div>
    </>
  )
}

export default CarDetail