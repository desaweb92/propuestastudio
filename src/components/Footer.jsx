import React, { useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `mailto:info@disenourbanostudio.com?subject=Newsletter Subscription&body=Please subscribe me to your newsletter. My email is ${email}`;
    setEmail('');
  };

  return (
    <footer className="footer-container">
      <div className="footer-grid">
          <div className="footer-logo">
          <img src="https://i.imgur.com/iAjXwj2.png" alt="Diseño Urbano Studio" />
        </div>
        {/* Columna Newsletter */}
        <div className="footer-newsletter">
          <h3 className="footer-title">NEWSLETTER</h3>
          <form onSubmit={handleSubmit} className="newsletter-form">
            <div className="input-group">
              <input
                type="email"
                placeholder="ENTER YOUR EMAIL ADDRESS*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="newsletter-input"
              />
              <button type="submit" className="submit-arrow">
                →
              </button>
            </div>
          </form>
        </div>

        {/* Columna Redes Sociales */}
        <div className="footer-social">
          <h3 className="footer-title">Follow us</h3>
          <div className="social-links">
            <a href="https://www.instagram.com/disenourbanostudio/" target="_blank" rel="noopener">
              Instagram
            </a>
            <a href="https://www.linkedin.com/company/dise%C3%B1o-urbano-studio/" target="_blank" rel="noopener">
              LinkedIn
            </a>
            <a href="https://www.facebook.com/people/Dise%C3%B1o-Urbano-Studio/61557646182130/" target="_blank" rel="noopener">
              Facebook
            </a>
          </div>
        </div>

        {/* Columna Contacto */}
        <div className="footer-contact">
          <h3 className="footer-title">CONTACT US</h3>
          <div className="contact-info">
            <a href="tel:+14849379707">+1 (484) 937-9707</a>
            <a href="mailto:contact@disenourbanostudio.com">contact@disenourbanostudio.com</a>
          </div>
        </div>

        {/* Columna Polices */}
        <div className="footer-polices">
          <h3 className="footer-title">POLICES</h3>
          <div className="polices-links">
            <a href="#">T&C</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Cookies Policy Settings</a>
          </div>
        </div>

        {/* Columna Company */}
        <div className="footer-company">
          <h3 className="footer-title">COMPANY</h3>
          <div className="company-links">
            <a href="#">Work With Us</a>
            <a href="#">Press</a>
          </div>
        </div>

       
      </div>

      <div className="footer-bottom">
      
        <div className="copyright">
          © {new Date().getFullYear()} Diseño Urbano Studio. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;