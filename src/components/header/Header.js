import React from 'react';
import '../../styles/Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  // Handler to navigate to homepage
  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo - Clickable */}
        <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <h1>Pro Manager</h1>
        </div>

        {/* Navigation Menu */}
        <nav className="nav-menu">
          <ul>
            <li><a href="/product-guide">Product Guide</a></li>
            <li><a href="/our-services">Our Services</a></li>
            <li><a href="/pricing">Pricing</a></li>
            <li><a href="/about-us">About Us</a></li>
          </ul>
        </nav>

        {/* Sign In Button */}
        <div className="sign-in">
          <a href="/login" className="sign-in-button">Sign In</a>
        </div>
      </div>
    </header>
  );
};

export default Header;