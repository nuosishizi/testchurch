import { ArrowLeft, ArrowRight, Clock, BookOpen } from 'lucide-react';
import { Reveal, LogoMark } from '../components/ui';
import { asset } from '../utils/asset';
import ArticleCard from '../components/ArticleCard';
import { ARTICLES } from '../data/articles';

export default function ArticleDetailPage({ article }) {
  const others = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <article className="article-page">
      <header className="article-hero">
        <div className="article-hero__bg" style={{ backgroundImage: `url(${asset(article.image)})` }} />
        <div className="article-hero__overlay" />
        <div className="container narrow article-hero__inner">
          <a href="#word" className="back-link"><ArrowLeft size={16} /> All articles</a>
          <span className="eyebrow eyebrow--gold">{article.category}</span>
          <h1>{article.title}</h1>
          <div className="article-hero__meta">
            <span><Clock size={15} /> {article.readTime}</span>
            <span><BookOpen size={15} /> {article.keyVerse.ref}</span>
          </div>
        </div>
      </header>

      <div className="container narrow article-content">
        <Reveal as="figure" className="key-verse">
          <blockquote>“{article.keyVerse.text}”</blockquote>
          <figcaption>{article.keyVerse.ref}</figcaption>
        </Reveal>

        <div className="prose">
          {article.body.map((block, i) => {
            if (block.h) return <h2 key={i}>{block.h}</h2>;
            if (block.quote)
              return (
                <blockquote key={i} className="prose__quote">
                  “{block.quote}” <cite>— {block.ref}</cite>
                </blockquote>
              );
            return <p key={i}>{block.p}</p>;
          })}
        </div>

        <aside className="article-cta">
          <LogoMark size={48} />
          <div>
            <h3>Want to explore this topic further?</h3>
            <p>Join a free online Bible study and search the Scriptures together with us.</p>
          </div>
          <a href="#bible-study" className="btn btn-gold">Join Free <ArrowRight size={18} /></a>
        </aside>
      </div>

      <section className="section section--ivory">
        <div className="container">
          <h2 className="related-title">Continue Reading</h2>
          <div className="article-grid">
            {others.map((a, i) => <ArticleCard key={a.slug} article={a} delay={i * 80} />)}
          </div>
        </div>
      </section>
    </article>
  );
}
