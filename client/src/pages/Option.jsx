import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ImageProduct from '../assets/product1.png'
import '../styles/pages/Option.css'

const Option = () => {
    return (
        <div className="option">
            <Navbar />

            {/* content option */}
            <div className="option-wrapper">

                {/* Select variant item */}
                <div className='item-option-wrapper'>

                    {/* Big image item  */}
                    <div className="image-option-wrapper">
                        <img src={ImageProduct} alt='Your item'/>
                    </div>
                    {/* End big image item */}

                    {/* Description variant item */}
                    <div className="description-option-item">

                        {/* Describe title, price, etc */}
                        <div className="description-option">
                            <h1 className='title-option-item'>Product 1</h1>
                            <span className='price-option-item'>$ 30.00</span>
                            <span className='rate-option-item'>*****</span>
                            <p className='text-option-item'>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui enim, quae, possimus animi neque, inventore nisi blanditiis repudiandae aliquam rerum veniam optio. Ipsum at quaerat suscipit eligendi quisquam natus, impedit perspiciatis maxime nihil reprehenderit magni?
                            </p>
                        </div>
                        {/* End describe item */}

                        {/* Pick variant item */}
                        <div className="select-option-wrapper">
                            <div className="color-option">
                                <h3 className='header-set-color'>Select Color</h3>
                            </div>
                            <div className="size-option">
                                <h3 className='header-set-size'>Select Size</h3>
                            </div>
                        </div>
                        {/* End pick variant item */}

                        {/* Append item to cart */}
                        <div className="cart-option-wrapper">
                            <div className="many-option-item">
                                <span>for many item</span>
                            </div>
                            <div className="append-cart-item">
                                <span>Add to cart</span>
                            </div>
                            <div className="icon-option-item">
                                <span>for icon</span>
                            </div>
                        </div>
                        {/* End append item to cart */}

                        {/* Categories and sosmed item */}
                        <div className="categories-sosmed-option-item">
                            <div className="categories-option-item">
                                <span>for categorie</span>
                            </div>
                            <div className="sosmed-option-item">
                                <span>for sosmed</span>
                            </div>
                        </div>
                        {/* End categories and sosmed item */}
                    </div>
                    {/* End description variant item */}

                </div>
                {/* End select variant item */}

                {/* Review item */}
                <div className="reviews-item-wrapper"></div>
                {/* End review item */}

                {/* Related product item */}
                <div className="related-product-item-wrapper"></div>
                {/* End related product item */}
            </div>
            {/* end content */}

            <Footer />
        </div>
    )
}

export default Option