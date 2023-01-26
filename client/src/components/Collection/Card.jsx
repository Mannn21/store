import React from 'react'
import Cards from "../../datas/Cards";
import { Link } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai'
import '../../styles/components/Card.css'

const Card = () => {

    return (
        Cards.map((item, index) => {
            return (
                <div className="card" key={index}>
                    <div className="card-image">
                        <img src={item.Image} alt={item.title} />
                    </div>
                    <div className="card-description">
                        <div className="card-detail">
                            <h2 className="card-title">{item.title}</h2>
                            <span className="card-price">$ {item.price}</span>
                            <p className="card-desc">{item.desc}</p>
                        </div>
                        <div className="card-checkout">
                            <Link className='checkout-item' to={item.to}>Select Option</Link>
                            <Link className='toLocation' to={item.toWishlist}>
                                <AiIcons.AiOutlineHeart className='checkout-icon'/>
                            </Link>
                            <Link className='toLocation' to={item.toCompare}>
                                <AiIcons.AiOutlinePushpin className='checkout-icon'/>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        })
    )
}

export default Card