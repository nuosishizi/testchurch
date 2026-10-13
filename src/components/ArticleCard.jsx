import { ArrowRight, Clock } from 'lucide-react';
import { Reveal } from './ui';
import { asset } from '../utils/asset';

export default function ArticleCard({ article, delay = 0 }) {
  return (
    <Reveal delay={delay} className="article-card">
      <a href={`#article-${article.slug}`} className="article-card__link" aria-label={article.title}>
        <div className="article-card__media">
          <img src={asset(article.image)} alt="" loading="lazy" />
          <span className="article-card__cat">{article.category}</span>
        </div>
        <div className="article-card__body">
          <h3>{article.title}</h3>
          <p>{article.excerpt}</p>
          <div className="article-card__meta">
            <span><Clock size={14} /> {article.readTime}</span>
            <span className="article-card__more">Read <ArrowRight size={15} /></span>
          </div>
        </div>
      </a>
    </Reveal>
  );
}
