import React from "react"
import AboutIcons from '../../datas/AboutIcon'
import '../../styles/components/About.css'

const About = () => {
    const Icon = () => {
        return (
            AboutIcons.map((icon, index) => {
                return (
                    <div key={index} className="about-icon">
                        <div className="card">
                            <img src={icon.image} alt={icon.title} className="image-card"/>
                            <p className="title-card">{icon.title}</p>
                            <p className="text-card">{icon.text}</p>
                        </div>
                        {index !== AboutIcons.length -1 && <hr className="hr-card" />}
                    </div>
                )
            })
        )
    } 


    return (
        <div className="about">
            <div className="about-icon-wrapper">
                <Icon />
            </div>
        </div>
    )
}

export default About