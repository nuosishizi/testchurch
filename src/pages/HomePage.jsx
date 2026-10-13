import { ArrowRight, ChevronDown, BookOpen, Cross, Sun, Check } from 'lucide-react';
import { Reveal, SectionHeading, CtaBand, Icon, LogoMark } from '../components/ui';
import { asset } from '../utils/asset';
import ArticleCard from '../components/ArticleCard';
import { CHURCH } from '../data/church';
import { AIMS, BELIEFS, ACTIVITIES, WELCOME_INTRO } from '../data/content';
import { ARTICLES } from '../data/articles';

const PILLARS = [
  { icon: BookOpen, title: 'Know God', text: 'Discover the one true God who created the heavens, the earth, and all things.' },
  { icon: Cross, title: 'Follow Christ', text: 'Christ is the way, the truth, and the life — His words guide all we do.' },
  { icon: Sun, title: 'Shine His Light', text: 'Live as the light of the world and the salt of the earth, to God’s glory.' },
];

export default function HomePage() {
  return (
    <div className="home">
      {/* ================= HERO ================= */}
      <section className="hero" id="top">
        <div className="hero__bg" style={{ backgroundImage: `url(${asset('images/hero-sunrise.jpg')})` }} />
        <div className="hero__overlay" />
        <div className="hero__rays" aria-hidden="true" />
        <div className="hero__particles" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, i) => (
            <span key={i} style={{ '--i': i, left: `${(i * 53) % 100}%`, animationDelay: `${(i * 0.7) % 9}s` }} />
          ))}
        </div>

        <div className="container hero__content">
          <span className="hero__eyebrow">
            <span className="hero__eyebrow-line" /> Welcome to {CHURCH.name}
          </span>
          <h1 className="hero__title">
            Walk in the Light <br />
            <span className="text-gold">of God’s Word</span>
          </h1>
          <p className="hero__tagline">{CHURCH.tagline}</p>
          <p className="hero__lead">
            A community devoted to knowing God, worshiping Him with one heart and one mind, and sharing His gospel with the world.
          </p>
          <div className="btn-row">
            <a href="#bible-study" id="hero-cta-study" className="btn btn-gold btn-lg">
              Join a Free Bible Study <ArrowRight size={20} />
            </a>
            <a href="#beliefs" id="hero-cta-beliefs" className="btn btn-ghost-light btn-lg">
              Discover Our Beliefs
            </a>
          </div>
          <ul className="hero__assurances">
            <li><Check size={16} /> Free to join</li>
            <li><Check size={16} /> Online</li>
            <li><Check size={16} /> Everyone welcome</li>
          </ul>
        </div>

        <a href="#home-pillars" className="hero__scroll" aria-label="Scroll down" onClick={(e) => { e.preventDefault(); document.getElementById('home-pillars')?.scrollIntoView({ behavior: 'smooth' }); }}>
          <ChevronDown size={22} />
        </a>
      </section>

      {/* ================= PILLARS ================= */}
      <section className="pillars" id="home-pillars">
        <div className="container pillars__grid">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 120} className="pillar">
              <div className="pillar__icon"><p.icon size={26} strokeWidth={1.6} /></div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= WELCOME ================= */}
      <section className="section">
        <div className="container split">
          <Reveal className="split__media">
            <div className="media-frame">
              <img src={asset('images/bible-light.jpg')} alt="An open Bible illuminated by morning sunlight" loading="lazy" />
            </div>
            <div className="media-badge">
              <LogoMark size={40} />
              <div>
                <strong>Guided by Scripture</strong>
                <span>Old & New Testaments</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120} className="split__text">
            <span className="eyebrow">Who We Are</span>
            <h2>A Church Founded on the Words of Christ</h2>
            <p className="lead">{WELCOME_INTRO[0]}</p>
            <p>{WELCOME_INTRO[1]} {WELCOME_INTRO[2]}</p>
            <a href="#about" className="btn btn-navy">
              About Our Church <ArrowRight size={18} />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ================= MISSION ================= */}
      <section className="section section--navy">
        <div className="section--navy__glow" />
        <div className="container">
          <SectionHeading light eyebrow="Our Mission" title="Why We Exist" intro="Rooted in our bylaws, these four aims shape everything we do as a church." />
          <div className="aims-grid">
            {AIMS.map((a, i) => (
              <Reveal key={a.no} delay={i * 100} className="aim-card">
                <div className="aim-card__icon"><Icon name={a.icon} size={26} /></div>
                <h3>{a.title}</h3>
                <p>{a.summary}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BELIEFS ================= */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="What We Believe" title="Our Foundation of Faith" intro="Five convictions, each grounded in the Word of God." />
          <div className="belief-list">
            {BELIEFS.map((b, i) => (
              <Reveal key={b.no} delay={i * 80} className="belief-row">
                <span className="belief-row__no">{String(i + 1).padStart(2, '0')}</span>
                <div className="belief-row__icon"><Icon name={b.icon} size={22} /></div>
                <div className="belief-row__text">
                  <h3>{b.title}</h3>
                  <p className="belief-row__verse">{b.verse} <cite>{b.ref}</cite></p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="center-row">
            <a href="#beliefs" className="btn btn-outline">Read Our Full Statement of Beliefs <ArrowRight size={18} /></a>
          </Reveal>
        </div>
      </section>

      {/* ================= BIBLE STUDY ================= */}
      <section className="section section--ivory">
        <div className="container split split--reverse">
          <Reveal className="split__media">
            <div className="media-frame media-frame--tilt">
              <img src={asset('images/fellowship.jpg')} alt="Friends studying the Bible together" loading="lazy" />
            </div>
            <div className="media-badge media-badge--right">
              <span className="media-badge__big">100%</span>
              <div>
                <strong>Free of charge</strong>
                <span>Always, for everyone</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120} className="split__text">
            <span className="eyebrow">Grow in God’s Word</span>
            <h2>Join a Free Online Bible Study</h2>
            <p className="lead">Explore God’s Word, ask honest questions, and grow in faith together with believers — from wherever you are.</p>
            <ol className="steps">
              <li><span>1</span><div><strong>Register in one minute</strong><p>Tell us your preferred time and topics.</p></div></li>
              <li><span>2</span><div><strong>Receive your invitation</strong><p>We’ll reach out by your chosen method.</p></div></li>
              <li><span>3</span><div><strong>Study together online</strong><p>Gather around God’s Word in a warm, welcoming group.</p></div></li>
            </ol>
            <a href="#bible-study" className="btn btn-gold">Reserve Your Spot <ArrowRight size={18} /></a>
          </Reveal>
        </div>
      </section>

      {/* ================= RETURN OF CHRIST ================= */}
      <section className="feature-banner">
        <div className="feature-banner__bg" style={{ backgroundImage: `url(${asset('images/light-clouds.jpg')})` }} />
        <div className="feature-banner__overlay" />
        <div className="container feature-banner__inner">
          <Reveal>
            <span className="eyebrow eyebrow--gold">The Return of Christ</span>
            <h2>Are You Ready for the Lord’s Return?</h2>
            <blockquote>“And at midnight there was a cry made, Behold, the bridegroom comes; go you out to meet him.”</blockquote>
            <cite>Matthew 25:6</cite>
            <p>The Lord Jesus calls us to watch and prepare as wise virgins. Explore what Scripture teaches about His coming.</p>
            <a href="#return" className="btn btn-gold">Explore Bible Prophecies <ArrowRight size={18} /></a>
          </Reveal>
        </div>
      </section>

      {/* ================= ARTICLES ================= */}
      <section className="section">
        <div className="container">
          <div className="section-head-row">
            <SectionHeading align="left" eyebrow="God’s Word" title="Reflections & Bible Teachings" />
            <Reveal><a href="#word" className="link-arrow">View all articles <ArrowRight size={16} /></a></Reveal>
          </div>
          <div className="article-grid">
            {ARTICLES.slice(0, 3).map((a, i) => (
              <ArticleCard key={a.slug} article={a} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= TOGETHER / GOSPEL ================= */}
      <section className="section section--sage">
        <div className="container">
          <SectionHeading eyebrow="Walk in Faith Together" title="Life in Our Church" intro="Worship, fellowship, and sharing the gospel — all freely offered." />
          <div className="activity-grid">
            {ACTIVITIES.map((a, i) => (
              <Reveal key={a.title} delay={i * 100} className="activity-card">
                <Icon name={a.icon} size={30} />
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
