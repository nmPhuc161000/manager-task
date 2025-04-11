import React from 'react';
import '../../styles/Header.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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