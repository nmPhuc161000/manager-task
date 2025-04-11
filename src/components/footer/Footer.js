import React from 'react';
import '../../styles/Footer.css';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  // Navigation handler for all links
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Navigation Section (Header Routes + Blog) */}
        <div className="footer-section">
          <h3>NAVIGATION</h3>
          <ul>
            <li onClick={() => handleNavigation('/product-guide')} style={{ cursor: 'pointer' }}>
              Product Guide
            </li>
            <li onClick={() => handleNavigation('/our-services')} style={{ cursor: 'pointer' }}>
              Our Services
            </li>
            <li onClick={() => handleNavigation('/pricing')} style={{ cursor: 'pointer' }}>
              Pricing
            </li>
          </ul>
        </div>

        {/* About Section (About Us + Terms + Policy) */}
        <div className="footer-section">
          <h3>ABOUT</h3>
          <ul>
            <li onClick={() => handleNavigation('/about-us')} style={{ cursor: 'pointer' }}>
              About Us
            </li>
            <li onClick={() => handleNavigation('/terms')} style={{ cursor: 'pointer' }}>
              Terms
            </li>
            <li onClick={() => handleNavigation('/policy')} style={{ cursor: 'pointer' }}>
              Policy
            </li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div className="footer-section newsletter">
          <h3>NEWSLETTER</h3>
          <div className="newsletter-form">
            <input type="email" placeholder="Your Email" />
            <button>SUBSCRIBE</button>
          </div>
          <div className="contact-info">
            Questions? <span>+84 4324 44</span> questions@domain.com
          </div>
        </div>

        {/* Sign In (from Header) */}
        <div className="footer-section sign-in">
          <h3>ACCOUNT</h3>
          <ul>
            <li onClick={() => handleNavigation('/login')} style={{ cursor: 'pointer' }}>
              Sign In
            </li>
            <li onClick={() => handleNavigation('/register')} style={{ cursor: 'pointer' }}>
              Sign Up
            </li>
            
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© 2025-2026</p>
      </div>
    </footer>
  );
}

export default Footer;