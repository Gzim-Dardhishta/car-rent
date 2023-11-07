import React, { useState, useEffect } from 'react'
import { AiOutlineMenu, AiOutlinePlus } from 'react-icons/ai'
import SideBarDashborad from './SideBarDashboard'
import './styles/employees.scss'
import useFetch from '../../hooks/useFetch'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MdErrorOutline } from 'react-icons/md'
import { BsCheck2Circle } from 'react-icons/bs'

const Employees = () => {

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [identityId, setIdentityId] = useState();
  const [licenceId, setLicenceId] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState();

  const handleNameChange = (value) => {
    setName(value);
  };

  const handleLastNameChange = (value) => {
    setLastName(value);
  };

  const handleUsernameChange = (value) => {
    setUsername(value);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleIdentityIdChange = (value) => {
    setIdentityId(value);
  };

  const handleLicenceIdChange = (value) => {
    setLicenceId(value);
  };

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
  };

  const handleCountryChange = (value) => {
    setCountry(value);
  };

  const handleCityChange = (value) => {
    setCity(value);
  };

  const handleZipCodeChange = (value) => {
    setZipCode(value);
  };

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const loggedUser = JSON.parse(localStorage.getItem("username"));


  const [employeeId, setEmployeeId] = useState()

  const [showM, setShowM] = useState(false);
  const [messageIcon, setMessageIcon] = useState(<BsCheck2Circle />)
  const [showD, setShowD] = useState(false);
  const [clientMessage, setClientMessage] = useState('');

  const handleCloseD = () => setShowD(false);
  const handleShowD = (ID) => {
    setEmployeeId(ID)
    setShowD(true)
  };

  const showMessageBox = (message) => {
    setClientMessage(message)
    setShowM(true)
  }

  const closePopup = () => {
    setShowM(false)
    window.location.reload()
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

  const { data: employees, isLoading, error } = useFetch('http://localhost:8000/api/v1/users/employees')

  const accessToken = localStorage.getItem("access_token");

  const [customerId, setCustomerId] = useState()

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
  };

  const [modalTitle, setModalTitle] = useState('');

  const handleSubmitEmployee = (e) => {
    e.preventDefault();

    const addCustomer = {
      name: name,
      lastName: lastName,
      username: username,
      email: email,
      password: password,
      identityId: identityId,
      licenceId: licenceId,
      phoneNumber: phoneNumber,
      country: country,
      city: country,
      zipCode: zipCode
    };

    fetch('http://localhost:8000/api/v1/users/add-employee', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(addCustomer)
    }).then(res => {
      if (!res.ok) {
        throw Error('Error');
      }
      return res.json()
    })
      .then(() => {
        console.log("Added")
        showMessageBox('Employee Added')
      }).catch(err => {
        console.log(err)
        setMessageIcon(<MdErrorOutline />)
        showMessageBox('Error!! Employee was not added')
      })
  }

  const handleUpdateUser = () => {

  }


  const handleDelete = (e) => {
    e.preventDefault();

    fetch('http://localhost:8000/api/v1/users/delete-user/' + employeeId, {
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
        setShowD(false)
        showMessageBox('Employee Deleted')
      }).catch(err => {
        console.log(err)
        setShowD(false)
        setMessageIcon(<MdErrorOutline />)
        showMessageBox('Error!! Employee was not deleted')
      })
  }

  const employeePhotoUrl = (id) =>
    `http://localhost:8000/api/v1/users/user/${id}/profile-picture`;



  return (
    <div className='employees-dashboard'>
      {isSidebarOpen ? (
        <SideBarDashborad />
      ) : null}

      <div className={isSidebarOpen ? "employees-s" : "employees-full"}>
        <div className='dashboard-top'>
          <div className='dashboard-topr'>
            <div className="menu">
              <AiOutlineMenu className='sidebar-menu' onClick={() => setSidebarOpen((prevActiveMenu) => !prevActiveMenu)} />
            </div>
          </div>

          <div className="username-display">{loggedUser.name}</div>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <small>Name: </small>
                <input
                  type="text"
                  onChange={(e) => handleNameChange(e.target.value)}
                  value={name}
                  className="form-control"
                  placeholder={modalTitle === 'Update User' ? name : 'Enter name'}
                />
              </div>

              <div className="form-group">
                <small>Last Name: </small>
                <input
                  type="text"
                  onChange={(e) => handleLastNameChange(e.target.value)}
                  value={lastName}
                  className="form-control"
                  placeholder={modalTitle === 'Update User' ? lastName : 'Enter last name'}
                />
              </div>

              <div className="form-group">
                <small>Username: </small>
                <input
                  type="text"
                  onChange={(e) => handleUsernameChange(e.target.value)}
                  value={username}
                  className="form-control"
                  placeholder={modalTitle === 'Update User' ? username : 'Enter username'}
                />
              </div>

              <div className="form-group">
                <small>Email: </small>
                <input
                  type="email"
                  onChange={(e) => handleEmailChange(e.target.value)}
                  value={email}
                  className="form-control"
                  placeholder={modalTitle === 'Update User' ? email : 'Enter email'}
                />
              </div>

              <div className="form-group">
                <small>Password: </small>
                <input
                  type="password"
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  value={password}
                  className="form-control"
                  placeholder={modalTitle === 'Update User' ? '******' : 'Enter password'}
                />
              </div>

              <div className="form-group">
                <small>Identity ID: </small>
                <input
                  type="text"
                  onChange={(e) => handleIdentityIdChange(e.target.value)}
                  value={identityId}
                  className="form-control"
                  placeholder={modalTitle === 'Update User' ? identityId : 'Enter identity ID'}
                />
              </div>

              <div className="form-group">
                <small>Licence ID: </small>
                <input
                  type="text"
                  onChange={(e) => handleLicenceIdChange(e.target.value)}
                  value={licenceId}
                  className="form-control"
                  placeholder={modalTitle === 'Update User' ? licenceId : 'Enter licence ID'}
                />
              </div>

              <div className="form-group">
                <small>Phone Number: </small>
                <input
                  type="text"
                  onChange={(e) => handlePhoneNumberChange(e.target.value)}
                  value={phoneNumber}
                  className="form-control"
                  placeholder={modalTitle === 'Update User' ? phoneNumber : 'Enter phone number'}
                />
              </div>

              <div className="form-group">
                <small>Country: </small>
                <input
                  type="text"
                  onChange={(e) => handleCountryChange(e.target.value)}
                  value={country}
                  className="form-control"
                  placeholder={modalTitle === 'Update User' ? country : 'Enter country'}
                />
              </div>

              <div className="form-group">
                <small>City: </small>
                <input
                  type="text"
                  onChange={(e) => handleCityChange(e.target.value)}
                  value={city}
                  className="form-control"
                  placeholder={modalTitle === 'Update User' ? city : 'Enter city'}
                />
              </div>

              <div className="form-group">
                <small>Zip Code: </small>
                <input
                  type="text"
                  onChange={(e) => handleZipCodeChange(e.target.value)}
                  value={zipCode}
                  className="form-control"
                  placeholder={modalTitle === 'Update User' ? zipCode : 'Enter zip code'}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            {modalTitle === 'Add new User' ? (
              <Button variant="primary" onClick={handleSubmitEmployee}>
                Add User
              </Button>
            ) : (
              <Button variant="primary" onClick={handleUpdateUser}>
                Update User
              </Button>
            )}
          </Modal.Footer>
        </Modal>

        <Modal show={showD} onHide={handleCloseD}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseD}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        {showM ? <div className="backdrop" onClick={closePopup}></div> : null}

        {showM ?
          <div className="box-message">
            <div className="message"><span>{messageIcon}</span>{clientMessage}</div>
            <div className="close-button" onClick={closePopup}>Close</div>
          </div> : null
        }


        <div className="employees-table">

          <div className="flex justify-between">
            <h1 className='cars-title'>Cars</h1>
            <button className='flex items-center p-2 px-3 rounded-3xl bg-blue-700 text-white gap-3' onClick={() => {
              setModalTitle('Add new User');
              handleShow()
            }}><AiOutlinePlus /> Add new Employee</button>
          </div>

          {error && <div>{error}</div>}
          {isLoading && <div>Loading...</div>}

          {employees &&
            <table className='e-table'>
              <tr>
                <th>Id</th>
                <th>Profile Picture</th>
                <th>Full Name</th>
                <th>UserName</th>
                <th>Email</th>
                <th>Identity ID</th>
                <th>Licence ID</th>
                <th>Phone Number</th>
                <th>Country</th>
                <th>City</th>
                <th>Zip Code</th>
                <th>Delete</th>
              </tr>
              {employees.map(e => (
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td><img src={employeePhotoUrl(e.id)} width={100} height={70} alt="" /></td>
                  <td>{e.name} {e.lastName}</td>
                  <td>{e.username}</td>
                  <td>{e.email}</td>
                  <td>{e.identityId}</td>
                  <td>{e.licenceId}</td>
                  <td>{e.phoneNumber}</td>
                  <td>{e.country}</td>
                  <td>{e.city}</td>
                  <td>{e.zipCode}</td>
                  <td><button className="btn btn-danger" onClick={() => handleShowD(e.id)}>Delete</button></td>
                </tr>
              ))}

            </table>
          }
        </div>
      </div>

    </div>
  )
}

export default Employees