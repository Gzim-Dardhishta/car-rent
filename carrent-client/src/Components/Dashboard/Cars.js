import React, { useEffect, useState } from 'react'
import './styles/cars.scss'
import gclass from '../../assets/g.jpg'
import SideBarDashboard from './SideBarDashboard'
import { AiOutlineMenu } from 'react-icons/ai'
import useFetch from '../../hooks/useFetch'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiOutlinePlus } from 'react-icons/ai'
import { BsCheck2Circle } from 'react-icons/bs'
import { MdErrorOutline } from 'react-icons/md'
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const Cars = () => {
    const [clicked, setClicked] = useState(true)
    const [modalTitle, setModalTitle] = useState('');
    const [carId, setCarId] = useState()

    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [modelYear, setModelYear] = useState();
    const [color, setColor] = useState("");
    const [capacity, setCapacity] = useState();
    const [plateNumber, setPlateNumber] = useState();
    const [chassisNumber, setChassisNumber] = useState();
    const [available, setAvailable] = useState(false);
    const [engineType, setEngineType] = useState("");
    const [description, setDescription] = useState("");
    const [steering, setSteering] = useState("");
    const [gasoline, setGasoline] = useState();
    const [price, setPrice] = useState();


    const [clientMessage, setClientMessage] = useState('');

    const [showM, setShowM] = useState(false);
    const [messageIcon, setMessageIcon] = useState(<BsCheck2Circle />)

    const showMessageBox = (message) => {
        setClientMessage(message)
        setShowM(true)
        handleClose()
    }

    const closePopup = () => {
        setShowM(false)
        window.location.reload()
    }

    const handleBrandChange = (value) => {
        setBrand(value);
    }

    const handleModelChange = (value) => {
        setModel(value);
    };

    const handleModelYearChange = (value) => {
        setModelYear(value);
    };

    const handleColorChange = (value) => {
        setColor(value);
    };

    const handleCapacityChange = (value) => {
        setCapacity(value);
    };

    const handlePlateNumberChange = (value) => {
        setPlateNumber(value);
    };

    const handleChassisNumberChange = (value) => {
        setChassisNumber(value);
    };

    const handleAvailableChange = (value) => {
        setAvailable(value);
    };

    const handleEngineTypeChange = (value) => {
        setEngineType(value);
    };

    const handleDescriptionChange = (value) => {
        setDescription(value);
    };

    const handleSteeringChange = (value) => {
        setSteering(value);
    };

    const handleGasolineChange = (value) => {
        setGasoline(value);
    };

    const handlePriceChange = (value) => {
        setPrice(value);
    };

    const [show, setShow] = useState(false);
    const [showD, setShowD] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
    };

    const handleCloseD = () => setShowD(false);
    const handleShowD = (ID) => {
        setCarId(ID)
        setShowD(true)
    };

    const addClick = () => {
        setModalTitle('Add new Car')
        handleShow()
    }

    const editClick = (car) => {
        setModalTitle("Update Car")
        setCarId(car.id)
        setBrand(car.brand)
        setModel(car.model)
        setModelYear(car.modeYear)
        setColor(car.color)
        setCapacity(car.capacity)
        setPlateNumber(car.plateNumber)
        setChassisNumber(car.chassisNumber)
        setAvailable(car.available)
        setEngineType(car.engineType)
        setDescription(car.description)
        setSteering(car.steering)
        setGasoline(car.gasoline)
        setPrice(car.price)
        handleShow()
    }

    const { data: cars, isLoading, error } = useFetch('http://localhost:8000/api/v1/cars/all-cars')

    const carPhotoUrl = (id) =>
        `http://localhost:8000/api/v1/cars/car/${id}/photo`;

    const accessToken = localStorage.getItem("access_token");

    const handleSubmit = (e) => {
        e.preventDefault();

        const addCar = {
            brand: brand,
            model: model,
            modelYear: modelYear,
            color: color,
            capacity: capacity,
            plateNumber: plateNumber,
            chassisNumber: chassisNumber,
            available: available,
            engineType: engineType,
            description: description,
            steering: steering,
            gasoline: gasoline,
            price: price
        };

        fetch('http://localhost:8000/api/v1/cars/add-car', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify(addCar)
        }).then(res => {
            if (!res.ok) {
                throw Error('Error');
            }
            return res.json()
        })
            .then(() => {
                console.log("Added")
                showMessageBox('Car Added')
            }).catch(err => {
                console.log(err)
                setMessageIcon(<MdErrorOutline />)
                showMessageBox('Error!! Car was not added')
            })
    }
    const handleEdit = (e) => {
        e.preventDefault();

        fetch('http://localhost:8000/api/v1/cars/edit-car/' + carId, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            },
            body: JSON.stringify(
                {
                    brand: brand,
                    model: model,
                    modelYear: modelYear,
                    color: color,
                    capacity: capacity,
                    plateNumber: plateNumber,
                    chassisNumber: chassisNumber,
                    available: available,
                    engineType: engineType,
                    description: description,
                    steering: steering,
                    gasoline: gasoline,
                    price: price
                }
            )
        }).then(res => {
            if (!res.ok) {
                throw Error('Error');
            }
            return res.json()
        })
            .then(() => {
                console.log("Updated")
                showMessageBox('Car Updated')
            }).catch(err => {
                console.log(err)
                setMessageIcon(<MdErrorOutline />)
                showMessageBox('Error!! Car was not updated')
            })
    }

    const onDrop = useCallback(acceptedFiles => {
        // const formData = new FormData();
        // formData.append("photo", acceptedFiles[0])

        // fetch(`http://localhost:8000/api/v1/cars/car/${carId}/add-photo`, {
        //     method: "POST",
        //     headers: {
        //         Authorization: `Bearer ${accessToken}`,
        //         'Content-Type': 'multipart/form-data',
        //     },
        //     body: formData
        // }).then(() => {
        //     showMessageBox('Car Photo Added')
        // }).catch(() => {
        //     setMessageIcon(<MdErrorOutline />)
        //     showMessageBox('Error!! Car photo not added')
        // })
    }, [])
    const { getRootProps, getInputProps } = useDropzone({ onDrop })


    const handleDelete = (e) => {
        e.preventDefault();

        fetch('http://localhost:8000/api/v1/cars/delete-car/' + carId, {
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
                showMessageBox('Car Deleted')
            }).catch(err => {
                console.log(err)
                setShowD(false)
                setMessageIcon(<MdErrorOutline />)
                showMessageBox('Error!! Car was not deleted')
            })
    }

    return (
        <div className='cars-dashboard'>
            {clicked ? (
                <SideBarDashboard />
            ) : null}


            {/* Modal for Create and Update */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* {carId}
                    <div className="car-photo" {...getRootProps()}>
                        <input {...getInputProps()} />br
                        <p>Drop the picture here ...</p>
                        <p>Drag 'n' drop picture here, or click to select picture</p>
                    </div> */}
                    <form >
                        <div className="holiday-type">
                            <small>Car Brand: </small>
                            <input type="text" onChange={(e) => handleBrandChange(e.target.value)} value={brand} className="form-control" placeholder={modalTitle == 'Update Car' ? brand : "Enter car brand"} />
                        </div>

                        <div className="start-date">
                            <small>Car Model: </small>
                            <input type="text" onChange={(e) => handleModelChange(e.target.value)} value={model} className="form-control" placeholder={modalTitle == 'Update Car' ? model : "Enter car model"} />
                        </div>
                        <div className="aend-date">
                            <small>Car Model Year: </small>
                            <input type="number" onChange={(e) => handleModelYearChange(e.target.value)} value={modelYear} className="form-control" placeholder={modalTitle == 'Update Car' ? modelYear : "Enter model year"} />
                        </div>
                        <div className="aend-date">
                            <small>Car Color: </small>
                            <input type="text" onChange={(e) => handleColorChange(e.target.value)} value={color} className="form-control" placeholder={modalTitle == 'Update Car' ? color : "Enter car color"} />
                        </div>
                        <div>
                            <small>Car Capacity: </small>
                            <input type="number" onChange={(e) => handleCapacityChange(e.target.value)} value={capacity} className="form-control" placeholder={modalTitle == 'Update Car' ? capacity : "Enter car capacity"} />
                        </div>
                        <div>
                            <small>Car Plate Number: </small>
                            <input type="number" onChange={(e) => handlePlateNumberChange(e.target.value)} value={plateNumber} className="form-control" placeholder={modalTitle == 'Update Car' ? plateNumber : "Enter car plate number"} />
                        </div>
                        <div>
                            <small>Car Chassis Number: </small>
                            <input type="number" onChange={(e) => handleChassisNumberChange(e.target.value)} value={chassisNumber} className="form-control" placeholder={modalTitle == 'Update Car' ? chassisNumber : "Enter car chassis number"} />
                        </div>
                        <div>
                            <small>Available: </small><br />
                            {/* <input onChange={(e) => handleAvailableChange(e.target.value)} value={available} className="form-control" placeholder={modalTitle == 'Update Car' ? available : "Enter true or false"} /> */}
                            <select className='form-select' onChange={(e) => handleAvailableChange(e.target.value)}>
                                <option >Choose an option</option>
                                <option value={true}>True</option>
                                <option value={false}>False</option>
                            </select>
                        </div>
                        <div>
                            <small>Car Engine Type: </small>
                            <input type="text" onChange={(e) => handleEngineTypeChange(e.target.value)} value={engineType} className="form-control" placeholder={modalTitle == 'Update Car' ? engineType : "Enter car engine type"} />
                        </div>
                        <div>
                            <small>Car Description: </small>
                            <input type="text" onChange={(e) => handleDescriptionChange(e.target.value)} value={description} className="form-control" placeholder={modalTitle == 'Update Car' ? description : "Enter car description"} />
                        </div>
                        <div>
                            <small>Car Steering: </small>
                            <input type="text" onChange={(e) => handleSteeringChange(e.target.value)} value={steering} className="form-control" placeholder={modalTitle == 'Update Car' ? steering : "Enter car steering"} />
                        </div>
                        <div>
                            <small>Car Gasoline: </small>
                            <input type="number" onChange={(e) => handleGasolineChange(e.target.value)} value={gasoline} className="form-control" placeholder={modalTitle == 'Update Car' ? gasoline : "Enter car gasoline"} />
                        </div>
                        <div>
                            <small>Car Price: </small>
                            <input type="number" onChange={(e) => handlePriceChange(e.target.value)} value={price} className="form-control" placeholder={modalTitle == 'Update Car' ? price : "Enter car price"} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    {modalTitle === 'Add new Car' ? <Button variant="primary" onClick={handleSubmit}>
                        Add Car
                    </Button> : <Button variant="primary" onClick={handleEdit}>
                        Update Car
                    </Button>}
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


            <div className={clicked ? "cars-s" : "cars-full"}>
                <div className='dashboard-top'>
                    <div className="menu">
                        <AiOutlineMenu className='sidebar-menu' onClick={() => setClicked((prevActiveMenu) => !prevActiveMenu)} />
                    </div>
                </div>

                <div className="cars-table">

                    <div className="cars-table-top">
                        <h1 className='cars-title'>Cars</h1>
                        <button className='add-button' onClick={() => {
                            setModalTitle('Add new Car');
                            handleShow()
                        }}><AiOutlinePlus /> Add new Car</button>
                    </div>

                    {error && <div>{error}</div>}
                    {isLoading && <div>Loading...</div>}

                    {cars &&
                        <table className='c-table'>
                            <tr>
                                <th>Id</th>
                                <th>Image</th>
                                <th>Brand</th>
                                <th>Model</th>
                                <th>Mode Year</th>
                                <th>Color</th>
                                <th>Capacity</th>
                                <th>Plate Number</th>
                                <th>Chassis Number</th>
                                <th>Available</th>
                                <th>Engine Type</th>
                                <th>Description</th>
                                <th>Steering</th>
                                <th>Gasoline</th>
                                <th>Price</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                            {cars.map(c => (
                                <tr key={c.id}>
                                    <td>{c.id}</td>
                                    {/* `data:image/jpeg;base64, ${c.photo}` */}
                                    <td><img src={carPhotoUrl(c.id)} alt="" width={100} height={70} /></td>
                                    <td>{c.brand}</td>
                                    <td>{c.model}</td>
                                    <td>{c.modeYear}</td>
                                    <td>{c.color}</td>
                                    <td>{c.capacity}</td>
                                    <td>{c.plateNumber}</td>
                                    <td>{c.chassisNumber}</td>
                                    <td className='status-cell'>
                                        {c.available}
                                        <div className={`${c.available ? 'text-primary' : 'text-danger'} status`}>{c.available ? "true" : "false"}</div>
                                    </td>
                                    <td>{c.engineType}</td>
                                    <td>{c.description}</td>
                                    <td>{c.steering}</td>
                                    <td>{c.gasoline}</td>
                                    <td>{c.price}</td>
                                    <td><button className="btn btn-primary" onClick={() => editClick(c)}>Edit</button></td>
                                    <td><button className="btn btn-danger" onClick={(e) => handleShowD(c.id)}>Delete</button></td>
                                </tr>
                            ))}
                        </table>
                    }
                </div>
            </div>
        </div>
    )
}
export default Cars