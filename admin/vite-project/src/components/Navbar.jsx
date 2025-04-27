import React from 'react';
import { assets } from '../assets/assets';
import '../styles/navbar.css';
import Logo from '../../../../frontend/src/assets/logo21.png';

const Navbar = ({ setToken }) => {
  return (
    <nav className='navbar'>
      <div className="navbar-left">
        {/* <img className='logo' src={Logo} alt="GoStore Logo" /> */}
        <h1 className="brand-name">GoStore</h1>
      </div>
        <span className='text-gray-500'>Admin Panel</span>
      <div className="navbar-right">
        <button onClick={() => setToken('')} className='logout-button'>
          <span className="logout-icon">↪</span>
          <span>Log out</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;