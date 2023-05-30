import React from 'react'
import searchIcon from "../assets/search-normal.svg"
import filter from "../assets/filter.svg"
import heart from "../assets/heart.svg"
import settings from "../assets/setting-2.svg"
import notifacion from "../assets/notification.svg"
import { Link } from 'react-router-dom'
import "./styles/navbar.scss"

const NavBar = () => {
  return (
    <div className="navbar">
        <div className="logo">
            <h1>MORENT</h1>
        </div>

        <div className="search-bar">
            <div className="search-icon">
                <img src={searchIcon} width={20} alt="" />
            </div>
            <div className="input-container">
                <input type="text" placeholder='Search something here'/>
            </div>
            <div className="filter-icon">
                <img src={filter} width={20} alt="" />
            </div>
        </div>
        <div className="profile">
            <div className="favorite">
                <img src={heart} width={25} alt="" />
            </div>
            <div className="notifacion">
                <img src={notifacion} width={25} alt="" />
            </div>
            <div className="settings">
                <img src={settings} width={25} alt="" />
            </div>

            <Link to='/'>
                <div className="user"></div>
            </Link>
        </div>
    </div>
  )
}

export default NavBar