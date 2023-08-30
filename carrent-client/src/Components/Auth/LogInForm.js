import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './styles/loginform.scss'
import { FiArrowLeft } from 'react-icons/fi'


const LogInForm = () => {

    const [name, setName] = useState('');
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false)


    const handleNameChange = (value) => {
        setName(value);
    }
    const handlePasswordChange = (value) => {
        setPassword(value);
    }

    useEffect(() => {
        const loggedUser = localStorage.getItem('user')

        if (loggedUser) {
            setLoggedIn(true)
        }
    })


    return (
        <div className='loginform'>
            <div className="wrapper">
                <form className='form'>
                    <h2 className='login-title'>Log In</h2>
                    <div className="input-container">
                        <label htmlFor="">
                            UserName
                        </label>
                        <div className="inner-input-container">
                            {/* <span className="email-icon" style={{ content: `url(${person})` }}></span> */}
                            <input
                                type="name"
                                name='username'
                                onChange={(e) => handleNameChange(e.target.value)}
                                placeholder='Enter your username'
                                className='form-input'
                            />
                        </div>
                    </div>

                    <div className="input-container">
                        <label htmlFor="">
                            Password
                        </label>
                        <div className="inner-input-container">
                            <input
                                type="password"
                                name='password'
                                onChange={(e) => handlePasswordChange(e.target.value)}
                                placeholder='Enter your password'
                                className='form-input'
                            />
                        </div>
                    </div>

                    <div className='acc-links'>
                        <div className='signup-link'>
                            <span>Don't have an account?</span>
                            <Link to='/signup'>Sign Up</Link>
                        </div>
                    </div>

                    <div className='button-container'>
                        {loggedIn ? (<p className='mess'>You are logged in</p>) : (<button className='submit-button'>Log in</button>)}
                    </div>
                </form>

                <div className="message-card">
                    <h2 className='login-message'>Welcome back User!</h2>

                    <Link to='/' className='home-link'><FiArrowLeft />HomePage</Link>
                </div>
            </div>
        </div>
    )
}

export default LogInForm