import React from 'react'
import { FooterData } from './data';
import { Link } from 'react-router-dom';
import './styles/footer.scss'

const Footer = () => {
    return (
        <div className='footer'>
            <div className="top-footer">
                <div className="logo">
                    <h5>MORENT</h5>
                    <div className="vision">
                        Our vision is to provide convenience and help increase your sales business.
                    </div>
                </div>

                <div className="other-links">
                    {FooterData.map((props) => {
                        return (
                            <div className="footer-links-list">
                                <h6>{props.category}</h6>
                                <div className="links">
                                    {props.links.map((l) => {
                                        return (
                                            <Link to={l.to} className="links-item">
                                                {l.link}
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="bootom-footer">
                <div className="copyright">
                    <p>©2023 MORENT. All rights reserved</p>
                </div>
                <div className="bootom-footer-left">
                    <p><Link to='/'>Privacy & Policy</Link></p>
                    <p><Link to='/'>Terms & Condition</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Footer