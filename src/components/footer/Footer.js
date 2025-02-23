import React from 'react';
import '../../styles/Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>BROWSE</h3>
                    <ul>
                        <li>Courses</li>
                        <li>Blog</li>
                        <li>Contacts</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>NEXT COURSES</h3>
                    <ul>
                        <li>Management</li>
                        <li>History</li>
                        <li>Literature</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>ABOUT LEARN</h3>
                    <ul>
                        <li>About Us</li>
                        <li>Apply</li>
                        <li>Terms and conditions</li>
                    </ul>
                </div>
                <div className="newsletter">
                    <h3>Newsletter</h3>
                    <div className="newsletter-form">
                        <input type="email" placeholder="Your Email" />
                        <button>SUBSCRIBE</button>
                    </div>
                    <div className="contact-info">
                        Questions? <span>+84 4324 44</span> questions@domain.com
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2025-2026</p>
            </div>
        </footer>
    );
}

export default Footer;