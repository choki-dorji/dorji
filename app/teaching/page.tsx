'use client'

import Link from 'next/link'
import { useState } from 'react'

const modules = [
  {
    code: '01',
    title: 'Blockchain',
    category: 'Blockchain',
    description:
      'Explore distributed ledgers, cryptography, consensus mechanisms, digital tokens and smart contracts.',
    topics: ['Cryptography', 'Consensus', 'Smart contracts'],
  },
  {
    code: '02',
    title: 'Cybersecurity',
    category: 'Security',
    description:
      'Understand security threats and learn approaches to protecting systems, networks and information.',
    topics: ['Security threats', 'Privacy', 'Risk management'],
  },
  {
    code: '03',
    title: 'Backend Development with Go',
    category: 'Development',
    description:
      'Build backend services using Go, with a focus on APIs, database integration and concurrency.',
    topics: ['Go', 'REST APIs', 'Concurrency'],
  },
  {
    code: '04',
    title: 'Algorithms and Data Structures',
    category: 'Computing',
    description:
      'Develop problem-solving skills through data structures, algorithm design and complexity analysis.',
    topics: ['Data structures', 'Algorithms', 'Complexity'],
  },
  {
    code: '05',
    title: 'Programming Fundamentals',
    category: 'Development',
    description:
      'Learn programming with JavaScript through practical exercises in logic and problem solving.',
    topics: ['JavaScript', 'Functions', 'Problem solving'],
  },
  {
    code: '06',
    title: 'Full-stack Development',
    category: 'Development',
    description:
      'Connect user interfaces, backend services and databases to build complete web applications.',
    topics: ['Frontend', 'Backend', 'Integration'],
  },
  {
    code: '07',
    title: 'Software Engineering',
    category: 'Computing',
    description:
      'Study how software is planned, designed, developed and tested throughout its life cycle.',
    topics: ['Requirements', 'Architecture', 'Testing'],
  },
  {
    code: '08',
    title: 'Project Management',
    category: 'Management',
    description:
      'Plan and manage software projects using Agile practices, teamwork and iterative delivery.',
    topics: ['Agile', 'Scrum', 'Project planning'],
  },
  {
    code: '09',
    title: 'Database',
    category: 'Computing',
    description:
      'Design relational databases and use SQL to store, retrieve and manage structured information.',
    topics: ['SQL', 'Data modelling', 'Normalisation'],
  },
]

const categories = [
  'All',
  'Development',
  'Computing',
  'Blockchain',
  'Security',
  'Management',
]

export default function TeachingPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const search = query.trim().toLowerCase()

  const visibleModules = modules.filter((module) => {
    const matchesCategory =
      category === 'All' || module.category === category

    const matchesSearch = [
      module.title,
      module.description,
      module.category,
      ...module.topics,
    ]
      .join(' ')
      .toLowerCase()
      .includes(search)

    return matchesCategory && matchesSearch
  })

  function resetFilters() {
    setQuery('')
    setCategory('All')
  }

  return (
    <main className="teaching-page">
      <div className="teaching-container">
        <header className="page-nav">
          <Link href="/#teaching" className="back-link">
            Back to dashboard
          </Link>

          <span className="site-name">CHOKI DORJI / TEACHING</span>
        </header>

        <section className="teaching-intro" aria-labelledby="page-title">
          <div className="intro-copy">
            <p className="eyebrow">TEACHING AND LEARNING</p>

            <h1 id="page-title">
              Learn the concept.
              <br />
              <span>Build the understanding.</span>
            </h1>

            <p className="intro-description">
              Modules I teach across programming, software engineering,
              blockchain and cybersecurity. My approach connects theory
              with demonstrations, guided practice and experimentation.
            </p>
          </div>

          <div className="module-count">
            <strong>{String(modules.length).padStart(2, '0')}</strong>
            <span>Modules taught</span>
          </div>
        </section>

        <section className="module-section" aria-labelledby="modules-title">
          <div className="module-toolbar">
            <div>
              <p className="eyebrow">EXPLORE THE SUBJECTS</p>
              <h2 id="modules-title">Teaching modules</h2>
            </div>

            <div className="search-field">
              <label htmlFor="module-search">Search modules</label>
              <input
                id="module-search"
                type="search"
                placeholder="Try Go, security or SQL"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
          </div>

          <div className="filters" role="group" aria-label="Module categories">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                className={category === item ? 'filter active' : 'filter'}
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <p className="results-count" role="status">
            Showing {visibleModules.length} of {modules.length} modules
          </p>

          {visibleModules.length > 0 ? (
            <div className="modules-grid">
              {visibleModules.map((module) => (
                <article className="module-card" key={module.code}>
                  <div className="card-top">
                    <span className="module-number">{module.code}</span>
                    <span className="module-category">
                      {module.category}
                    </span>
                  </div>

                  <h3>{module.title}</h3>
                  <p className="module-description">{module.description}</p>

                  <ul className="topic-list" aria-label="Topics">
                    {module.topics.map((topic) => (
                      <li key={topic}>{topic}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No modules found</h3>
              <p>Try another search term or choose a different category.</p>
              <button type="button" onClick={resetFilters}>
                Clear filters
              </button>
            </div>
          )}
        </section>

        <footer className="teaching-footer">
          <p>From concepts to practical understanding.</p>
          <Link href="/">Return to dashboard</Link>
        </footer>
      </div>

      <style jsx>{`
        .teaching-page {
          --page-bg: #090909;
          --card-bg: #111111;
          --text: #f5f5f5;
          --muted: #a3a3a3;
          --line: #2b2b2b;

          min-height: 100vh;
          background: var(--page-bg);
          color: var(--text);
          font-family: inherit;
        }

        .teaching-page,
        .teaching-page * {
          box-sizing: border-box;
        }

        .teaching-container {
          width: min(1200px, calc(100% - 48px));
          margin: 0 auto;
        }

        .page-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 28px 0;
          border-bottom: 1px solid var(--line);
        }

        .page-nav :global(a),
        .teaching-footer :global(a) {
          color: var(--text);
          font-size: 13px;
          text-decoration: none;
          text-underline-offset: 5px;
        }

        .page-nav :global(a:hover),
        .teaching-footer :global(a:hover) {
          text-decoration: underline;
        }

        .site-name {
          color: var(--muted);
          font-size: 10px;
          letter-spacing: 0.13em;
        }

        .teaching-intro {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 48px;
          padding: 88px 0;
          border-bottom: 1px solid var(--line);
          animation: enter 500ms ease both;
        }

        .intro-copy {
          max-width: 780px;
        }

        .eyebrow {
          margin: 0 0 18px;
          color: var(--muted);
          font-size: 10px;
          font-weight: 600;
          line-height: 1.6;
          letter-spacing: 0.16em;
        }

        h1 {
          margin: 0;
          font-size: clamp(34px, 5vw, 62px);
          font-weight: 500;
          line-height: 1.12;
          letter-spacing: -0.045em;
        }

        h1 span {
          color: var(--muted);
        }

        .intro-description {
          max-width: 620px;
          margin: 24px 0 0;
          color: var(--muted);
          font-size: 16px;
          line-height: 1.8;
        }

        .module-count {
          display: grid;
          flex-shrink: 0;
          gap: 8px;
          padding-left: 36px;
          border-left: 1px solid var(--line);
        }

        .module-count strong {
          font-size: 76px;
          font-weight: 500;
          line-height: 1;
          letter-spacing: -0.07em;
        }

        .module-count span {
          color: var(--muted);
          font-size: 12px;
        }

        .module-section {
          padding: 56px 0 72px;
        }

        .module-toolbar {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
        }

        .module-toolbar .eyebrow {
          margin-bottom: 10px;
        }

        h2 {
          margin: 0;
          font-size: 30px;
          font-weight: 500;
          letter-spacing: -0.03em;
        }

        .search-field {
          display: grid;
          gap: 9px;
          width: min(100%, 320px);
        }

        .search-field label {
          color: var(--muted);
          font-size: 12px;
        }

        .search-field input {
          width: 100%;
          min-height: 46px;
          padding: 12px 15px;
          border: 1px solid var(--line);
          border-radius: 10px;
          background: var(--card-bg);
          color: var(--text);
          font: inherit;
          font-size: 14px;
          color-scheme: dark;
        }

        .search-field input::placeholder {
          color: #858585;
        }

        .filters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 30px;
        }

        .filter {
          min-height: 42px;
          padding: 10px 17px;
          border: 1px solid var(--line);
          border-radius: 999px;
          background: transparent;
          color: var(--muted);
          font: inherit;
          font-size: 12px;
          cursor: pointer;
          transition:
            color 180ms ease,
            background 180ms ease,
            border-color 180ms ease;
        }

        .filter:hover {
          color: var(--text);
          border-color: #777;
        }

        .filter.active {
          border-color: var(--text);
          background: var(--text);
          color: var(--page-bg);
        }

        .results-count {
          margin: 24px 0 18px;
          color: var(--muted);
          font-size: 12px;
        }

        .modules-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .module-card {
          display: flex;
          flex-direction: column;
          min-width: 0;
          padding: 26px;
          border: 1px solid var(--line);
          border-radius: 16px;
          background: var(--card-bg);
          animation: enter 350ms ease both;
          transition:
            transform 220ms ease,
            border-color 220ms ease,
            background 220ms ease;
        }

        .card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 32px;
        }

        .module-number {
          color: var(--muted);
          font-family: monospace;
          font-size: 12px;
        }

        .module-category {
          padding: 5px 9px;
          border: 1px solid var(--line);
          border-radius: 6px;
          color: var(--muted);
          font-size: 10px;
        }

        .module-card h3 {
          margin: 0 0 14px;
          font-size: 22px;
          font-weight: 500;
          line-height: 1.3;
          letter-spacing: -0.025em;
        }

        .module-description {
          margin: 0 0 28px;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.75;
        }

        .topic-list {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin: auto 0 0;
          padding: 20px 0 0;
          border-top: 1px solid var(--line);
          list-style: none;
        }

        .topic-list li {
          padding: 5px 8px;
          border-radius: 5px;
          background: #202020;
          color: #c8c8c8;
          font-size: 10px;
          line-height: 1.5;
        }

        .empty-state {
          padding: 60px 24px;
          border: 1px dashed var(--line);
          border-radius: 16px;
          text-align: center;
        }

        .empty-state h3 {
          margin: 0 0 10px;
          font-size: 22px;
        }

        .empty-state p {
          color: var(--muted);
          line-height: 1.6;
        }

        .empty-state button {
          margin-top: 12px;
          padding: 12px 18px;
          border: 0;
          border-radius: 8px;
          background: var(--text);
          color: var(--page-bg);
          font: inherit;
          font-size: 13px;
          cursor: pointer;
        }

        .teaching-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 26px 0;
          border-top: 1px solid var(--line);
        }

        .teaching-footer p {
          margin: 0;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.6;
        }

        button:focus-visible,
        input:focus-visible,
        .teaching-page :global(a:focus-visible) {
          outline: 2px solid var(--text);
          outline-offset: 4px;
        }

        @media (hover: hover) {
          .module-card:hover {
            transform: translateY(-4px);
            border-color: #666;
            background: #161616;
          }
        }

        @keyframes enter {
          from {
            opacity: 0;
            translate: 0 12px;
          }
          to {
            opacity: 1;
            translate: 0 0;
          }
        }

        @media (max-width: 960px) {
          .modules-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .teaching-intro {
            gap: 24px;
          }

          .module-count {
            padding-left: 24px;
          }
        }

        @media (max-width: 640px) {
          .teaching-container {
            width: calc(100% - 32px);
          }

          .page-nav {
            align-items: flex-start;
            flex-direction: column;
            gap: 12px;
          }

          .teaching-intro {
            align-items: flex-start;
            flex-direction: column;
            padding: 48px 0;
          }

          .module-count {
            display: flex;
            align-items: baseline;
            gap: 12px;
            padding: 0;
            border: 0;
          }

          .module-count strong {
            font-size: 44px;
          }

          .module-toolbar {
            align-items: stretch;
            flex-direction: column;
          }

          .search-field {
            width: 100%;
          }

          .modules-grid {
            grid-template-columns: 1fr;
          }

          .teaching-footer {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .teaching-intro,
          .module-card {
            animation: none;
          }

          .module-card,
          .filter {
            transition: none;
          }

          .module-card:hover {
            transform: none;
          }
        }
      `}</style>
    </main>
  )
}