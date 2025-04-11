import React from 'react';
import '../../styles/Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <h1>Pro Manager</h1>  {/* Replace with actual logo path */}
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="nav-menu">
          <ul>
            <li><Link to="/product-guide">Product Guide</Link></li>
            <li><Link to="/our-services">Our Services</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
          </ul>
        </nav>

        {/* Sign In Button */}
        <div className="sign-in">
          <Link to="/login" className="sign-in-button">Sign In</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;