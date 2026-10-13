import { Mail, MessageCircle, MapPin, ArrowUpRight } from 'lucide-react';
import { Logo } from './ui';
import { CHURCH, whatsappLink } from '../data/church';

const YEAR = new Date().getFullYear();

export default function Footer() {
  const wa = whatsappLink('Hello! I visited The Church of the True Light website and have a question.');

  return (
    <footer className="footer">
      <div className="footer__rays" aria-hidden="true" />
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo light />
          <p className="footer__tagline">{CHURCH.tagline}</p>
          <p className="footer__about">
            A Christian church devoted to worshiping the one true God, following Jesus Christ, and living according to God’s Word.
          </p>
        </div>

        <div className="footer__col">
          <h4>Explore</h4>
          <a href="#about">About Us</a>
          <a href="#beliefs">Our Beliefs</a>
          <a href="#word">God’s Word</a>
          <a href="#return">The Return of Christ</a>
        </div>

        <div className="footer__col">
          <h4>Get Involved</h4>
          <a href="#bible-study">Free Bible Study</a>
          <a href="#membership">Membership</a>
          <a href="#contact">Prayer Requests</a>
          <a href="#contact">Contact Us</a>
        </div>

        <div className="footer__col">
          <h4>Connect</h4>
          {CHURCH.contact.email && (
            <a href={`mailto:${CHURCH.contact.email}`} className="footer__contact">
              <Mail size={16} /> {CHURCH.contact.email}
            </a>
          )}
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="footer__contact">
              <MessageCircle size={16} /> WhatsApp <ArrowUpRight size={14} />
            </a>
          )}
          <span className="footer__contact">
            <MapPin size={16} /> {CHURCH.contact.address || 'Online gatherings worldwide'}
          </span>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>© {YEAR} {CHURCH.name}. All rights reserved.</span>
        <div className="footer__legal">
          <a href="#privacy">Privacy Policy</a>
          <a href="#membership">Church Governance</a>
        </div>
      </div>
    </footer>
  );
}
