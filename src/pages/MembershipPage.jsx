import { ArrowRight, Check, Info } from 'lucide-react';
import { PageHero, Reveal, SectionHeading, CtaBand, Icon } from '../components/ui';
import { MEMBERSHIP } from '../data/content';

export default function MembershipPage() {
  return (
    <div>
      <PageHero
        eyebrow="Membership"
        title="Becoming a Member"
        subtitle={MEMBERSHIP.welcome}
        image="images/fellowship.jpg"
      />

      <section className="section">
        <div className="container">
          <Reveal className="notice">
            <Info size={22} />
            <p>
              <strong>Attending is open to everyone.</strong> Anyone may join our gatherings and free Bible studies. Formal membership is a
              separate step described below, according to Article V of our bylaws.
            </p>
          </Reveal>

          <div className="two-col">
            <Reveal className="panel">
              <span className="eyebrow">5.1 Admission Principles</span>
              <h2>Who May Apply</h2>
              <ul className="check-list">
                {MEMBERSHIP.criteria.map((c) => (
                  <li key={c}><Check size={18} /> {c}</li>
                ))}
              </ul>
              <p className="muted">{MEMBERSHIP.youth}</p>
            </Reveal>

            <Reveal delay={120} className="panel panel--navy">
              <span className="eyebrow eyebrow--gold">5.2 Membership Procedure</span>
              <h2>How to Apply</h2>
              <ol className="procedure">
                {MEMBERSHIP.procedure.map((s, i) => (
                  <li key={s.title}>
                    <span className="procedure__no">{i + 1}</span>
                    <div>
                      <strong>{s.title}</strong>
                      <p>{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <a href="#contact" className="btn btn-gold btn-block">Ask About Membership <ArrowRight size={18} /></a>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--ivory">
        <div className="container">
          <SectionHeading eyebrow="5.3 Membership Rights" title="Rights of Every Member" intro="Our church is built on transparency, free access to God’s Word, and shared responsibility." />
          <div className="rights-grid">
            {MEMBERSHIP.rights.map((r, i) => (
              <Reveal key={r.title} delay={i * 80} className="right-card">
                <div className="right-card__icon"><Icon name={r.icon} size={24} /></div>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="governance-note">
            <p>Without the permission and authorization of the Board of Trustees, no one has the right to represent the church externally in exercising any civil or other rights. (Article 5.3.6)</p>
          </Reveal>
        </div>
      </section>

      <CtaBand title="Start With a Free Bible Study" text="The best way to get to know our church is to study God’s Word with us." />
    </div>
  );
}
