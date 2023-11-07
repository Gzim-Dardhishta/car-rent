import React from 'react'
import '../styles/sidebar.scss'
import { FaCar } from 'react-icons/fa'
import { FiShoppingCart } from 'react-icons/fi'
import { LuLayoutDashboard } from 'react-icons/lu'
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
          <Link to='/profile'><li className={location.pathname === '/profile' ? 'active-link' : 'link'}><LuLayoutDashboard />Profile</li></Link>
          <Link to='/user-orders'><li className={location.pathname === '/user-orders' ? 'active-link' : 'link'}><FiShoppingCart />Orders</li></Link>
        </ul>
      </nav>
    </div>
  )
}

export default SideBarDashboard