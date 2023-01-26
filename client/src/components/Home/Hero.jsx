import React from 'react'
import image1 from '../../assets/image1.png'
import { Link } from 'react-router-dom'
import '../../styles/components/Hero.css'

const Hero = () => {
    return (
        <div className="hero">
            <img src={image1} alt="potted plant" className='image-hero'/>
            <div className="text-hero">
                <span className='text-hero-discount'>40% Discount Payment</span>
                <p className='text-hero-store'>Nature Plants Store</p>
                <Link className='button-hero' to="/collection">Buy Now</Link>
            </div>
        </div>
    )
}

export default Hero