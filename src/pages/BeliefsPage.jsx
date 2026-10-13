import { PageHero, Reveal, CtaBand, Icon } from '../components/ui';
import { BELIEFS } from '../data/content';

export default function BeliefsPage() {
  return (
    <div>
      <PageHero
        eyebrow="Our Beliefs"
        title="Statement of Basic Beliefs"
        subtitle="What we believe, and the Scriptures on which our faith stands."
        image="images/bible-light.jpg"
      />

      <section className="section">
        <div className="container narrow">
          <Reveal className="intro-note">
            <p>
              The following statement is drawn from Article III of the Bylaws of The Church of the True Light. All church affairs and the
              conduct of our believers are based on the words of Christ.
            </p>
          </Reveal>

          <div className="beliefs-timeline">
            {BELIEFS.map((b, i) => (
              <Reveal key={b.no} delay={60} className="belief-card">
                <div className="belief-card__marker">
                  <Icon name={b.icon} size={24} />
                </div>
                <div className="belief-card__content">
                  <span className="belief-card__no">Article {b.no}</span>
                  <h2>{b.title}</h2>
                  <p>{b.text}</p>
                  <figure className="belief-card__verse">
                    <blockquote>{b.verse}</blockquote>
                    <figcaption>{b.ref}</figcaption>
                  </figure>
                </div>
                {i < BELIEFS.length - 1 && <span className="belief-card__line" aria-hidden="true" />}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Explore These Truths Together" text="Have questions about our beliefs? Join a free Bible study and search the Scriptures with us." />
    </div>
  );
}
