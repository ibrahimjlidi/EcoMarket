import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome
import CartPopup from './CartPopup'; // Adjust the path as per your project structure

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCartPopup = () => {
    setIsCartOpen(!isCartOpen);
  };

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
          <button onClick={toggleCartPopup}>
            <i className="fas fa-shopping-cart"></i> Cart
          </button>
        </li>
        <li>
          <Link to="/profile">
            <i className="fas fa-user"></i> Profile
          </Link>
        </li>
      </ul>
      <CartPopup isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
};

export default Navbar;
