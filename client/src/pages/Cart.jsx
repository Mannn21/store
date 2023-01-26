import React from "react"
import CartTable from "../components/Cart/CartTable"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/pages/Cart.css'

const Cart = () => {
    return (
        <div className="cart">
            <Navbar />
            <h2 className="header-cart">ITEM CART</h2>
            <CartTable />
            <Footer />
        </div>
    )
}

export default Cart