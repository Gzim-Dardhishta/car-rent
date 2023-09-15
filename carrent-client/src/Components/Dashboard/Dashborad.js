import React, { useState, useEffect } from 'react'
import './styles/dashboard.scss'
import { AiOutlineMenu } from 'react-icons/ai'
import SideBarDashborad from './SideBarDashboard'

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


    return (
        <div className='dashboard'>

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

                <div className="wrapper">
                    <div className="earnings">
                        <div className="e-top">
                            <div className="e-right">
                                <h4>Earnings</h4>
                                <div className="total-price">$63,448.78</div>
                            </div>
                            <div className="icon-left">
                                $
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
                                    $
                                </div>
                                <div className="c-number">39,354 <span className='percente'>-4%</span></div>
                                <div className="c-name">Customers</div>
                            </div>
                        </div>

                        <div className="products">
                            <div className="p-top">
                                <div className="p-icon">
                                    $
                                </div>
                                <div className="p-number">39,354 <span className='percente'>-4%</span></div>
                                <div className="p-name">Customers</div>
                            </div>
                        </div>

                        <div className="sales">
                            <div className="s-top">
                                <div className="s-icon">
                                    $
                                </div>
                                <div className="s-number">39,354 <span className='percente'>-4%</span></div>
                                <div className="s-name">Customers</div>
                            </div>
                        </div>

                        <div className="sales">
                            <div className="s-top">
                                <div className="s-icon">
                                    $
                                </div>
                                <div className="s-number">39,354 <span className='percente'>-4%</span></div>
                                <div className="s-name">Customers</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashborad