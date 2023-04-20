import { NavLink } from 'react-router-dom'

import './style.scss'

function HeaderNav() {
    return (
        <header className='header--nav'>
            <NavLink to='/' className='header--nav-item'>
                Home
            </NavLink>
            <NavLink to='/projects' className='header--nav-item'>
                Projects
            </NavLink>
        </header>
    )
}

export default HeaderNav
