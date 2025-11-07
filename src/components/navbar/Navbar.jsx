import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '../logo/Logo.jsx'
import './Navbar.css'

const Navbar = () => {

    const location = useLocation()
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    }


    return (
        <header className="navbar flex items-center justify-around flex-wrap">
            <Link to='/'>
                <Logo />
            </Link>
            <ul className='navbar-list hidden md:flex'>
                <li>
                    <Link to='/projects' className={location.pathname === '/projects' ? 'text-yellow-500' : 'text-white'}>
                        Projects
                    </Link>
                </li>
                <li>
                    <Link to='/about' className={location.pathname === '/about' ? 'text-yellow-500' : 'text-white'}>
                        About
                    </Link>
                </li>
                <li>
                    <Link to='/contact' className={location.pathname === '/contact' ? 'text-yellow-500' : 'text-white'}>
                        Contact
                    </Link>
                </li>
            </ul>
            <div className='md:hidden'>
                <button onClick={toggleNavbar}>{isOpen ? <X /> : <Menu />}</button>
            </div>

            {isOpen && (
                <ul className='flex flex-col items-center basis-full'>
                    <li>
                        <Link to='/projects' className={location.pathname === '/projects' ? 'text-yellow-500' : 'text-white'}>
                            Projects
                        </Link>
                    </li>
                    <li>
                        <Link to='/about' className={location.pathname === '/about' ? 'text-yellow-500' : 'text-white'}>
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to='/contact' className={location.pathname === '/contact' ? 'text-yellow-500' : 'text-white'}>
                            Contact
                        </Link>
                    </li>
                </ul>
            )}
        </header>
    )
}
export default Navbar;