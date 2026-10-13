import { ArrowRight, Lamp, Eye, BookOpen, Footprints } from 'lucide-react';
import { PageHero, Reveal, SectionHeading, CtaBand, ScriptureQuote } from '../components/ui';
import { asset } from '../utils/asset';
import ArticleCard from '../components/ArticleCard';
import { ARTICLES } from '../data/articles';

const PREPARE = [
  { icon: Eye, title: 'Watch', text: 'Keep your heart awake and attentive, as the Lord Jesus commanded: “Watch therefore.”', ref: 'Matthew 25:13' },
  { icon: Lamp, title: 'Fill Your Lamp', text: 'Like the wise virgins, prepare oil in your lamp by drawing near to God through His words and prayer.', ref: 'Matthew 25:4' },
  { icon: BookOpen, title: 'Seek the Truth', text: 'All of God’s words are the truth and every one shall be fulfilled. Seek and understand them.', ref: 'Matthew 24:35' },
  { icon: Footprints, title: 'Follow the Lamb', text: 'Seek the working of the Holy Spirit and follow the Lamb wherever He goes.', ref: 'Revelation 14:4' },
];

export default function ReturnPage() {
  const related = ARTICLES.filter((a) => a.category === 'The Return of Christ');

  return (
    <div>
      <PageHero
        eyebrow="The Return of Christ"
        title="Behold, the Bridegroom Comes"
        subtitle="We believe the Lord Jesus Christ will surely come in the last days and receive believers into the kingdom of heaven."
        image="images/light-clouds.jpg"
      >
        <a href="#bible-study" className="btn btn-gold" style={{ marginTop: 28 }}>
          Study Bible Prophecy With Us <ArrowRight size={18} />
        </a>
      </PageHero>

      <section className="section">
        <div className="container split">
          <Reveal className="split__text">
            <span className="eyebrow">The Parable of the Ten Virgins</span>
            <h2>Watch and Prepare</h2>
            <p className="lead">
              In Matthew 25, the Lord Jesus describes ten virgins who went out to meet the bridegroom. Five were wise and took oil in their
              vessels with their lamps; five were foolish and took none.
            </p>
            <p>
              At midnight a cry was heard: “Behold, the bridegroom comes; go you out to meet him.” Those who were ready went in with him to
              the marriage. This parable calls every believer to watchfulness — to be wise virgins who meet the bridegroom and go to the
              marriage supper of the Lamb.
            </p>
          </Reveal>
          <Reveal delay={120} className="split__media">
            <div className="media-frame">
              <img src={asset('images/light-clouds.jpg')} alt="Beams of light breaking through clouds" loading="lazy" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--navy">
        <div className="section--navy__glow" />
        <div className="container">
          <SectionHeading light eyebrow="Being Wise Virgins" title="How Can We Prepare?" />
          <div className="aims-grid">
            {PREPARE.map((p, i) => (
              <Reveal key={p.title} delay={i * 100} className="aim-card">
                <div className="aim-card__icon"><p.icon size={26} strokeWidth={1.6} /></div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <span className="aim-card__ref">{p.ref}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--ivory">
        <div className="container narrow">
          <ScriptureQuote text="Truly I say to you, This generation shall not pass, till all these things be fulfilled. Heaven and earth shall pass away, but my words shall not pass away." refText="Matthew 24:34–35" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Further Reading" title="Teachings on the Lord’s Return" />
          <div className="article-grid article-grid--2">
            {related.map((a, i) => <ArticleCard key={a.slug} article={a} delay={i * 100} />)}
          </div>
        </div>
      </section>

      <CtaBand title="Prepare to Welcome the Lord" text="Search the prophecies of the Bible together with us in a free online study." />
    </div>
  );
}
