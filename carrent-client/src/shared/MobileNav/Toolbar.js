import React from 'react'
import './styles/toolbar.scss'
import { Link } from 'react-router-dom'

const Toolbar = () => {
    return (
        <div className="mobile-toolbar">
            <div className="mobile-logo-row">
                <Link to='/'>
                    <h5>MORENT</h5>
                </Link>
            </div>

            <button></button>
        </div>
    )
}

export default Toolbar