import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import BeliefsPage from './pages/BeliefsPage';
import GodsWordPage from './pages/GodsWordPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import ReturnPage from './pages/ReturnPage';
import BibleStudyPage from './pages/BibleStudyPage';
import MembershipPage from './pages/MembershipPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import ThankYouPage from './pages/ThankYouPage';
import AdminPage from './pages/AdminPage';
import { ARTICLES } from './data/articles';
import { CHURCH } from './data/church';
import './App.css';

const TITLES = {
  home: `${CHURCH.name} | ${CHURCH.tagline}`,
  about: 'About Us',
  beliefs: 'Our Beliefs',
  word: 'God’s Word — Bible Teachings',
  return: 'The Return of Christ',
  'bible-study': 'Free Online Bible Study',
  membership: 'Membership',
  contact: 'Contact Us',
  privacy: 'Privacy Policy',
  'thank-you': 'Thank You',
  admin: 'Staff Portal',
};

/** Parse the URL hash into { route, article }. Unknown routes fall back to home. */
function parseHash() {
  const hash = decodeURIComponent(window.location.hash.replace(/^#\/?/, '')) || 'home';
  if (hash.startsWith('article-')) {
    const article = ARTICLES.find((a) => a.slug === hash.slice(8));
    if (article) return { route: 'article', article };
  }
  return { route: TITLES[hash] ? hash : 'home', article: null };
}

export default function App() {
  const [state, setState] = useState(parseHash);
  const [recentLead, setRecentLead] = useState(null);

  useEffect(() => {
    const onHash = () => {
      setState(parseHash());
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const { route, article } = state;

  useEffect(() => {
    const t = route === 'article' ? article.title : TITLES[route];
    document.title = route === 'home' ? t : `${t} | ${CHURCH.name}`;
  }, [route, article]);

  const handleSuccess = (lead) => {
    setRecentLead(lead);
    window.location.hash = 'thank-you';
  };

  if (route === 'admin') return <AdminPage />;

  const pages = {
    home: <HomePage />,
    about: <AboutPage />,
    beliefs: <BeliefsPage />,
    word: <GodsWordPage />,
    article: article && <ArticleDetailPage article={article} />,
    return: <ReturnPage />,
    'bible-study': <BibleStudyPage onSuccess={handleSuccess} />,
    membership: <MembershipPage />,
    contact: <ContactPage onSuccess={handleSuccess} />,
    privacy: <PrivacyPage />,
    'thank-you': <ThankYouPage lead={recentLead} />,
  };

  return (
    <div className="app">
      <a href="#main" className="skip-link" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus(); }}>Skip to content</a>
      <Navbar currentRoute={route} transparentTop />
      <main id="main" tabIndex={-1} key={route + (article?.slug || '')} className="page-enter">
        {pages[route]}
      </main>
      {route !== 'thank-you' && <Footer />}
    </div>
  );
}
