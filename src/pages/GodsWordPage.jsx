import { useMemo, useState } from 'react';
import { PageHero, CtaBand } from '../components/ui';
import ArticleCard from '../components/ArticleCard';
import { ARTICLES } from '../data/articles';

export default function GodsWordPage() {
  const categories = useMemo(() => ['All', ...new Set(ARTICLES.map((a) => a.category))], []);
  const [active, setActive] = useState('All');
  const list = active === 'All' ? ARTICLES : ARTICLES.filter((a) => a.category === active);

  return (
    <div>
      <PageHero
        eyebrow="God’s Word"
        title="Reflections & Bible Teachings"
        subtitle="“Your word is a lamp to my feet, and a light to my path.” — Psalm 119:105"
        image="images/bible-light.jpg"
      />

      <section className="section">
        <div className="container">
          <div className="filter-bar" role="tablist" aria-label="Filter articles by category">
            {categories.map((c) => (
              <button
                key={c}
                id={`filter-${c.toLowerCase().replace(/\W+/g, '-')}`}
                role="tab"
                aria-selected={active === c}
                className={`filter-chip ${active === c ? 'is-active' : ''}`}
                onClick={() => setActive(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="article-grid" key={active}>
            {list.map((a, i) => <ArticleCard key={a.slug} article={a} delay={i * 80} />)}
          </div>
        </div>
      </section>

      <CtaBand title="Go Deeper Together" text="Reading alone is good — studying together is even better. Join a free online Bible study." />
    </div>
  );
}
