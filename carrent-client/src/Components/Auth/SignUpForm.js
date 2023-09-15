import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import './styles/signup.scss'


const SignUpForm = () => {

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false)


    const handleUserNameChange = (value) => {
        setUserName(value);
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

    const [error, setError] = useState('');


    const handleSignUp = (e) => {
        e.preventDefault();

        fetch('http://localhost:8000/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        })
            .then(async response => {

                const data = await response.json();
                console.log(data)

                if(data.message === 'Error: Username is already taken!' || data.message === 'Error: Email is already in use!' || password.length() <= 6){
                    setError(data.message)
                } else{

                    setError(data.message)
                }
                
            })
            .catch(error => {
                console.log(error)
                alert('Something was not right!!!!')
            });
    }


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
                                onChange={(e) => handleUserNameChange(e.target.value)}
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
                        {loggedIn ? (<p className='mess'>You are logged in</p>) : (<button onClick={handleSignUp} className='submit-button'>Sign Up</button>)}
                    </div>
                    <span className='text-danger h6'>{error}</span>
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