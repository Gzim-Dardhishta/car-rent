import React from 'react'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import useWindowDimensions from '../services/windowDimensions';

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
    return (
        <div className='logout'>
            <button className={windowWidth ? 'logout-btn1' : 'logout-btn'} onClick={handleLogOut}>LogOut</button>
        </div>
    )
}

export default LogOut