import { FC } from 'react';
import navbarStyles from '../styles/navbar.module.css'
import { Link, useLocation } from 'react-router-dom'

interface NavbarProps {
    handleSearch?: (value: string) => void;
    query?: string;
}

const Navbar: FC<NavbarProps> = ({ handleSearch, query }) => {
    const location = useLocation();

    return (
    <nav className={navbarStyles.navbarDiv}>
        <div></div>
        {location.pathname === '/' && 
        <div className="form__group">
            <label htmlFor="search" className={navbarStyles.label}></label>
            <input onChange={(e) => handleSearch && handleSearch(e.target.value)} value={query} type="text" className={navbarStyles.input} id="search" placeholder="Search Image" />
        </div>}

        <div className={navbarStyles.linkDiv}>
            <Link to='/' className={location.pathname === '/' ? navbarStyles.underline: navbarStyles.link} >Home</Link>
            <Link to='/gallery' className={location.pathname === '/gallery' ? navbarStyles.underline: navbarStyles.link} >Gallery</Link>
        </div>
    </nav>
    )
}

export default Navbar