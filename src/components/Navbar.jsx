// ===== Navbar — Oh My Momo! =====

import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Navbar.css';

export default function Navbar() {
  const { cartCount, user, logout } = useApp();
  const [scrolled,     setScrolled]     = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setUserMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const navLinks = [
    { to: '/',       label: 'Home'    },
    { to: '/menu',   label: 'Menu'    },
    { to: '/contact',label: 'Contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">

        {/* ── Logo ── */}
        <Link to="/" className="navbar__logo" onClick={() => setMobileOpen(false)}>
          <span className="navbar__logo-icon">🥟</span>
          <div className="navbar__logo-text">
            <span className="navbar__logo-main">Oh My Momo!</span>
            <span className="navbar__logo-sub">Delhi's Favourite</span>
          </div>
        </Link>

        {/* ── Desktop Links ── */}
        <ul className="navbar__links">
          {navLinks.map(l => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ── Actions ── */}
        <div className="navbar__actions">
          {/* Cart */}
          <Link to="/cart" className="navbar__cart" aria-label="Cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {cartCount > 0 && <span className="navbar__cart-badge">{cartCount}</span>}
          </Link>

          {/* User */}
          {user ? (
            <div className="navbar__user" ref={dropdownRef}>
              <button className="navbar__avatar-btn" onClick={() => setUserMenuOpen(v => !v)}>
                <span className="navbar__avatar">{user.name[0].toUpperCase()}</span>
              </button>
              {userMenuOpen && (
                <div className="navbar__dropdown animate-fadeUp">
                  <div className="navbar__dropdown-header">
                    <strong>{user.name}</strong>
                    <span>{user.email}</span>
                  </div>
                  {user.isAdmin && (
                    <button onClick={() => { navigate('/admin'); setUserMenuOpen(false); }}>
                      ⚙️ Admin Panel
                    </button>
                  )}
                  <button onClick={() => { logout(); setUserMenuOpen(false); navigate('/'); }}>
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm">Sign In</Link>
          )}

          {/* Hamburger */}
          <button
            className={`navbar__hamburger ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <div className={`navbar__mobile ${mobileOpen ? 'navbar__mobile--open' : ''}`}>
        {navLinks.map(l => (
          <NavLink key={l.to} to={l.to} end={l.to === '/'} className="navbar__mobile-link"
            onClick={() => setMobileOpen(false)}>
            {l.label}
          </NavLink>
        ))}
        <Link to="/cart" className="navbar__mobile-link" onClick={() => setMobileOpen(false)}>
          🛒 Cart {cartCount > 0 && `(${cartCount})`}
        </Link>
        {user ? (
          <button className="navbar__mobile-link" style={{ textAlign:'left', background:'none', border:'none', cursor:'pointer', padding:'var(--space-sm) 0', borderBottom:'1px solid var(--clr-border)', fontSize:'1rem', fontWeight:500, color:'var(--clr-spicy)' }}
            onClick={() => { logout(); setMobileOpen(false); }}>
            🚪 Logout
          </button>
        ) : (
          <Link to="/login" className="btn btn-primary" style={{ marginTop:'var(--space-sm)' }} onClick={() => setMobileOpen(false)}>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
