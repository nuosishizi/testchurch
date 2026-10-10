import React from 'react';
import { 
  Heart, 
  BookOpen, 
  ShieldCheck, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Globe
} from 'lucide-react';

export default function AboutPage({ navigateTo }) {
  const beliefs = [
    {
      title: "The Authority of Scripture",
      desc: "We believe the Holy Bible (Old and New Testaments) is the inspired, authoritative Word of God—our complete guide for faith, salvation, and daily living."
    },
    {
      title: "One Sovereign God in Three Persons",
      desc: "We believe in one eternal God, Creator of all things, who exists in three distinct persons: the Father, the Son, and the Holy Spirit."
    },
    {
      title: "Salvation by Grace Through Faith",
      desc: "We believe salvation is a free gift received solely by God's unmerited grace through personal faith in Jesus Christ's death and bodily resurrection."
    },
    {
      title: "The Transforming Work of the Spirit",
      desc: "We believe the Holy Spirit indwells every believer, empowering us to walk in genuine love, holiness, truth, and spiritual endurance."
    },
    {
      title: "The Worldwide Body of Christ",
      desc: "We believe in the spiritual unity of all true believers across cultural, geographic, and denominational boundaries."
    }
  ];

  return (
    <div className="about-page">
      {/* Header Banner */}
      <section className="about-hero-section">
        <div className="container text-center">
          <div className="badge-pill sage-pill">
            <Heart size={14} />
            <span>Our Mission & Calling</span>
          </div>
          <h1 className="about-title">About Grace & Truth Bible Study</h1>
          <p className="about-subtitle">
            An independent, non-profit Christian educational community dedicated to opening the treasures of Scripture for truth-seekers worldwide.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-section">
        <div className="container mission-grid">
          <div className="mission-content">
            <div className="badge-pill gold-pill">
              <Sparkles size={14} />
              <span>Who We Are</span>
            </div>
            <h2>Equipping Believers with the Clear Truth of God's Word</h2>
            <p>
              In a world filled with shifting opinions and confusion, our longing is to anchor hearts to the unshakeable rock of biblical truth. We are an international non-profit ministry serving seekers, new Christians, and lifelong disciples.
            </p>
            <p>
              Our online Bible studies bring together believers from across the United States, Canada, and around the world into intimate, respectful Zoom groups. Every class is completely free, grounded in the Word of God, and guided by experienced, compassionate teachers.
            </p>

            <div className="mission-stats-row">
              <div className="stat-box">
                <span className="stat-number">100%</span>
                <span className="stat-label">Free Classes</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">12+</span>
                <span className="stat-label">Weekly Groups</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">30+</span>
                <span className="stat-label">Countries Reached</span>
              </div>
            </div>
          </div>

          <div className="mission-visual">
            <img src={`${import.meta.env.BASE_URL}hero-bible-study.jpg`} alt="Bible Study Fellowship Community" className="about-visual-img" />
          </div>
        </div>
      </section>

      {/* Statement of Faith Section */}
      <section className="statement-of-faith-section">
        <div className="container">
          <div className="section-head text-center">
            <div className="badge-pill sage-pill">
              <BookOpen size={14} />
              <span>What We Believe</span>
            </div>
            <h2 className="section-title">Our Statement of Faith</h2>
            <p className="section-subtitle">
              We stand firmly in historic Christian orthodoxy, centered on the Gospel of Jesus Christ.
            </p>
          </div>

          <div className="beliefs-grid">
            {beliefs.map((b, idx) => (
              <div key={idx} className="belief-card">
                <div className="belief-num">{idx + 1}</div>
                <h3 className="belief-card-title">{b.title}</h3>
                <p className="belief-card-desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership & Teaching Team */}
      <section className="team-section">
        <div className="container">
          <div className="section-head text-center">
            <div className="badge-pill gold-pill">
              <Users size={14} />
              <span>Our Teachers</span>
            </div>
            <h2 className="section-title">Devoted Pastoral Teachers</h2>
            <p className="section-subtitle">
              Experienced leaders who care about your individual spiritual growth.
            </p>
          </div>

          <div className="team-grid">
            <div className="team-member-card">
              <div className="member-avatar">DM</div>
              <h4>Pastor David Miller</h4>
              <span className="member-role">Lead Bible Teacher</span>
              <p>Over 20 years of pastoral ministry and expositional preaching with a focus on Romans and the Gospels.</p>
            </div>

            <div className="team-member-card">
              <div className="member-avatar">SJ</div>
              <h4>Sarah Jenkins</h4>
              <span className="member-role">Online Community Director</span>
              <p>Coordinates weekly small group schedules and ensures every newcomer receives warm, personal support.</p>
            </div>

            <div className="team-member-card">
              <div className="member-avatar">TW</div>
              <h4>Thomas Wright</h4>
              <span className="member-role">Elder & Counselor</span>
              <p>Passionate about guiding beginners through the basics of prayer, spiritual warfare, and Christian discipleship.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Call to Action */}
      <section className="about-cta-section">
        <div className="container text-center">
          <h2>Come Study the Word With Us</h2>
          <p>You don't need theological training or special knowledge. Just bring an open heart and your questions.</p>
          <button onClick={() => navigateTo('register')} className="btn-hero-primary">
            <span>Register for Free Study</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}
