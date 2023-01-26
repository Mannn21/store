import Abouts from "../datas/AboutFooter"
import Socials from "../datas/SocialFooter"

export const About = () => {
    return (
        <div className="about-footer-wrapper">
            <h3>About Us</h3>
            <ul>
                {Abouts.map((about, index) => {
                    return (
                        <li key={index} className={about.cName}>{about.title}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export const Social = () => {
    return (
        <div className="social-footer-wrapper">
            <h3>Follow Us</h3>
            <ul>
                {Socials.map((social, index) => {
                    return (
                        <li key={index} className={social.cName}>{social.title}</li>
                    )
                })}
            </ul>
        </div>
    )
}