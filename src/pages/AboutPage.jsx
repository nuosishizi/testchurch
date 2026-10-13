import { ArrowRight } from 'lucide-react';
import { PageHero, Reveal, SectionHeading, CtaBand, Icon, ScriptureQuote } from '../components/ui';
import { asset } from '../utils/asset';
import { CHURCH } from '../data/church';
import { FOREWORD, WELCOME_INTRO, AIMS, ACTIVITIES } from '../data/content';

export default function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow="About Us"
        title={CHURCH.name}
        subtitle={CHURCH.tagline}
        image="images/hero-sunrise.jpg"
      />

      {/* Intro */}
      <section className="section">
        <div className="container split">
          <Reveal className="split__text">
            <span className="eyebrow">Welcome</span>
            <h2>Who We Are</h2>
            {WELCOME_INTRO.map((p, i) => (
              <p key={i} className={i === 0 ? 'lead' : ''}>{p}</p>
            ))}
            <p><strong>Everyone who sincerely seeks to know God and explore His Word is welcome to learn more about our church and participate in our free Bible studies.</strong></p>
          </Reveal>
          <Reveal delay={120} className="split__media">
            <div className="media-frame">
              <img src={asset('images/fellowship.jpg')} alt="Believers in fellowship around God's Word" loading="lazy" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Foreword */}
      <section className="section section--navy">
        <div className="section--navy__glow" />
        <div className="container narrow">
          <SectionHeading light eyebrow="Our Foreword" title="How Our Church Came to Be" />
          <Reveal className="foreword">
            <p>{FOREWORD}</p>
          </Reveal>
        </div>
      </section>

      {/* Aims detailed */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Article II — Our Aims" title="What We Are Committed To" />
          <div className="aims-detail">
            {AIMS.map((a, i) => (
              <Reveal key={a.no} delay={i * 80} className="aim-detail">
                <div className="aim-detail__head">
                  <div className="aim-detail__icon"><Icon name={a.icon} size={26} /></div>
                  <span className="aim-detail__no">{a.no}</span>
                </div>
                <h3>{a.title}</h3>
                <p className="aim-detail__summary">{a.summary}</p>
                <p>{a.detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--ivory">
        <div className="container narrow">
          <ScriptureQuote text="Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven." refText="Matthew 5:16" />
        </div>
      </section>

      {/* Activities */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Article IV — Church Life" title="How We Gather & Serve" />
          <div className="activity-grid">
            {ACTIVITIES.map((a, i) => (
              <Reveal key={a.title} delay={i * 100} className="activity-card activity-card--light">
                <Icon name={a.icon} size={30} />
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="center-row">
            <a href="#membership" className="btn btn-outline">Membership & Church Governance <ArrowRight size={18} /></a>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
