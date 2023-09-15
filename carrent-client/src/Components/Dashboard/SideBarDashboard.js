import React from 'react'
import './styles/sidebar.scss'
import { FaCar } from 'react-icons/fa'
import { FiShoppingCart } from 'react-icons/fi'
import { LuLayoutDashboard } from 'react-icons/lu'
import { BsPeopleFill } from 'react-icons/bs'
import { BsFillPersonLinesFill } from 'react-icons/bs'
import { FaCarSide } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom';

const SideBarDashboard = () => {

  const location = useLocation();


  return (
    <div className='sidebar'>
      <Link to='/' className="sidebar-logo">
        <FaCar className='car-icon' />
        <h1>MORENT</h1>
      </Link>

      <nav className='sidebar-links'>
        <ul className='links'>
          <Link to='/dashboard'><li className={location.pathname === '/dashboard' ? 'active-link' : 'link'}><LuLayoutDashboard />Dashboard</li></Link>
          <Link to='/orders'><li className={location.pathname === '/orders' ? 'active-link' : 'link'}><FiShoppingCart />Orders</li></Link>
          <Link to='/customers'><li className={location.pathname === '/customers' ? 'active-link' : 'link'}><BsFillPersonLinesFill />Customers</li></Link>
          <Link to='/employees'><li className={location.pathname === '/employees' ? 'active-link' : 'link'}><BsPeopleFill />Employees</li></Link>
          <Link to='/cars'><li className={location.pathname === '/cars' ? 'active-link' : 'link'}><FaCarSide />Cars</li></Link>
        </ul>
      </nav>
    </div>
  )
}

export default SideBarDashboard