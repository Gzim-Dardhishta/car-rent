import React from 'react'
import { useNavigate } from 'react-router';
import useWindowDimensions from '../services/windowDimensions';
import { Link, useLocation } from 'react-router-dom';

const LogOut = () => {
    const navigateHome = useNavigate();

    const userl = JSON.parse(localStorage.getItem("username"));

    const { width, height } = useWindowDimensions();

    var windowWidth = width < 921

    const handleLogOut = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("username");
        localStorage.removeItem("user");

        navigateHome('/')
        window.location.reload(true);
    }

    const location = useLocation();

    return (
        <div className='logout'>
            {location.pathname === '/cart' ? (
                <button className='logout-btn1' onClick={handleLogOut}>LogOut</button>
            ) : (
                <button className={windowWidth ? 'logout-btn1' : 'logout-btn'} onClick={handleLogOut}>LogOut</button>
            )}
        </div>
    )
}

export default LogOut