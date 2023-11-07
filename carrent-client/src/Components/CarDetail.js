import React, { useEffect, useState } from 'react'
import './styles/carDetail.scss'
import star from '../assets/ic-actions-star.svg'
import { Link, useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { BiMessageAdd } from 'react-icons/bi'
import './styles/reviews.scss'
import { RiEdit2Fill } from 'react-icons/ri'
import { MdDelete } from 'react-icons/md'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function Star({ filled }) {
  return (
    <span className={`star ${filled ? 'filled' : ''}`} style={{ content: `url(${star})` }}>1</span>
  );
}

const CarDetail = () => {

  const { carId } = useParams();

  const { data: car, isLoading, error } = useFetch(`http://localhost:8000/api/v1/cars/car/${carId}`)

  const carPhotoUrl = (id) =>
    `http://localhost:8000/api/v1/cars/car/${carId}/photo`;


  const [popup, setPopup] = useState(false)

  const [review, setReview] = useState('')
  const [rating, setRating] = useState()
  const [modalTitle, setModalTitle] = useState('')
  const [reviewId, setReviewId] = useState()

  const [showD, setShowD] = useState(false);
  const deleteClick = (id) => {
    setReviewId(id)
    setShowD(true)
  }

  const handleReviewChange = (value) => {
    setReview(value)
  }

  const handleRatingChange = (value) => {
    setRating(value)
  }

  const addClick = () => {
    setModalTitle('Add')
    setReview('')
    setRating('')
    setPopup(true)
  }

  const editClick = (r) => {
    setModalTitle("Update")
    setReviewId(r.reviewId)
    setReview(r.message)
    setRating(r.rating)
    setPopup(true);
  }

  const stars = Array.from({ length: Number(rating) }, (_, index) => (
    <Star key={index} filled={true} />
  ));

  const accessToken = localStorage.getItem("access_token");
  const user = JSON.parse(localStorage.getItem('user'));

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReview = { message: review, rating: rating, userId: user.id };

    fetch(`http://localhost:8000/api/v1/car-reviews/car/${carId}/add-review`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(
        { message: review, rating: rating, userId: user.id }
      )
    }).then(res => {
      if (!res.ok) {
        console.log(res)
        throw Error('Error');
      }
      return res.json()
    })
      .then(() => {
        console.log("Added")
      }).catch(err => {
        console.log(err)
      })

    window.location.reload();
  }

  const handleEdit = (e) => {
    e.preventDefault();

    const editReview = { message: review, rating: rating, userId: user.id };

    fetch(`http://localhost:8000/api/v1/car-reviews/car/${reviewId}/edit-review`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(editReview)
    }).then(res => {
      if (!res.ok) {
        throw Error('Error');
      }
      return res.json()
    })
      .then(() => {
        console.log("Updated")
      }).catch(err => {
        console.log(err)
      })

    window.location.reload();
  }

  const handleDelete = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8000/api/v1/car-reviews/delete-review/` + reviewId, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Something went wrong')
        }
      })
      .then(() => {
        console.log("Deleted")
      }).catch(err => {
        console.log(err)
      })

    window.location.reload();
  }

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
                {Array(car?.carReviews.rating).fill().map((_, index) => (
                  <div className="star" key={index} style={{ content: `url(${star})` }}></div>
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
              <div className='reviews-title-right'>
                <h2>Reviews</h2>
                <div className="reviews-number">{car?.carReviews.length}</div>
              </div>
              <div className="plus-icon" onClick={addClick}><BiMessageAdd /></div>
            </div>

            <div className="review-list">

              {popup ? (
                <div className="add-review-modal">
                  <div className="message">
                    <label>Review</label><br />
                    <input type="text" className='review-input' value={review} onChange={(e) => handleReviewChange(e.target.value)} placeholder={modalTitle == 'Updatesbb' ? review : 'Enter your riview'} />

                    <div className="star-rating">
                      <div className='stars'>{stars}</div>

                      <select className='form-select' value={rating} onChange={(e) => handleRatingChange(e.target.value)}>
                        <option >{modalTitle === 'Upadte' ? `${rating} ★` : 'Choose an option'}</option>
                        <option value={1}>1★</option>
                        <option value={2}>2★</option>
                        <option value={3}>3★</option>
                        <option value={4}>4★</option>
                        <option value={5}>5★</option>
                      </select>
                    </div>

                    <div className="buttons">
                      <div className="caccel"><button className='btn btn-secondary' onClick={() => setPopup(false)}>Cancel</button></div>
                      <div className="send"><button className='btn btn-primary'
                        onClick={modalTitle === 'Update' ? handleEdit : handleSubmit}>{modalTitle === 'Update' ? 'Update' : 'Send'}</button></div>
                    </div>
                  </div>
                </div>
              ) : null}

              <Modal show={showD} onHide={() => setShowD(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Delete Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete?</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShowD(false)}>
                    Cancel
                  </Button>
                  <Button variant="danger" onClick={handleDelete}>
                    Delete
                  </Button>
                </Modal.Footer>
              </Modal>

              {car?.carReviews.toReversed().map((r, index) => (
                <div className="review" key={r.reviewId}>
                  <div className="user-info">
                    <div className="user">
                      <div className="image"></div>
                      <div className="name">{r.fromUser}</div>
                    </div>
                    <div className="date-rating">
                      <div>
                        <div className="date">{r.dateSubmitted}</div>
                        <div className="rating">
                          {Array(r.rating).fill().map((_) => (
                            <div className="star" style={{ content: `url(${star})` }}></div>
                          ))}
                        </div>
                      </div>
                      {!r.fromUser.includes(user.username) ? <></> : (
                        <div className="actions-buttons">
                          <div className="edit" onClick={() => editClick(r)}><RiEdit2Fill /></div>
                          <div className="delete" onClick={() => deleteClick(r.reviewId)}><MdDelete /></div>
                        </div>
                      )}
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