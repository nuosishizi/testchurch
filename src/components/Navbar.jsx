import { useEffect, useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from './ui';
import { NAV_LINKS } from '../data/church';

export default function Navbar({ currentRoute, transparentTop }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [menuRoute, setMenuRoute] = useState(currentRoute);
  if (menuRoute !== currentRoute) {
    // Route changed: close the mobile menu (React's recommended "adjust state during render" pattern).
    setMenuRoute(currentRoute);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const solid = scrolled || !transparentTop || open;
  const isActive = (route) => currentRoute === route || (route === 'word' && currentRoute === 'article');

  return (
    <header className={`navbar ${solid ? 'navbar--solid' : ''}`}>
      <div className="container navbar__inner">
        <Logo light />

        <nav className="navbar__links" aria-label="Main navigation">
          {NAV_LINKS.map((l) => (
            <a key={l.route} id={`nav-${l.route}`} href={`#${l.route}`} className={`navbar__link ${isActive(l.route) ? 'is-active' : ''}`}>
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#bible-study" id="nav-cta" className="btn btn-gold btn-sm navbar__cta">
          Free Bible Study <ArrowRight size={16} />
        </a>

        <button id="nav-toggle" className="navbar__toggle" onClick={() => setOpen((o) => !o)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <div className={`mobile-menu ${open ? 'is-open' : ''}`}>
        <nav aria-label="Mobile navigation">
          {NAV_LINKS.map((l, i) => (
            <a key={l.route} href={`#${l.route}`} className={`mobile-menu__link ${isActive(l.route) ? 'is-active' : ''}`} style={{ transitionDelay: `${open ? 60 + i * 40 : 0}ms` }}>
              {l.label}
            </a>
          ))}
          <a href="#membership" className="mobile-menu__link">Membership</a>
          <a href="#bible-study" className="btn btn-gold mobile-menu__cta">
            Join a Free Bible Study <ArrowRight size={18} />
          </a>
        </nav>
      </div>
    </header>
  );
}
