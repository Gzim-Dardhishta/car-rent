import React, { useState } from 'react'
import './styles/dashboard.scss'
import { AiOutlineMenu } from 'react-icons/ai'
import SideBarDashborad from './SideBarDashborad'

const Dashborad = () => {

    const [clicked, setClicked] = useState(true)

    return (
        <div className='dashboard'>
            {clicked ? (
                <SideBarDashborad />
            ) : null}

            <div className={clicked ? "dashboard-s" : "dashboard-full"}>
                <div className='dashboard-top'>
                    <div className="menu">
                        <AiOutlineMenu className='sidebar-menu' onClick={() => setClicked((prevActiveMenu) => !prevActiveMenu)} />
                    </div>
                    <h1 className='dashboard-title'>Dashboard</h1>

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
                </div>
            </div>
        </div>
    )
}

export default Dashborad