import {Link} from 'react-router-dom'
import IconNavbar from '../datas/IconNavbar.js'
import LinkNavbar from '../datas/LinkNavbar.js'

export const Icon = () => {
    return (
        IconNavbar.map((item, index) => {
            return (
            <li key={index}>
                <Link className={item.cName} to={item.to}>
                    {item.icon}
                </Link>
            </li>
            )
        })
    )
}

export const NavLink = () => {
    return (
        LinkNavbar.map((item, index) => {
            return (
                <li key={index}>
                    <Link className={item.cName} to={item.to}>
                        {item.title}
                    </Link>
                </li>
            )
        })
    )
}