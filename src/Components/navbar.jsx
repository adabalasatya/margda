import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/margdarshakendra-logo.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faHome, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="flex items-center justify-between px-0 py-4 pr-10 relative">
      {/* Logo Section */}
      <div className="flex-shrink-0 ml-5 pl-20">
        <img src={Logo} alt="Margdarshakendra Logo" className="h-12" />
      </div>

      {/* Hamburger Menu */}
      <button
        className="text-2xl md:hidden z-20 py-2"
        onClick={toggleMenu}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faBars} />}
      </button>

      {/* Navigation Links */}
      <ul
        className={`${
          menuOpen
            ? 'translate-x-0 opacity-100 ease-in-out'
            : 'translate-x-full opacity-0 ease-out'
        } absolute top-16 right-0 bg-white rounded-md md:static md:flex md:opacity-100 md:translate-x-0 md:rounded-none transition-all duration-500 w-48 md:w-auto mr-5`}
      >
        {/* Home Link */}
        <li className="text-center md:ml-6">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-2 text-sm md:text-lg text-gray-700 rounded-full font-bold hover:bg-orange-600 hover:text-white transition duration-300 md:border md:border-gray-700"
          >
            {/* Home Icon for larger screens only */}
            <FontAwesomeIcon icon={faHome} className="hidden md:block" /> Home
          </Link>
        </li>

        {/* Login Link */}
        <li className="text-center md:ml-6">
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 px-6 py-2 text-sm md:text-lg text-gray-700 rounded-full font-bold hover:bg-orange-600 hover:text-white transition duration-300 md:border md:border-gray-700"
          >
            {/* Login Icon for larger screens only */}
            <FontAwesomeIcon icon={faSignInAlt} className="hidden md:block" /> Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
