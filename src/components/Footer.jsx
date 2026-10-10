import React from 'react';
import { BookOpen, Mail, MessageCircle, Shield, Heart, ExternalLink, Calendar } from 'lucide-react';

export default function Footer({ navigateTo }) {
  return (
    <footer className="site-footer">
      <div className="container footer-container">
        {/* Brand & Mission Column */}
        <div className="footer-col brand-col">
          <div className="footer-logo" onClick={() => navigateTo('home')}>
            <div className="footer-logo-icon">
              <BookOpen size={22} />
            </div>
            <div>
              <span className="footer-brand-title">Grace & Truth</span>
              <span className="footer-brand-sub">Online Bible Study</span>
            </div>
          </div>
          <p className="footer-mission-text">
            A non-profit Christian learning fellowship dedicated to sharing the timeless truth of Scripture. We offer 100% free, interactive online Bible studies for seekers and believers worldwide.
          </p>
          <div className="faith-badge">
            <Heart size={14} className="faith-heart" />
            <span>Founded on Biblical Grace · Christ-Centered · Independent Non-Profit</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4 className="footer-heading">Explore</h4>
          <ul className="footer-links">
            <li><button onClick={() => navigateTo('home')}>Home</button></li>
            <li><button onClick={() => navigateTo('register')}>Free Bible Study</button></li>
            <li><button onClick={() => navigateTo('topics')}>Bible Topics & Articles</button></li>
            <li><button onClick={() => navigateTo('about')}>Statement of Faith</button></li>
            <li><button onClick={() => navigateTo('contact')}>Contact & Questions</button></li>
          </ul>
        </div>

        {/* Study Times & Platforms */}
        <div className="footer-col">
          <h4 className="footer-heading">Study Schedule</h4>
          <div className="schedule-item">
            <Calendar size={14} />
            <div>
              <strong>Weekday Evenings</strong>
              <p>Tuesdays & Thursdays · 7:30 PM EST</p>
            </div>
          </div>
          <div className="schedule-item">
            <Calendar size={14} />
            <div>
              <strong>Weekend Morning</strong>
              <p>Saturdays · 10:00 AM EST</p>
            </div>
          </div>
          <p className="meeting-note">
            Held live via secure Zoom & Google Meet. Video is optional; listen or participate at your comfort.
          </p>
        </div>

        {/* Direct Contact & Support */}
        <div className="footer-col">
          <h4 className="footer-heading">Direct Contact</h4>
          <p className="footer-contact-desc">
            Have questions before joining? Our team is happy to chat.
          </p>
          <div className="footer-contact-actions">
            <a 
              href="https://wa.me/14155550199?text=Hello!%20I%20have%20a%20question%20about%20your%20free%20online%20Bible%20study."
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-whatsapp-btn"
            >
              <MessageCircle size={16} />
              <span>WhatsApp: +1 (415) 555-0199</span>
            </a>
            <a 
              href="mailto:study@graceandtruthbiblestudy.org"
              className="footer-email-link"
            >
              <Mail size={16} />
              <span>study@graceandtruthbiblestudy.org</span>
            </a>
          </div>

          <div className="footer-admin-link-box">
            <button 
              onClick={() => navigateTo('admin')}
              className="footer-staff-link"
            >
              <Shield size={14} />
              <span>Staff CRM & Lead Dashboard</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="footer-bottom">
        <div className="container bottom-container">
          <p className="copyright-text">
            © 2026 Grace & Truth Online Bible Study. All rights reserved. Biblical quotations from ESV / NIV.
          </p>
          <div className="legal-links">
            <button onClick={() => navigateTo('privacy')}>Privacy Policy</button>
            <span className="dot">·</span>
            <button onClick={() => navigateTo('about')}>About Our Mission</button>
            <span className="dot">·</span>
            <button onClick={() => navigateTo('contact')}>Report an Issue</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
