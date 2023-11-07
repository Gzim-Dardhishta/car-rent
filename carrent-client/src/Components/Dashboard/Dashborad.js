import React, { useState, useEffect } from 'react'
import './styles/dashboard.scss'
import { AiOutlineMenu } from 'react-icons/ai'
import SideBarDashborad from './SideBarDashboard'
import useFetch from '../../hooks/useFetch'
import { BsPeople } from 'react-icons/bs'
import { BsBoxFill } from 'react-icons/bs'
import { FaCar } from 'react-icons/fa'
import { BsCurrencyDollar } from 'react-icons/bs'
import SparkLine from '../Charts/SparkLine'
import { SparklineAreaData } from '../../data/dummy'
import { GoPrimitiveDot } from "react-icons/go";
import Stacked from '../Charts/Stacked'
import Footer from './Footer'

const Dashborad = () => {

    const loggedUser = JSON.parse(localStorage.getItem("username"));
    const [isSidebarOpen, setSidebarOpen] = useState(true);

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

    const { data: orders } = useFetch('http://localhost:8000/api/v1/orders/all-orders')
    const { data: cars } = useFetch('http://localhost:8000/api/v1/cars/all-cars')
    const { data: customers } = useFetch('http://localhost:8000/api/v1/users/customers')
    const { data: employees } = useFetch('http://localhost:8000/api/v1/users/employees')
    const { data: bestClients } = useFetch('http://localhost:8000/api/v1/users/best-clients')

    const getAllEarnings = () => {
        let sum = 0
        orders?.forEach((e) => {
            sum += e.totalAmount
        })
        return sum
    }


    return (
        <div className='dashboard mt-20'>

            {isSidebarOpen ? (
                <SideBarDashborad />
            ) : null}

            <div className={isSidebarOpen ? "dashboard-s" : "dashboard-full"}>
                <div className='dashboard-top'>
                    <div className='dashboard-topr'>
                        <div className="menu">
                            <AiOutlineMenu className='sidebar-menu' onClick={() => setSidebarOpen((prevActiveMenu) => !prevActiveMenu)} />
                        </div>
                        <h1 className='dashboard-title'>Dashboard</h1>
                    </div>

                    <div className="username-display">{loggedUser.name}</div>

                </div>

                <div className="dashboard-body">
                    <div className="wrapper">
                        <div className="earnings">
                            <div className="e-top">
                                <div className="e-right">
                                    <h4>Earnings</h4>
                                    <div className="total-price">${getAllEarnings()}</div>
                                </div>
                                <div className="icon-left">
                                    <BsCurrencyDollar />
                                </div>
                            </div>
                            <div className="e-bottom">
                                Download
                            </div>
                        </div>

                        <div className="left-cards">
                            <div className="customers">
                                <div className="c-top">
                                    <div className="c-icon">
                                        <BsPeople />
                                    </div>
                                    <div className="c-number">{customers?.length}</div>
                                    <div className="c-name">Customers</div>
                                </div>
                            </div>

                            <div className="employees">
                                <div className="e-top">
                                    <div className="e-icon">
                                        <BsPeople />
                                    </div>
                                    <div className="e-number">{employees?.length}</div>
                                    <div className="e-name">Employees</div>
                                </div>
                            </div>

                            <div className="sales">
                                <div className="s-top">
                                    <div className="s-icon">
                                        <BsBoxFill />
                                    </div>
                                    <div className="s-number">{orders?.length}</div>
                                    <div className="s-name">Orders</div>
                                </div>
                            </div>

                            <div className="products">
                                <div className="s-top">
                                    <div className="s-icon">
                                        <FaCar />
                                    </div>
                                    <div className="s-number">{cars?.length}</div>
                                    <div className="s-name">Products</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-10 flex-wrap justify-center">
                        <div className="bg-white dark:text-black-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780">
                            <div className="flex justify-between">
                                {/* Revenue Updates */}
                                <p className="font-semibold text-xl">Revenue Updates</p>
                                <div className="flex items-center gap-4">
                                    {/* Expenses */}
                                    <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
                                        <span>
                                            <GoPrimitiveDot />
                                        </span>
                                        <span>Expense</span>
                                    </p>

                                    {/* Budget */}
                                    <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
                                        <span>
                                            <GoPrimitiveDot />
                                        </span>
                                        <span>Budget</span>
                                    </p>
                                </div>
                            </div>
                            <div className="mt-10 flex gap-10 flex-wrap justify-center">
                                <div className=" border-r-1 border-color m-4 pr-10">
                                    {/* Budget Info */}
                                    <div>
                                        <p>
                                            <span className="text-3xl font-semibold">$93,438</span>
                                            <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">
                                                23%
                                            </span>
                                        </p>
                                        <p className="text-gray-500 mt-1">Budget</p>
                                    </div>

                                    {/* Expense Info */}
                                    <div className="mt-8">
                                        <p className="text-3xl font-semibold">$48,487</p>

                                        <p className="text-gray-500 mt-1">Expense</p>
                                    </div>

                                    {/* Spark line chart */}
                                    <div className="mt-5">
                                        <SparkLine
                                            id="line-sparkLine"
                                            type="Line"
                                            height="80px"
                                            width="250px"
                                            data={SparklineAreaData}
                                        />
                                    </div>

                                </div>
                                {/* Stacked Chart */}
                                <div>
                                    <Stacked width="320px" height="360px" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="best-clients bg-white p-3 rounded-xl mb-3">
                        <h2 className="mb-5 text-lg font-bold">Best Clients</h2>

                        <div className='flex flex-wrap'>
                            {bestClients?.map((b) => (
                                <div className='flex gap-3 bg-gray-100 p-3 rounded-xl' key={b.id}>
                                    <div className="bg-[#2ebdd3] text-white px-3 py-2 rounded flex items-center flex-col">
                                        <div className="num-order">{b.numOrders}</div>
                                        <div>Orders</div>
                                    </div>
                                    <div className='flex flex-col justify-between p-1'>
                                        <div className="fullname">{b.name} {b.lastName}</div>
                                        <div className="username">{b.username}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashborad