import React, { useState, useEffect } from 'react'
import SideBarDashboard from './Sidebar'
import useFetch from '../../../hooks/useFetch';
import './styles/userOrders.scss'
import { AiOutlineMenu } from 'react-icons/ai'
import '../styles/orders.scss'

const UserOrders = () => {

    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [clicked, setClicked] = useState(true)

    const userId = JSON.parse(localStorage.getItem("user"));

    const { data: orders, isLoading, error } = useFetch(`http://localhost:8000/api/v1/users/user/${userId.id}/orders`)

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
        <div className='orders-dashboard'>
            {isSidebarOpen ? (
                <SideBarDashboard />
            ) : null}

            <div className={clicked ? "orders-s" : "orders-full"}>

                <div className='dashboard-top'>
                    <div className="menu">
                        <AiOutlineMenu className='sidebar-menu' onClick={() => setClicked((prevActiveMenu) => !prevActiveMenu)} />
                    </div>
                </div>

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
                                    <td><button className="btn btn-danger">Delete</button></td>
                                </tr>
                            ))}

                        </table>
                    }
                </div>
            </div>

        </div>
    )
}

export default UserOrders