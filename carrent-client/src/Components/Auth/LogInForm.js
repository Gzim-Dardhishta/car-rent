import { React, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './styles/loginform.scss'
import { FiArrowLeft } from 'react-icons/fi'
import jwtDecode from "jwt-decode";


const LogInForm = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false)

    const [usernameError, setUsernameError] = useState("")
    const [passwordError, setPasswordError] = useState("")


    const handleUserNameChange = (value) => {
        setUsername(value);
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


    const handleLogIn = (e) => {
        e.preventDefault();

        fetch('http://localhost:8000/api/auth/signin', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
            .then(async response => {

                const data = await response.json();
                const user = {
                    name: username
                }

                const access_token = {
                    token: data.accessToken
                }

                if (data.accessToken) {
                    localStorage.setItem("access_token", data.accessToken);
                }
                if (data) {
                    localStorage.setItem("username", JSON.stringify(user));
                }

                try {
                    const decodedToken = jwtDecode(data.accessToken);

                    if (decodedToken) {
                        var roles = decodedToken.roles;

                        var role = roles.substring(1, roles.length - 1)
                    } else {
                        console.error('Failed to decode the JWT token.');
                    }
                } catch (error) {
                    console.error('Error decoding JWT token:', error);
                }

                if (role == 'ROLE_ADMIN') {
                    navigate("/dashboard");
                } else if (role == 'ROLE_MODERATOR') {
                    navigate('/dashboard')
                } else {
                    navigate('/')
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


    return (
        <div className='loginform'>
            <div className="wrapper">
                <form className='form' onSubmit={handleLogIn}>
                    <h2 className='login-title'>Log In</h2>
                    <div className="input-container">
                        <label htmlFor="">
                            UserName
                        </label>
                        <div className="inner-input-container">
                            <input
                                type="name"
                                name='username'
                                onChange={(e) => handleUserNameChange(e.target.value)}
                                placeholder='Enter your username'
                                className='form-input'
                            />
                        </div>
                        <span>{usernameError}</span>
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
                        <span>{passwordError}</span>
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