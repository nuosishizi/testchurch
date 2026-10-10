import React from 'react';
import { 
  ArrowLeft, 
  Clock, 
  BookOpen, 
  Share2, 
  MessageCircle, 
  Copy, 
  Sparkles, 
  ArrowRight,
  Bookmark,
  CheckCircle2
} from 'lucide-react';
import { BIBLE_TOPICS } from '../data/topics';

export default function ArticleDetailPage({ article, navigateTo, onSelectArticle }) {
  if (!article) {
    return (
      <div className="container py-12 text-center">
        <h2>Article Not Found</h2>
        <button onClick={() => navigateTo('topics')} className="btn-primary mt-4">
          Back to Topics
        </button>
      </div>
    );
  }

  const relatedArticles = BIBLE_TOPICS.filter(a => a.id !== article.id).slice(0, 2);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`Check out this Bible study article: "${article.title}" - ${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="article-detail-page">
      {/* Breadcrumb Navigation */}
      <div className="article-breadcrumb-bar">
        <div className="container breadcrumb-container">
          <button onClick={() => navigateTo('topics')} className="btn-back-link">
            <ArrowLeft size={16} />
            <span>Back to All Topics</span>
          </button>
          <div className="breadcrumb-trail">
            <span onClick={() => navigateTo('home')}>Home</span>
            <span className="bc-sep">/</span>
            <span onClick={() => navigateTo('topics')}>Bible Topics</span>
            <span className="bc-sep">/</span>
            <span className="bc-current">{article.categoryName}</span>
          </div>
        </div>
      </div>

      {/* Article Header */}
      <header className="article-header">
        <div className="container article-header-container">
          <div className="article-badge-row">
            <span className="article-cat-pill">{article.categoryName}</span>
            <span className="article-read-time">
              <Clock size={14} />
              {article.readTime}
            </span>
          </div>

          <h1 className="article-main-title">{article.title}</h1>

          <div className="article-author-bar">
            <div className="author-info">
              <div className="author-avatar">{article.author.charAt(0)}</div>
              <div>
                <span className="author-name">{article.author}</span>
                <span className="publish-date">{article.date}</span>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="article-share-actions">
              <button onClick={handleShare} className="share-icon-btn" title="Copy Link">
                <Copy size={16} />
                <span>Copy Link</span>
              </button>
              <button onClick={handleWhatsAppShare} className="share-icon-btn wa-share" title="Share to WhatsApp">
                <MessageCircle size={16} />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Article Featured Hero Image */}
      <div className="container article-hero-img-wrap">
        <img src={article.image} alt={article.title} className="article-cover-img" />
      </div>

      {/* Main Content Layout with Sidebar */}
      <div className="container article-body-layout">
        {/* Main Article Text */}
        <article className="article-body-content">
          {/* Key Scripture Callout */}
          <div className="scripture-callout-card">
            <div className="callout-icon">
              <BookOpen size={24} />
            </div>
            <div className="callout-text">
              <span className="callout-label">Key Scripture Reference</span>
              <p className="callout-quote">{article.scripture}</p>
            </div>
          </div>

          {/* Intro Lead */}
          <p className="article-lead-paragraph">{article.summary}</p>

          {/* Article Sections */}
          <div className="article-sections-list">
            {(article.sections || []).map((sec, idx) => (
              <section key={idx} className="article-section-block">
                <h2 className="section-block-title">{sec.heading}</h2>
                <p className="section-block-text">{sec.text}</p>
              </section>
            ))}
          </div>

          {/* Key Verse Highlight Box */}
          {article.keyVerse && (
            <div className="key-verse-highlight-box">
              <div className="verse-mark">“</div>
              <p className="verse-text">{article.keyVerse}</p>
              <span className="verse-footing">Meditate on this Scripture truth today</span>
            </div>
          )}

          {/* Bottom Mandatory Bible Study CTA (From Document Section 3.3) */}
          <div className="article-bottom-cta-box">
            <div className="bottom-cta-badge">
              <Sparkles size={16} />
              <span>Interactive Online Study</span>
            </div>
            <h3 className="bottom-cta-title">Want to Learn More About God's Word?</h3>
            <p className="bottom-cta-sub">
              Join our free online Bible study to explore Scripture together with caring believers in small, welcoming groups.
            </p>
            <button
              onClick={() => navigateTo('register')}
              className="btn-article-join"
            >
              <span>Join Free Bible Study</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </article>

        {/* Sticky Sidebar */}
        <aside className="article-sidebar">
          {/* Table of Contents */}
          <div className="sidebar-widget toc-widget">
            <h4 className="widget-title">In This Article</h4>
            <ul className="toc-list">
              {(article.sections || []).map((sec, idx) => (
                <li key={idx} className="toc-item">
                  <span>{sec.heading}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Free Bible Study Quick Widget */}
          <div className="sidebar-widget study-promo-widget">
            <div className="promo-pill">100% Free Live Zoom</div>
            <h4>Have Questions About This Passage?</h4>
            <p>Our weekly online study lets you discuss these topics directly with pastoral teachers.</p>
            <button
              onClick={() => navigateTo('register')}
              className="btn-sidebar-study"
            >
              Reserve Free Spot
            </button>
          </div>

          {/* Related Articles */}
          <div className="sidebar-widget related-widget">
            <h4 className="widget-title">Related Readings</h4>
            <div className="related-list">
              {relatedArticles.map((rel) => (
                <div 
                  key={rel.id} 
                  className="related-item"
                  onClick={() => onSelectArticle(rel)}
                >
                  <img src={rel.image} alt={rel.title} />
                  <div>
                    <span className="related-cat">{rel.categoryName}</span>
                    <h5 className="related-title">{rel.title}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
