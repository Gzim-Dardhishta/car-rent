import { React, useState } from 'react'
import SideBarDashboard from './SideBarDashboard'
import { AiOutlineMenu } from 'react-icons/ai'
import './styles/orders.scss'
import gclass from '../../assets/g.jpg'
import useFetch from '../../hooks/useFetch'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MdErrorOutline } from 'react-icons/md'
import { BsCheck2Circle } from 'react-icons/bs'

const Orders = () => {

    const [clicked, setClicked] = useState(true)
    const [orderId, setOrderId] = useState()

    const [showD, setShowD] = useState(false);

    const [clientMessage, setClientMessage] = useState('');

    const [showM, setShowM] = useState(false);
    const [messageIcon, setMessageIcon] = useState(<BsCheck2Circle />)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const showMessageBox = (message) => {
        setClientMessage(message)
        setShowM(true)
        handleClose()
    }

    const closePopup = () => {
        setShowM(false)
        window.location.reload()
    }

    const handleCloseD = () => setShowD(false);
    const handleShowD = (ID) => {
        setOrderId(ID)
        setShowD(true)
    };

    const { data: orders, isLoading, error } = useFetch('http://localhost:8000/api/v1/orders/all-orders')

    const accessToken = localStorage.getItem("access_token");

    const handleDelete = (e) => {
        e.preventDefault();

        fetch('http://localhost:8000/api/v1/orders/delete-order/' + orderId, {
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
                showMessageBox('Order Deleted')
            }).catch(err => {
                console.log(err)
                setShowD(false)
                setMessageIcon(<MdErrorOutline />)
                showMessageBox('Error!! Order was not deleted')
            })
    }

    return (
        <div className='orders-dashboard'>
            {clicked ? (
                <SideBarDashboard />
            ) : null}
            <div className={clicked ? "orders-s" : "orders-full"}>
                <div className='dashboard-top'>
                    <div className="menu">
                        <AiOutlineMenu className='sidebar-menu' onClick={() => setClicked((prevActiveMenu) => !prevActiveMenu)} />
                    </div>
                </div>

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

                <div className="order-table">

                    <h1 className='order-title'>Orders</h1>

                    {error && <div>{error}</div>}
                    {isLoading && <div>Loading...</div>}

                    {orders &&
                        <table className='o-table'>
                            <tr>
                                <th>Order Id</th>
                                <th>Item</th>
                                <th>Customer Name</th>
                                <th>Customer LicenceID</th>
                                <th>Customer Phone Number</th>
                                <th>Order Date</th>
                                <th>PickUp Date</th>
                                <th>Return Date</th>
                                <th>Total Amount</th>
                                <th>Order Status</th>
                                <th>Delete</th>
                            </tr>
                            {orders.map(o => (
                                <tr>
                                    <td>{o.id}</td>
                                    <td>Image</td>
                                    <td>{o.clientName}</td>
                                    <td>{o.clientLicenceId}</td>
                                    <td>{o.clientPhoneNumber}</td>
                                    <td>{o.orderDate}</td>
                                    <td>{o.pickupDate}</td>
                                    <td>{o.returnDate}</td>
                                    <td>{o.totalAmount}</td>
                                    <td className='status-cell'><div className="status">{o.orderStatus}</div></td>
                                    <td><button className="btn btn-danger" onClick={(e) => handleShowD(o.id)}>Delete</button></td>
                                </tr>
                            ))}

                        </table>
                    }
                </div>
            </div>
        </div>
    )
}

export default Orders