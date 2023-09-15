import { useEffect, useState, React } from 'react'
import heart from "../assets/heart.svg"
import { Link } from 'react-router-dom'
import "./styles/navbar.scss"
import MobileNav from './MobileNav/MobileNav'
import clsx from 'clsx'
import LogOut from './LogOut'

const NavBar = (props) => {

    const [isSticky, setIsSticky] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedUser = localStorage.getItem("access_token");

        if (loggedUser) {
            setIsLoggedIn(true)
        }

        const nav = document.querySelector(".navbar");
        const navHeight = nav.scrollHeight;

        const handleScroll = () => {
            const scrollHeight = window.pageYOffset;
            setIsSticky(scrollHeight > 20 ? true : false);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    });

    return (
        <header>
            <div className={clsx(`navbar`, isSticky ? "nav__sticky" : "")}>
                <Link to='/' className="logo">
                    <h1>MORENT</h1>
                </Link>

                {isLoggedIn ? (
                    <div className="profile">
                        <Link to='/cart' className="favorite">
                            <img src={heart} width={25} alt="" />
                        </Link>

                        <Link to='/'>
                            <div className="user"></div>
                        </Link>

                        <LogOut />
                    </div>
                ) : (
                    <div className="auth">
                        <Link to='/login' className="login">Log In</Link>
                        <Link to='/signup' className="sign-up">Sign Up</Link>
                    </div>
                )}

                <MobileNav />
            </div>
        </header>
    )
}

export default NavBar