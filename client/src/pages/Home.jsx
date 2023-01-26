import React from "react"
import Navbar from "../components/Navbar"
import Hero from '../components/Home/Hero'
import About from '../components/Home/About'
import Content from '../components/Home/Content'
import Footer from '../components/Footer'
import '../styles/pages/Home.css'

const Home = () => {
    return (
        <div className="home">
            <Navbar />
            <Hero />
            <About />
            <Content />
            <Footer />
        </div>
    )
}

export default Home