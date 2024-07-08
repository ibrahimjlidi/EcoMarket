import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">EcoMarket</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">
            <i className="fas fa-home"></i> Home
          </Link>
        </li>
        <li>
          <Link to="/cart">
            <i className="fas fa-shopping-cart"></i> Cart
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <i className="fas fa-user"></i> Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
