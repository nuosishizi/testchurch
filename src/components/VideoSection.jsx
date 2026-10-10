import React, { useState } from 'react';
import { Play, Tv, CheckCircle, ExternalLink, Sparkles, BookOpen } from 'lucide-react';
import { CHURCH_VIDEOS, CHURCH_CHANNEL_INFO } from '../data/videos';

export default function VideoSection({ onJoinStudy }) {
  const [activeVideoId, setActiveVideoId] = useState(CHURCH_VIDEOS[0].id);

  const activeVideo = CHURCH_VIDEOS.find(v => v.id === activeVideoId) || CHURCH_VIDEOS[0];

  return (
    <section className="church-video-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-head text-center">
          <div className="badge-pill gold-pill">
            <Tv size={14} />
            <span>Church Media & Sermons</span>
          </div>
          <h2 className="section-title">Watch Our Church YouTube Videos</h2>
          <p className="section-subtitle">
            Watch weekly biblical expositions, devotional teachings, and see firsthand how our online community gathers around the Gospel.
          </p>
        </div>

        {/* Video Player Card */}
        <div className="video-player-container">
          <div className="video-main-column">
            {/* Embedded YouTube Player */}
            <div className="video-aspect-frame">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=0&rel=0&modestbranding=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="youtube-iframe"
              ></iframe>
            </div>

            {/* Video Details Bar */}
            <div className="video-meta-bar">
              <div className="video-meta-info">
                <span className="video-badge">{activeVideo.badge}</span>
                <h3 className="video-main-title">{activeVideo.title}</h3>
                <div className="video-subline">
                  <span>Speaker: <strong>{activeVideo.speaker}</strong></span>
                  <span className="dot-sep">·</span>
                  <span>Duration: {activeVideo.duration}</span>
                  <span className="dot-sep">·</span>
                  <span>{activeVideo.date}</span>
                </div>
              </div>

              <div className="video-cta-actions">
                <button 
                  onClick={onJoinStudy}
                  className="btn-video-join"
                >
                  <BookOpen size={16} />
                  <span>Join Discussion Live</span>
                </button>
              </div>
            </div>

            <p className="video-desc-text">{activeVideo.description}</p>
          </div>

          {/* Playlist / Channel Sidebar */}
          <div className="video-sidebar-column">
            {/* Channel Profile Box */}
            <div className="channel-profile-card">
              <div className="channel-avatar">
                <Tv size={22} />
              </div>
              <div className="channel-info">
                <h4>{CHURCH_CHANNEL_INFO.name}</h4>
                <p>{CHURCH_CHANNEL_INFO.handle} · {CHURCH_CHANNEL_INFO.subscribers}</p>
              </div>
              <a 
                href={CHURCH_CHANNEL_INFO.subscribeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="channel-sub-btn"
              >
                <span>YouTube</span>
                <ExternalLink size={13} />
              </a>
            </div>

            {/* Playlist Cards */}
            <div className="playlist-header">
              <span className="playlist-title">Select a Teaching to Watch</span>
              <span className="playlist-count">{CHURCH_VIDEOS.length} videos</span>
            </div>

            <div className="playlist-list">
              {CHURCH_VIDEOS.map((video) => {
                const isSelected = video.id === activeVideoId;
                return (
                  <div
                    key={video.id}
                    onClick={() => setActiveVideoId(video.id)}
                    className={`playlist-item ${isSelected ? 'active' : ''}`}
                  >
                    <div className="playlist-item-thumbnail">
                      <img 
                        src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`} 
                        alt={video.title} 
                        onError={(e) => {
                          e.target.src = `${import.meta.env.BASE_URL}community-discussion.jpg`;
                        }}
                      />
                      <div className="play-overlay">
                        <Play size={16} fill="white" />
                      </div>
                      <span className="thumb-duration">{video.duration}</span>
                    </div>

                    <div className="playlist-item-details">
                      <span className="playlist-item-tag">{video.badge}</span>
                      <h5 className="playlist-item-title">{video.title}</h5>
                      <span className="playlist-item-speaker">{video.speaker}</span>
                    </div>

                    {isSelected && (
                      <div className="playlist-active-indicator">
                        <CheckCircle size={18} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Live Study Invitation Callout */}
            <div className="sidebar-invitation-box">
              <div className="invite-icon">
                <Sparkles size={20} />
              </div>
              <div>
                <h5>Prefer Interactive Discussion?</h5>
                <p>Videos are great, but discussing Scripture live with brothers and sisters brings it to life.</p>
                <button 
                  onClick={onJoinStudy}
                  className="invite-link-btn"
                >
                  Register for Live Zoom Study →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
