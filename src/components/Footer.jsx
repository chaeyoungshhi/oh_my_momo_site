// ===== Footer — Oh My Momo! =====
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top container">
        <div className="footer__brand">
          <div className="footer__logo">
            <span>🥟</span>
            <div>
              <div className="footer__logo-main">Oh My Momo!</div>
              <div className="footer__logo-sub">Delhi's Favourite Street-Style Momos</div>
            </div>
          </div>
          <p>Started from the streets of Lajpat Nagar with a mission to bring authentic, spicy, handcrafted momos to every doorstep in Delhi. No shortcuts. No compromises.</p>
          <div className="footer__social">
            <a href="#" aria-label="Instagram">📸</a>
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Twitter">𝕏</a>
            <a href="#" aria-label="YouTube">▶️</a>
          </div>
        </div>

        <div className="footer__section">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/menu">Full Menu</Link></li>
            <li><Link to="/menu?cat=drinks">Drinks</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/login">My Account</Link></li>
          </ul>
        </div>

        <div className="footer__section">
          <h4>Our Momos</h4>
          <ul>
            <li><Link to="/menu?cat=steamed">Steamed Momos</Link></li>
            <li><Link to="/menu?cat=fried">Fried Momos</Link></li>
            <li><Link to="/menu?cat=spicy">Jhol / Spicy</Link></li>
            <li><Link to="/menu?cat=dessert">Dessert Momos</Link></li>
            <li><Link to="/menu?cat=drinks">Drinks & Shakes</Link></li>
          </ul>
        </div>

        <div className="footer__section">
          <h4>Find Us</h4>
          <ul className="footer__contact">
            <li><span>📍</span><span>Lajpat Nagar Central Market, New Delhi – 110024</span></li>
            <li><span>📞</span><span>+91 98765 43210</span></li>
            <li><span>✉️</span><span>hello@ohmymomo.in</span></li>
            <li><span>🕐</span><span>Daily: 11 AM – 11 PM</span></li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom container">
        <p>© {new Date().getFullYear()} Oh My Momo! All rights reserved. Made with ❤️ in Delhi.</p>
        <div className="footer__bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms</a>
          <a href="#">Refund Policy</a>
        </div>
      </div>
    </footer>
  );
}
