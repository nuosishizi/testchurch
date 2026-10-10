import React from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  Users, 
  HelpCircle, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Video, 
  Calendar,
  MessageCircle,
  Quote
} from 'lucide-react';
import VideoSection from '../components/VideoSection';
import { BIBLE_TOPICS } from '../data/topics';

export default function HomePage({ navigateTo, onSelectArticle }) {
  const featuredTopics = BIBLE_TOPICS.slice(0, 6);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          {/* Left Column: Headlines & CTAs */}
          <div className="hero-content">
            <div className="badge-pill sage-pill">
              <Sparkles size={14} />
              <span>100% Free · Live Online · Everyone Welcome</span>
            </div>

            <h1 className="hero-title">
              Grow in Faith. <br />
              <span className="gold-text">Discover God's Word.</span>
            </h1>

            <p className="hero-subtitle">
              Join our free online Bible study, explore Scripture with caring guides, ask honest questions without judgment, and grow in your personal walk with Christ.
            </p>

            <div className="hero-actions">
              <button 
                onClick={() => navigateTo('register')}
                className="btn-hero-primary"
              >
                <span>Join Free Bible Study</span>
                <ArrowRight size={18} />
              </button>

              <button 
                onClick={() => navigateTo('topics')}
                className="btn-hero-secondary"
              >
                <BookOpen size={18} />
                <span>Explore Bible Topics</span>
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="hero-trust-list">
              <div className="trust-item">
                <CheckCircle2 size={16} className="trust-icon" />
                <span>No tuition or hidden fees</span>
              </div>
              <div className="trust-item">
                <CheckCircle2 size={16} className="trust-icon" />
                <span>Beginners completely welcome</span>
              </div>
              <div className="trust-item">
                <CheckCircle2 size={16} className="trust-icon" />
                <span>Interactive live Zoom groups</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase */}
          <div className="hero-visual">
            <div className="hero-image-wrapper">
              <img 
                src={`${import.meta.env.BASE_URL}hero-bible-study.jpg`} 
                alt="Believers gathered in warm online Bible study with open Bible" 
                className="hero-main-img"
              />
              <div className="hero-floating-card top-float">
                <div className="float-icon-box">
                  <Video size={18} />
                </div>
                <div>
                  <span className="float-label">Weekly Live Sessions</span>
                  <span className="float-value">Small Groups via Zoom</span>
                </div>
              </div>

              <div className="hero-floating-card bottom-float">
                <div className="float-icon-box gold-icon">
                  <Users size={18} />
                </div>
                <div>
                  <span className="float-label">Global Fellowship</span>
                  <span className="float-value">US, Canada & Worldwide</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHURCH YOUTUBE VIDEO SECTION */}
      <VideoSection onJoinStudy={() => navigateTo('register')} />

      {/* WHY JOIN SECTION */}
      <section className="why-join-section">
        <div className="container">
          <div className="section-head text-center">
            <div className="badge-pill sage-pill">
              <BookOpen size={14} />
              <span>Why Study With Us</span>
            </div>
            <h2 className="section-title">A Welcoming Place to Learn Scripture</h2>
            <p className="section-subtitle">
              Whether you are opening the Bible for the very first time or seeking deeper theological clarity, our interactive classes are designed for you.
            </p>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon-wrapper">
                <BookOpen size={26} />
              </div>
              <h3 className="benefit-title">Explore Scripture Together</h3>
              <p className="benefit-text">
                Read verse by verse in historical and spiritual context, discovering God's timeless promises for your everyday life and challenges.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon-wrapper">
                <Sparkles size={26} />
              </div>
              <h3 className="benefit-title">Understand Core Teachings</h3>
              <p className="benefit-text">
                Gain crystal clarity on essential Christian doctrines: the Gospel of grace, faith, prayer, forgiveness, and biblical prophecy.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon-wrapper">
                <HelpCircle size={26} />
              </div>
              <h3 className="benefit-title">Ask Questions Freely</h3>
              <p className="benefit-text">
                Every question is respected. We foster a safe, warm environment where honest spiritual questions and doubts are addressed directly from the Word.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon-wrapper">
                <Users size={26} />
              </div>
              <h3 className="benefit-title">Connect with Believers</h3>
              <p className="benefit-text">
                Build uplifting friendships with brothers and sisters across North America and beyond who encourage one another in prayer and love.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED TOPICS PREVIEW */}
      <section className="featured-topics-section">
        <div className="container">
          <div className="topics-header-row">
            <div>
              <div className="badge-pill gold-pill">
                <BookOpen size={14} />
                <span>Biblical Insights</span>
              </div>
              <h2 className="section-title">Explore Featured Bible Topics</h2>
              <p className="section-subtitle">
                Read our foundational articles on prayer, Christian living, prophecy, and understanding Scripture.
              </p>
            </div>

            <button 
              onClick={() => navigateTo('topics')}
              className="view-all-topics-btn"
            >
              <span>View All Topics</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="topics-cards-grid">
            {featuredTopics.map((topic) => (
              <div 
                key={topic.id}
                className="topic-card"
                onClick={() => onSelectArticle(topic)}
              >
                <div className="topic-card-image-box">
                  <img src={topic.image} alt={topic.title} />
                  <span className="topic-category-tag">{topic.categoryName}</span>
                </div>
                <div className="topic-card-body">
                  <div className="topic-card-meta">
                    <span className="topic-read-time">
                      <Clock size={13} />
                      {topic.readTime}
                    </span>
                    <span className="dot-sep">·</span>
                    <span className="topic-date">{topic.date}</span>
                  </div>

                  <h3 className="topic-card-title">{topic.title}</h3>
                  <p className="topic-card-summary">{topic.summary}</p>

                  <div className="topic-card-footer">
                    <span className="read-more-text">Read Article</span>
                    <ArrowRight size={14} className="read-more-arrow" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="how-it-works-card">
            <div className="section-head text-center">
              <div className="badge-pill sage-pill">
                <Calendar size={14} />
                <span>Simple 3-Step Process</span>
              </div>
              <h2 className="section-title">How Free Online Bible Study Works</h2>
              <p className="section-subtitle">
                Joining takes less than a minute. Here is what to expect after you submit your free registration.
              </p>
            </div>

            <div className="steps-grid">
              <div className="step-card">
                <div className="step-number">1</div>
                <h4>Complete Free Registration</h4>
                <p>Fill out the quick 60-second form with your name and preferred study time. No credit card or fee ever required.</p>
              </div>

              <div className="step-card">
                <div className="step-number">2</div>
                <h4>Receive Your Meeting Link</h4>
                <p>Our study coordinator connects with you via WhatsApp or Email to share the private Zoom link and introductory reading.</p>
              </div>

              <div className="step-card">
                <div className="step-number">3</div>
                <h4>Join the Live Fellowship</h4>
                <p>Log in at your chosen time. Listen quietly or participate in discussions—whatever makes you feel most comfortable.</p>
              </div>
            </div>

            <div className="how-cta-center">
              <button 
                onClick={() => navigateTo('register')}
                className="btn-large-cta"
              >
                <span>Reserve Your Free Spot Now</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PARTICIPANT TESTIMONIALS */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-head text-center">
            <h2 className="section-title">What Participants Say</h2>
            <p className="section-subtitle">Real experiences from believers who joined our online fellowship.</p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <Quote size={28} className="quote-mark" />
              <p className="testimonial-text">
                "I was intimidated to read the Bible on my own. This online group explained the historical background so simply, and everyone was so patient with my beginner questions."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">EM</div>
                <div>
                  <strong>Emily M.</strong>
                  <span>Toronto, Canada</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <Quote size={28} className="quote-mark" />
              <p className="testimonial-text">
                "Between long work hours and family, attending in-person classes was tough. Having weekly live Zoom sessions with passionate teachers has revived my spiritual walk."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">JW</div>
                <div>
                  <strong>James W.</strong>
                  <span>Dallas, Texas</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <Quote size={28} className="quote-mark" />
              <p className="testimonial-text">
                "What I appreciate most is the focus purely on Scripture. There is no commercial agenda or pressure—just sincere prayer, Bible reading, and genuine Christian love."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">CL</div>
                <div>
                  <strong>Carla L.</strong>
                  <span>Montreal, Canada</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="bottom-cta-banner">
        <div className="container">
          <div className="cta-banner-box">
            <div className="cta-banner-text">
              <h2>Ready to Discover God's Word?</h2>
              <p>
                Take the next step in your faith journey today. All classes are 100% free, held live online, and open to all.
              </p>
            </div>
            <div className="cta-banner-buttons">
              <button 
                onClick={() => navigateTo('register')}
                className="btn-banner-primary"
              >
                <span>Join Free Bible Study</span>
                <ArrowRight size={18} />
              </button>
              <a 
                href="https://wa.me/14155550199?text=Hello!%20I'm%20interested%20in%20joining%20your%20free%20online%20Bible%20study.%20Could%20you%20please%20share%20more%20information?"
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-banner-whatsapp"
              >
                <MessageCircle size={18} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
