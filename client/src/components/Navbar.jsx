import React from 'react'
import { Icon, NavLink } from '../utils/NavbarLink'
import '../styles/components/Navbar.css'

const Navbar = () => {

    return (
        <div className='navbar'>
            {/* start navbar logo */}
            <div className="navbar-logo">
                <p>Store.</p>
            </div>
            {/* end navbar logo */}

            {/* start navbar item */}
            <div className="navbar-item">
                <ul>
                    <NavLink />
                </ul>
            </div>
            {/* end navbar item */}

            {/* start navbar icon */}
            <div className="navbar-icon">
                <ul>
                    <Icon />
                </ul>
            </div>
            {/* end nvbar icon */}
        </div>
    )
}

export default Navbar