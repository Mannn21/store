import React, {useState} from 'react'
import Products from '../../datas/Product'
import * as AiIcons from 'react-icons/ai'
import * as HiIcons from 'react-icons/hi'
import '../../styles/components/Content.css'

const Content = () => {
    const [showAddProduct, setShowAddProduct] = useState(-1)

    const showProduct = (index) => {
        if(showAddProduct !== index){
            setShowAddProduct(index)
        }
        if(showAddProduct === index) {
            setShowAddProduct(-1)
        }
    }

    const AddProduct = () => {
        return (
                <div className='add-product'>
                    <AiIcons.AiOutlineHeart className='wishlist-product'/>
                    <HiIcons.HiOutlineShoppingCart className="cart-product"/>
                    <AiIcons.AiOutlineEye className='view-product'/>
                </div>
        )
    }

    const Product = () => {
        return (
            Products.map((product, index) => {
                return (
                    <div key={index} className={product.cName}>
                        <div className="image-wrapper">
                            <img
                                src={product.image}
                                alt={product.title}
                                className={product.cImage}
                                onClick={() => showProduct(index)}
                            />
                            {showAddProduct === index && <AddProduct/>}
                        </div>
                        <p className={product.cTitle}>{product.title}</p>
                        <span className={product.cDesc}>{product.desc}</span>
                        <span className={product.cPrice}>{product.price}</span>
                    </div>
                )
            })
        )
    }


    return (
        <div className="content">
            <div className="header-content">
                <hr className='header-content-hr'/>
                <h1>Daily Deals</h1>
                <hr className='header-content-hr'/>
            </div>
            <div className="product">
                <Product />
            </div>
        </div>
    )
}

export default Content