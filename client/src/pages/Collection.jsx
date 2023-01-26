import React from 'react'
import Navbar from "../components/Navbar"
import Sidebar from '../components/Collection/Sidebar'
import Product from '../components/Collection/Products'
import Footer from '../components/Footer'
import '../styles/pages/Collection.css'


const Collection = () => {
    return (
        <div className="collection">
            <Navbar />
            <div className="content">
                <Sidebar />
                <Product />
            </div>
            <Footer />
        </div>
    )
}

export default Collection