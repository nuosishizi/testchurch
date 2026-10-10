import React, { useState } from 'react';
import { BookOpen, Menu, X, Shield, MessageCircle, ArrowRight } from 'lucide-react';

export default function Navbar({ currentRoute, navigateTo }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', route: 'home' },
    { label: 'Free Bible Study', route: 'register', badge: '100% Free' },
    { label: 'Bible Topics', route: 'topics' },
    { label: 'About Us', route: 'about' },
    { label: 'Contact', route: 'contact' },
  ];

  const handleNav = (route) => {
    navigateTo(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="navbar-wrapper">
      {/* Top Notification Bar */}
      <div className="top-banner">
        <div className="container top-banner-content">
          <div className="banner-left">
            <span className="live-pulse"></span>
            <span>Live Zoom Bible Studies Weekly · Free to Join · Everyone Welcome</span>
          </div>
          <div className="banner-right">
            <a 
              href="https://wa.me/14155550199?text=Hello!%20I%20am%20interested%20in%20joining%20the%20free%20online%20Bible%20study." 
              target="_blank" 
              rel="noopener noreferrer"
              className="top-whatsapp-link"
            >
              <MessageCircle size={14} />
              <span>WhatsApp Direct Help</span>
            </a>
            <button 
              onClick={() => handleNav('admin')}
              className={`staff-portal-btn ${currentRoute === 'admin' ? 'active' : ''}`}
              title="Staff Lead Management & CRM"
            >
              <Shield size={13} />
              <span>Staff Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="main-nav">
        <div className="container nav-container">
          {/* Brand Logo */}
          <div className="brand-logo" onClick={() => handleNav('home')}>
            <div className="logo-icon-box">
              <BookOpen size={24} className="logo-icon" />
            </div>
            <div className="logo-text-box">
              <span className="brand-title">Grace & Truth</span>
              <span className="brand-sub">Online Bible Study</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="desktop-nav-links">
            {navItems.map((item) => (
              <button
                key={item.route}
                onClick={() => handleNav(item.route)}
                className={`nav-link ${currentRoute === item.route ? 'active' : ''}`}
              >
                {item.label}
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </button>
            ))}
          </div>

          {/* CTA Action */}
          <div className="nav-actions">
            <button
              onClick={() => handleNav('register')}
              className="btn-primary-nav"
            >
              <span>Join Free Study</span>
              <ArrowRight size={16} />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <div className="mobile-drawer-content">
            {navItems.map((item) => (
              <button
                key={item.route}
                onClick={() => handleNav(item.route)}
                className={`mobile-nav-link ${currentRoute === item.route ? 'active' : ''}`}
              >
                <span>{item.label}</span>
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </button>
            ))}
            <div className="mobile-drawer-footer">
              <button
                onClick={() => handleNav('register')}
                className="btn-primary-mobile"
              >
                Join Free Bible Study
              </button>
              <button
                onClick={() => handleNav('admin')}
                className="btn-secondary-mobile"
              >
                <Shield size={16} />
                Staff Lead Portal
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
