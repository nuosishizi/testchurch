import React, { useState } from 'react';
import { Search, BookOpen, Clock, ArrowRight, Filter, Sparkles } from 'lucide-react';
import { BIBLE_TOPICS, CATEGORIES } from '../data/topics';

export default function TopicsPage({ onSelectArticle, navigateTo }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTopics = BIBLE_TOPICS.filter((topic) => {
    const matchesCategory = selectedCategory === 'all' || topic.category === selectedCategory;
    const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          topic.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          topic.scripture.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="topics-page">
      {/* Header Banner */}
      <section className="topics-header-section">
        <div className="container text-center">
          <div className="badge-pill gold-pill">
            <BookOpen size={14} />
            <span>Scripture Learning Library</span>
          </div>
          <h1 className="topics-page-title">Bible Topics & Articles</h1>
          <p className="topics-page-subtitle">
            Explore faithful biblical answers to life's most meaningful questions. Learn how God's Word speaks with power, comfort, and wisdom today.
          </p>

          {/* Search Bar */}
          <div className="topics-search-bar">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search topics by keyword (e.g. prayer, faith, prophecy, peace)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="clear-search-btn">
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Topics Content & Filters */}
      <section className="topics-main-section">
        <div className="container">
          {/* Category Tabs */}
          <div className="category-tabs-container">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`category-tab-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              >
                <span>{cat.name}</span>
                {cat.id !== 'all' && (
                  <span className="cat-count-pill">{cat.count}</span>
                )}
              </button>
            ))}
          </div>

          {/* Topics Grid */}
          {filteredTopics.length > 0 ? (
            <div className="topics-grid-layout">
              {filteredTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="article-card"
                  onClick={() => onSelectArticle(topic)}
                >
                  <div className="article-card-img-wrap">
                    <img src={topic.image} alt={topic.title} />
                    <span className="article-category-badge">{topic.categoryName}</span>
                  </div>

                  <div className="article-card-content">
                    <div className="article-card-meta">
                      <span className="article-read-time">
                        <Clock size={13} />
                        {topic.readTime}
                      </span>
                      <span className="dot-sep">·</span>
                      <span className="article-date">{topic.date}</span>
                    </div>

                    <h3 className="article-card-title">{topic.title}</h3>
                    <p className="article-card-scripture">"{topic.scripture}"</p>
                    <p className="article-card-summary">{topic.summary}</p>

                    <div className="article-card-bottom">
                      <span className="author-tag">By {topic.author}</span>
                      <span className="read-link">
                        Read More <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-results-box text-center">
              <BookOpen size={40} className="empty-icon" />
              <h3>No articles found</h3>
              <p>We couldn't find any articles matching "{searchQuery}". Try a different keyword or category.</p>
              <button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }} className="btn-reset-filter">
                Reset All Filters
              </button>
            </div>
          )}

          {/* Bottom Live Study Callout */}
          <div className="topics-bottom-invitation">
            <div className="invite-content">
              <h3>Have a Specific Bible Question?</h3>
              <p>
                Reading articles is inspiring, but having a friendly mentor guide you through Scripture live is life changing. Join our free Zoom Bible study!
              </p>
            </div>
            <button 
              onClick={() => navigateTo('register')}
              className="btn-topics-register"
            >
              <span>Join Free Live Study</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
