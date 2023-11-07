import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import { AiOutlineMenu } from 'react-icons/ai'
import './styles/profile.scss'
import useFetch from '../../../hooks/useFetch'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BsCheck2Circle } from 'react-icons/bs'
import { MdErrorOutline } from 'react-icons/md'

const Profile = () => {

  const userId = JSON.parse(localStorage.getItem("user"));

  const { data: user, isLoading, error } = useFetch(`http://localhost:8000/api/v1/users/user/${userId.id}`)

  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState()
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [zipCode, setZipCode] = useState()
  const [personalId, setPersonalId] = useState()
  const [licenceId, setLicenceId] = useState()


  const handleNameChange = (value) => {
    setName(value)
  }

  const handleLastNameChange = (value) => {
    setLastName(value)
  }

  const handleEmailChange = (value) => {
    setEmail(value)
  }

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value)
  }

  const handleCountryChange = (value) => {
    setCountry(value)
  }

  const handleCityChange = (value) => {
    setCity(value)
  }

  const handleZipCodeChange = (value) => {
    setZipCode(value)
  }

  const handlePersonalIdChange = (value) => {
    setPersonalId(value)
  }

  const handleLicenceIdChange = (value) => {
    setLicenceId(value)
  }

  const loggedUser = JSON.parse(localStorage.getItem("username"));
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setName(user.name)
    setLastName(user.lastName)
    setPersonalId(user.identityId)
    setLicenceId(user.licenceId)
    setEmail(user.email)
    setPhoneNumber(user.phoneNumber)
    setCountry(user.country)
    setCity(user.city)
    setZipCode(user.zipCode)
    setShow(true)
  };

  const [clientMessage, setClientMessage] = useState('');

  const [showM, setShowM] = useState(false);
  const [messageIcon, setMessageIcon] = useState(<BsCheck2Circle />)

  const closePopup = () => {
    setShowM(false)
    window.location.reload()
  }

  const showMessageBox = (message) => {
    setClientMessage(message)
    setShowM(true)
    handleClose()
  }

  const accessToken = localStorage.getItem("access_token");

  const handleEdit = (e) => {
    e.preventDefault();

    const editUser = {
      name: name,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      identityId: personalId,
      licenceId: licenceId,
      country: country,
      city: city,
      zipCode: zipCode
    }

    fetch('http://localhost:8000/api/v1/users/user/' + userId.id, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      },
      body: JSON.stringify(editUser)
    }).then(res => {
      if (!res.ok) {
        throw Error('Error');
      }
      return res.json()
    })
      .then(() => {
        console.log("Updated")
        showMessageBox('User Updated')
      }).catch(err => {
        console.log(err)
        setMessageIcon(<MdErrorOutline />)
        showMessageBox('Error!! User was not updated')
      })
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='profile'>
      {isSidebarOpen ? (
        <Sidebar />
      ) : null}

      <div className={isSidebarOpen ? 'user-profile-s' : 'user-profile-full'}>
        <div className='dashboard-top'>
          <div className='dashboard-topr'>
            <div className="menu">
              <AiOutlineMenu className='sidebar-menu' onClick={() => setSidebarOpen((prevActiveMenu) => !prevActiveMenu)} />
            </div>
            <h4 className='dashboard-title'>User Profile</h4>
          </div>

          <div className="username-display">{loggedUser.name}</div>
        </div>

        <div>
          <div className='user-infos'>
            <div className="profile-pricture">
              <img src={`http://localhost:8000/api/v1/users/user/${userId.id}/profile-picture`} width={200} alt="" />
            </div>

            <div className="infos">
              <div className="full-name">
                <div className="name">{user?.name}</div>
                <div className="lastname">{user?.lastName}</div>
                <div className="username">{user?.username}</div>
              </div>

              <div className="contact">
                <div className='t'>Contact</div>
                <div className="c-row">
                  <div className="emails">
                    <span>Email</span>
                    <div className="email">{user?.email}</div>
                  </div>
                  <div className="p-numbers">
                    <span>Phone Number:</span>
                    <div className="phone-number">0{user?.phoneNumber}</div>
                  </div>
                </div>
              </div>

              <hr />

              <div className="document-ids">
                <div className='t'>Document Ids</div>
                <div className="d-row">
                  <div className="p-id">
                    <span>Personal ID</span>
                    <div className="personal-id">{user?.identityId}</div>
                  </div>
                  <div className="l-id">
                    <span>Licance ID</span>
                    <div className="licence-id">{user?.licenceId}</div>
                  </div>
                </div>
              </div>

              <hr />

              <div className="address">
                <span className='t'>Address</span>
                <div className="a-row">
                  <div className="country">{user?.country}</div>
                  <div className="city"> {user?.city}</div>
                  <div className="zip-code">{user?.zipCode}</div>
                </div>
              </div>

              <hr />
            </div>
          </div>
          <div className="edit-profile btn btn-primary" onClick={handleShow}>Edit</div>
        </div>
      </div>

      {showM ? <div className="backdrop" onClick={closePopup}></div> : null}

      {showM ?
        <div className="box-message">
          <div className="message"><span>{messageIcon}</span>{clientMessage}</div>
          <div className="close-button" onClick={closePopup}>Close</div>
        </div> : null
      }

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form >
            <div>
              <small>Name: </small>
              <input type="text" onChange={(e) => handleNameChange(e.target.value)} value={name} className="form-control" placeholder={name} />
            </div>
            <div>
              <small>Last Name: </small>
              <input type="text" onChange={(e) => handleLastNameChange(e.target.value)} value={lastName} className="form-control" placeholder={lastName} />
            </div>
            <div>
              <small>Email: </small>
              <input type="text" onChange={(e) => handleEmailChange(e.target.value)} value={email} className="form-control" placeholder={email} />
            </div>
            <div>
              <small>Phone number: </small>
              <input type="number" onChange={(e) => handlePhoneNumberChange(e.target.value)} value={phoneNumber} className="form-control" placeholder={phoneNumber} />
            </div>
            <div>
              <small>PersonalId: </small>
              <input type="number" onChange={(e) => handlePersonalIdChange(e.target.value)} value={personalId} className="form-control" placeholder={personalId} />
            </div>
            <div>
              <small>LicenceId: </small>
              <input type="number" onChange={(e) => handleLicenceIdChange(e.target.value)} value={licenceId} className="form-control" placeholder={licenceId} />
            </div>
            <div>
              <small>Country: </small>
              <input type="text" onChange={(e) => handleCountryChange(e.target.value)} value={country} className="form-control" placeholder={country} />
            </div>
            <div>
              <small>City: </small>
              <input type="text" onChange={(e) => handleCityChange(e.target.value)} value={city} className="form-control" placeholder={city} />
            </div>
            <div>
              <small>ZipCode: </small>
              <input type="number" onChange={(e) => handleZipCodeChange(e.target.value)} value={zipCode} className="form-control" placeholder={zipCode} />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleEdit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Profile