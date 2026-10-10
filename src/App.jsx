import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import ThankYouPage from './pages/ThankYouPage';
import TopicsPage from './pages/TopicsPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import AdminPage from './pages/AdminPage';
import { BIBLE_TOPICS } from './data/topics';
import { MessageCircle } from 'lucide-react';
import './App.css';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState('home');
  const [currentArticle, setCurrentArticle] = useState(BIBLE_TOPICS[0]);
  const [recentLead, setRecentLead] = useState(null);

  // Sync route with browser hash for easy navigation
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      if (hash.startsWith('article-')) {
        const slug = hash.replace('article-', '');
        const found = BIBLE_TOPICS.find(a => a.slug === slug || a.id === slug);
        if (found) {
          setCurrentArticle(found);
          setCurrentRoute('article');
          return;
        }
      }
      setCurrentRoute(hash);
    };

    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (route, param = null) => {
    if (route === 'article' && param) {
      setCurrentArticle(param);
      window.location.hash = `article-${param.slug}`;
    } else {
      window.location.hash = route;
    }
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (article) => {
    setCurrentArticle(article);
    navigateTo('article', article);
  };

  const handleRegistrationSuccess = (newLead) => {
    setRecentLead(newLead);
    navigateTo('thank-you');
  };

  return (
    <div className="app-shell">
      {/* Show Navbar on all public pages */}
      {currentRoute !== 'admin' && (
        <Navbar currentRoute={currentRoute} navigateTo={navigateTo} />
      )}

      {/* Main Page Content Router */}
      <main className="main-content-area">
        {currentRoute === 'home' && (
          <HomePage 
            navigateTo={navigateTo} 
            onSelectArticle={handleSelectArticle} 
          />
        )}

        {currentRoute === 'register' && (
          <RegisterPage 
            onRegistrationSuccess={handleRegistrationSuccess} 
          />
        )}

        {currentRoute === 'thank-you' && (
          <ThankYouPage 
            lead={recentLead} 
            navigateTo={navigateTo} 
          />
        )}

        {currentRoute === 'topics' && (
          <TopicsPage 
            onSelectArticle={handleSelectArticle} 
            navigateTo={navigateTo} 
          />
        )}

        {currentRoute === 'article' && (
          <ArticleDetailPage 
            article={currentArticle} 
            navigateTo={navigateTo} 
            onSelectArticle={handleSelectArticle} 
          />
        )}

        {currentRoute === 'about' && (
          <AboutPage 
            navigateTo={navigateTo} 
          />
        )}

        {currentRoute === 'contact' && (
          <ContactPage 
            navigateTo={navigateTo} 
          />
        )}

        {currentRoute === 'privacy' && (
          <PrivacyPage 
            navigateTo={navigateTo} 
          />
        )}

        {currentRoute === 'admin' && (
          <AdminPage 
            navigateTo={navigateTo} 
          />
        )}
      </main>

      {/* Show Footer on public pages */}
      {currentRoute !== 'admin' && (
        <Footer navigateTo={navigateTo} />
      )}

      {/* Floating Instant WhatsApp Help Bubble (Only on public pages) */}
      {currentRoute !== 'admin' && (
        <a
          href="https://wa.me/14155550199?text=Hello!%20I'm%20visiting%20your%20website%20and%20have%20a%20question%20about%20the%20free%20online%20Bible%20study."
          target="_blank"
          rel="noopener noreferrer"
          className="floating-whatsapp-bubble"
          title="Chat directly on WhatsApp"
        >
          <div className="wa-bubble-inner">
            <MessageCircle size={26} />
            <span className="wa-tooltip">Questions? Chat on WhatsApp</span>
          </div>
        </a>
      )}
    </div>
  );
}
