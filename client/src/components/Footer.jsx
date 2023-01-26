import React from 'react'
import { About, Social } from '../utils/ListedFooter'
import '../styles/components/Footer.css'

const Footer = () => {
    return (
        <div className="footer">
            <div className="header-footer-wrapper">
                <h1>Store.</h1>
                <span>&copy; 2023 Store.</span>
                <span>All Right Reserved</span>
            </div>
            <About />
            <Social />

            <div className="complain-footer-wrapper">
                <h3>Contact Mail</h3>
                <input type="text" placeholder='Input your mail' className='input-footer-complain'/>
            </div>
        </div>
    )
}

export default Footer