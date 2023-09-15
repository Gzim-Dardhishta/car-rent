import { React, useEffect, useState } from 'react'
import './styles/contact.scss'
import { BsArrowRight } from 'react-icons/bs'
import { CiLocationOn } from 'react-icons/ci'
import { LuPhoneCall } from 'react-icons/lu'
import { SiGmail } from 'react-icons/si'
import { AiOutlineInstagram } from 'react-icons/ai'
import { BsFacebook } from 'react-icons/bs'
import { BsTwitter } from 'react-icons/bs'


const ContactForm = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleNameChange = (value) => {
        setName(value)
    }

    const handleEmailChange = (value) => {
        setEmail(value)
    }

    const handleSubjectChange = (value) => {
        setSubject(value)
    }

    const handleMessageChange = (value) => {
        setMessage(value)
    }

    const [messageS, setMessageS] = useState(false);

    const loggedUser = JSON.parse(localStorage.getItem('user'))
    const accessToken = localStorage.getItem("access_token");

    const handleSendMessage = (e) => {
        e.preventDefault();

        fetch('http://localhost:8000/api/v1/contact/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                name: name,
                email: email,
                subject: subject,
                message: message,
                userId: loggedUser.id
            })
        })
            .then(async response => {

                const data = await response.json();
                console.log(data)

                setMessageS(true)

            })
            .catch(error => {
                console.log(error)
                alert('Something was not right!!!!')
            });
    }

    return (
        <div className='contact-form'>
            <form className='form-card'>
                <h2>Get In Touch</h2>

                <div className="input-container">
                    <label htmlFor="">
                        Name
                    </label>
                    <div className="inner-input-container">
                        <input
                            type="text"
                            name='name'
                            onChange={(e) => handleNameChange(e.target.value)}
                            placeholder='Enter your name'
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
                        Subject
                    </label>
                    <div className="inner-input-container">
                        <input
                            type="text"
                            name='subject'
                            onChange={(e) => handleSubjectChange(e.target.value)}
                            placeholder='Enter your subject'
                            className='form-input'
                        />
                    </div>
                </div>

                <div className="input-container">
                    <label htmlFor="">
                        Message
                    </label>
                    <div className="inner-input-container">
                        <input
                            type="text"
                            name='message'
                            onChange={(e) => handleMessageChange(e.target.value)}
                            placeholder='Enter your message'
                            className='form-input'
                        />
                    </div>
                </div>

                <div className='button-container'>
                    {loggedUser ? (
                        <button type='button' className='submit-button' onClick={handleSendMessage}>
                            <>Send</>
                            <><BsArrowRight className='arr' /></>
                        </button>
                    ) : (
                        <span className='bg-danger text-light'>You need to login to send messages</span>
                    )}
                </div>
            </form>

            <div className="info-card">
                {messageS ? (
                    <>
                        <h2 className='thanks'>
                            <span className='thank'>THANK </span>
                            <span className='you'>YOU.</span><br />
                            <span className='small-txt'>for being so nice.</span>
                        </h2>
                        <p className="message-txt">We'll be in touch shourtly!</p>
                    </>
                ) : (
                    <>
                        <h2>Contact Us</h2>

                        <p className='t-text'>We're open for any suggestion or just have a chat</p>

                        <div className="location">
                            <div className="icon"><CiLocationOn /></div>
                            <p><span>Address:</span> Prishtine, Muharrem Fejza, 10000</p>
                        </div>

                        <div className="phone">
                            <div className="icon"><LuPhoneCall /></div>
                            <p><span>Phone:</span> +383 44 444 444</p>
                        </div>

                        <div className="email">
                            <div className="icon"><SiGmail /></div>
                            <p><span>Email:</span> example@gmail.com</p>
                        </div>

                        <div className="social-links">
                            <div className="instagram"><AiOutlineInstagram /></div>
                            <div className="facebook"><BsFacebook /></div>
                            <div className="twitter"><BsTwitter /></div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default ContactForm