import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight, Quote, BookOpen, Users, Globe2, Handshake, Sun, Cross, ScrollText, Sunrise, Footprints,
  Church, HeartHandshake, MonitorPlay, BookMarked, CalendarHeart, Vote, ShieldCheck, MessageSquareText,
} from 'lucide-react';
import { asset } from '../utils/asset';

const ICONS = {
  BookOpen, Users, Globe2, Handshake, Sun, Cross, ScrollText, Sunrise, Footprints,
  Church, HeartHandshake, MonitorPlay, BookMarked, CalendarHeart, Vote, ShieldCheck, MessageSquareText,
};

/** Render a lucide icon by name (used by data files). */
export function Icon({ name, size = 22, ...rest }) {
  const Cmp = ICONS[name] || Sun;
  return <Cmp size={size} strokeWidth={1.6} {...rest} />;
}

/** Brand mark: radiant sun with a cross at its heart. */
export function LogoMark({ size = 44 }) {
  return (
    <svg className="logo-mark" width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <radialGradient id="lm-core" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#FFF6DD" />
          <stop offset="60%" stopColor="#E3C47C" />
          <stop offset="100%" stopColor="#C7A76B" />
        </radialGradient>
      </defs>
      <g className="logo-rays" stroke="#E3C47C" strokeWidth="2.2" strokeLinecap="round">
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * Math.PI) / 6;
          const r1 = i % 2 ? 21 : 19;
          const r2 = i % 2 ? 26 : 30;
          return (
            <line key={i} x1={32 + r1 * Math.cos(a)} y1={32 + r1 * Math.sin(a)} x2={32 + r2 * Math.cos(a)} y2={32 + r2 * Math.sin(a)} />
          );
        })}
      </g>
      <circle cx="32" cy="32" r="14" fill="url(#lm-core)" />
      <path d="M32 23.5v17M26.5 29.5h11" stroke="#0E2233" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ light = false }) {
  return (
    <a href="#home" className={`logo ${light ? 'logo--light' : ''}`} aria-label="The Church of the True Light — Home">
      <LogoMark />
      <span className="logo-text">
        <span className="logo-small">The Church of</span>
        <span className="logo-big">The True Light</span>
      </span>
    </a>
  );
}

/** Fade/slide content in when it scrolls into view. */
export function Reveal({ children, delay = 0, as: Tag = 'div', className = '', ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal ${shown ? 'is-visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}

export function SectionHeading({ eyebrow, title, intro, align = 'center', light = false }) {
  return (
    <Reveal className={`section-heading section-heading--${align} ${light ? 'section-heading--light' : ''}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {intro && <p className="section-intro">{intro}</p>}
    </Reveal>
  );
}

/** Inner-page banner with background image + breadcrumb. */
export function PageHero({ eyebrow, title, subtitle, image = 'images/hero-sunrise.jpg', children }) {
  return (
    <section className="page-hero">
      <div className="page-hero__bg" style={{ backgroundImage: `url(${asset(image)})` }} />
      <div className="page-hero__overlay" />
      <div className="container page-hero__inner">
        {eyebrow && <span className="eyebrow eyebrow--gold">{eyebrow}</span>}
        <h1>{title}</h1>
        {subtitle && <p className="page-hero__subtitle">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}

export function CtaBand({ title = 'Begin Your Journey in God’s Word', text = 'Everyone who sincerely seeks to know God is welcome. Join a free online Bible study — no cost, no pressure.', primary = { label: 'Join a Free Bible Study', href: '#bible-study' }, secondary = { label: 'Contact Us', href: '#contact' } }) {
  return (
    <section className="cta-band">
      <div className="cta-band__glow" />
      <div className="container cta-band__inner">
        <Reveal>
          <LogoMark size={56} />
          <h2>{title}</h2>
          <p>{text}</p>
          <div className="btn-row btn-row--center">
            <a href={primary.href} className="btn btn-gold">
              {primary.label} <ArrowRight size={18} />
            </a>
            {secondary && (
              <a href={secondary.href} className="btn btn-ghost-light">
                {secondary.label}
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ScriptureQuote({ text, refText, light = false }) {
  return (
    <Reveal as="figure" className={`scripture ${light ? 'scripture--light' : ''}`}>
      <Quote className="scripture__mark" size={34} />
      <blockquote>{text}</blockquote>
      <figcaption>— {refText}</figcaption>
    </Reveal>
  );
}
