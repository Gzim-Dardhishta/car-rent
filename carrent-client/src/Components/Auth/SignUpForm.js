import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import './styles/signup.scss'


const SignUpForm = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false)


    const handleNameChange = (value) => {
        setName(value);
    }

    const handleEmailChange = (value) => {
        setEmail(value);
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
        <div className='signupform'>
            <div className="wrapper">
                <form className='form'>
                    <h2 className='signup-title'>Sign Up</h2>
                    <div className="input-container">
                        <label htmlFor="">
                            UserName
                        </label>
                        <div className="inner-input-container">
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
                            Email
                        </label>
                        <div className="inner-input-container">
                            <input
                                type="email"
                                name='email'
                                onChange={(e) => handleEmailChange(e.target.value)}
                                placeholder='Enter your email'
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
                            <span>Already have an account?</span>
                            <Link to='/login'>Log In</Link>
                        </div>
                    </div>

                    <div className='button-container'>
                        {loggedIn ? (<p className='mess'>You are logged in</p>) : (<button className='submit-button'>Sign Up</button>)}
                    </div>
                </form>

                <div className="message-card">
                    <h2 className='login-message'>Register and continue to use the app!</h2>

                    <Link to='/' className='home-link'><FiArrowLeft />HomePage</Link>
                </div>
            </div>
        </div>
    )
}

export default SignUpForm