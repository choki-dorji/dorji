'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Blocks,
  Braces,
  CheckCircle2,
  ChevronRight,
  Code2,
  Database,
  FolderKanban,
  GitBranch,
  Globe2,
  Layers3,
  LockKeyhole,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from 'lucide-react'

import ConsensusLabClient from './lab-client'
import MerkleTamperSimulation from '../merkle-tamper-simulation'
import { modules, concepts } from './modules.json'

type Screen =
  | 'modules'
  | 'blockchain'
  | 'consensus'
  | 'transaction-manipulation'

const iconMap = {
  Blocks,
  Braces,
  CheckCircle2,
  Code2,
  Database,
  FolderKanban,
  GitBranch,
  Globe2,
  Layers3,
  LockKeyhole,
  Network,
  ShieldCheck,
  Sparkles,
  WalletCards,
}

function getIcon(name: string) {
  return iconMap[name as keyof typeof iconMap] ?? Blocks
}

function getConceptScreen(id: string): Screen | null {
  switch (id) {
    case 'consensus':
      return 'consensus'
    case 'transaction-manipulation':
      return 'transaction-manipulation'
    default:
      return null
  }
}

export default function ModuleLabClient() {
  const [screen, setScreen] = useState<Screen>('modules')
  const [query, setQuery] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    // Preserve existing protocol simulation links.
    if (params.get('protocol') && params.get('mode') === 'simulate') {
      setScreen('consensus')
      return
    }

    // Optional direct link:
    // /lab?concept=transaction-manipulation
    const conceptScreen = getConceptScreen(params.get('concept') ?? '')

    if (conceptScreen) {
      setScreen(conceptScreen)
    }
  }, [])

  const filteredConcepts = concepts.filter((concept) =>
    `${concept.name} ${concept.description}`
      .toLowerCase()
      .includes(query.trim().toLowerCase())
  )

  const availableModules = modules.filter(
    (module) => module.available && module.id === 'blockchain'
  ).length

  const availableConcepts = concepts.filter(
    (concept) => concept.available && getConceptScreen(concept.id) !== null
  ).length

  const isConceptScreen =
    screen === 'consensus' || screen === 'transaction-manipulation'

  function openScreen(nextScreen: Screen) {
    setScreen(nextScreen)
  }

  return (
    <main className="module-lab">
      <header className="module-header">
        <button
          type="button"
          className="module-brand"
          onClick={() => openScreen('modules')}
          aria-label="Open module library"
        >
          <span>LL</span>

          <div>
            <b>LEARNING LAB</b>
            <small>BY CHOKI DORJI</small>
          </div>
        </button>

        <div className="module-status">
          INTERACTIVE LEARNING ENVIRONMENT
        </div>

        {screen !== 'modules' && (
          <button
            type="button"
            className="header-back"
            onClick={() =>
              openScreen(isConceptScreen ? 'blockchain' : 'modules')
            }
          >
            <ArrowLeft size={15} aria-hidden="true" />
            {isConceptScreen ? 'Blockchain library' : 'All modules'}
          </button>
        )}
      </header>

      {screen === 'modules' && (
        <section className="module-screen">
          <div className="module-hero">
            <div>
              <p className="eyebrow">EXPLORE BY SUBJECT</p>

              <h1>
                Learn technology by
                <em> seeing it happen.</em>
              </h1>

              <p className="hero-description">
                Select a module and explore its concepts through visual
                explanations, guided activities and interactive simulations.
              </p>
            </div>

            <aside className="hero-summary">
              <Sparkles size={20} aria-hidden="true" />
              <span>LEARNING APPROACH</span>
              <strong>Read. Observe. Interact. Reflect.</strong>
              <p>
                Connect technical explanations with events you can observe
                and experiments you can try.
              </p>
            </aside>
          </div>

          <div className="section-heading">
            <div>
              <p className="eyebrow">MODULE LIBRARY</p>
              <h2>Choose your learning module</h2>
            </div>

            <span>
              {String(availableModules).padStart(2, '0')} AVAILABLE /{' '}
              {String(modules.length).padStart(2, '0')} MODULES
            </span>
          </div>

          <div className="module-grid">
            {modules.map((module, index) => {
              const Icon = getIcon(module.icon)
              const canOpen =
                module.available && module.id === 'blockchain'

              return (
                <article
                  key={module.id}
                  className={`module-card ${canOpen ? 'available' : 'locked'}`}
                  style={
                    { '--card-accent': module.accent } as CSSProperties
                  }
                >
                  <div className="card-number" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="module-icon">
                    <Icon size={25} aria-hidden="true" />
                  </div>

                  <span className="module-code">
                    MODULE / {module.code}
                  </span>

                  <h3>{module.name}</h3>
                  <p>{module.description}</p>

                  <div className="module-meta">
                    <span>
                      {canOpen
                        ? `${availableConcepts} ${
                            availableConcepts === 1 ? 'concept' : 'concepts'
                          } available`
                        : 'Content being prepared'}
                    </span>

                    <span className={canOpen ? 'status-ready' : 'status-soon'}>
                      {canOpen ? 'AVAILABLE' : 'COMING SOON'}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="card-button"
                    disabled={!canOpen}
                    onClick={() => {
                      setQuery('')
                      openScreen('blockchain')
                    }}
                  >
                    {canOpen ? 'Explore module' : 'Coming soon'}
                    {canOpen && <ArrowRight size={15} aria-hidden="true" />}
                  </button>
                </article>
              )
            })}
          </div>
        </section>
      )}

      {screen === 'blockchain' && (
        <section className="module-screen">
          <div className="blockchain-heading">
            <button
              type="button"
              className="text-back"
              onClick={() => openScreen('modules')}
            >
              <ArrowLeft size={14} aria-hidden="true" />
              MODULE LIBRARY
            </button>

            <p className="eyebrow">BLOCKCHAIN MODULE</p>

            <h1>
              Explore how a blockchain
              <em> works.</em>
            </h1>

            <p className="hero-description">
              Explore consensus and transaction manipulation through
              interactive simulations. Select an available concept to begin.
            </p>
          </div>

          <div className="concept-toolbar">
            <div>
              <h2>Concept library</h2>
              <p>Select a concept to open its explanation and activities.</p>
            </div>

            <label className="concept-search">
              <Search size={16} aria-hidden="true" />
              <input
                type="search"
                aria-label="Search blockchain concepts"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search blockchain concepts"
              />
            </label>
          </div>

          <p className="result-count" role="status">
            {filteredConcepts.length}{' '}
            {filteredConcepts.length === 1 ? 'concept' : 'concepts'} found
          </p>

          {filteredConcepts.length > 0 ? (
            <div className="concept-grid">
              {filteredConcepts.map((concept) => {
                const Icon = getIcon(concept.icon)
                const targetScreen = getConceptScreen(concept.id)
                const canOpen = concept.available && targetScreen !== null
                const conceptNumber =
                  concepts.findIndex((item) => item.id === concept.id) + 1

                return (
                  <article
                    key={concept.id}
                    className={`concept-card ${
                      canOpen ? 'available' : 'locked'
                    }`}
                    style={
                      { '--card-accent': concept.accent } as CSSProperties
                    }
                  >
                    <div className="concept-top">
                      <span>
                        CONCEPT {String(conceptNumber).padStart(2, '0')}
                      </span>

                      {canOpen ? (
                        <CheckCircle2
                          size={17}
                          aria-label="Available"
                        />
                      ) : (
                        <span className="status-soon">SOON</span>
                      )}
                    </div>

                    <div className="concept-icon">
                      <Icon size={27} aria-hidden="true" />
                    </div>

                    <h3>{concept.name}</h3>
                    <p>{concept.description}</p>

                    <dl>
                      <div>
                        <dt>LEVEL</dt>
                        <dd>{concept.level}</dd>
                      </div>

                      <div>
                        <dt>CONTENT</dt>
                        <dd>{concept.activities}</dd>
                      </div>
                    </dl>

                    <button
                      type="button"
                      className="card-button"
                      disabled={!canOpen}
                      onClick={() => {
                        if (canOpen && targetScreen) {
                          openScreen(targetScreen)
                        }
                      }}
                    >
                      {canOpen ? 'Open concept' : 'Coming soon'}
                      {canOpen && (
                        <ArrowRight size={15} aria-hidden="true" />
                      )}
                    </button>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No concepts found</h3>
              <p>Try another search term.</p>
              <button
                type="button"
                className="lab-action"
                onClick={() => setQuery('')}
              >
                Clear search
              </button>
            </div>
          )}
        </section>
      )}

      {screen === 'consensus' && (
        <div className="concept-view">
          {/* <div className="module-context-bar">
            <span>Learning Lab / Blockchain / Consensus</span>
          </div> */}

          <ConsensusLabClient />
        </div>
      )}

      {screen === 'transaction-manipulation' && (
        <section
          id="lab"
          className="section lab-section transaction-screen"
          aria-labelledby="transaction-title"
        >
          <div className="lab-header">
            <div>
              <p className="eyebrow">
                FEATURED LEARNING ENVIRONMENT
              </p>

              <h1 id="transaction-title">
                Transaction manipulation:
                <em> see how tampering is detected.</em>
              </h1>

              <p className="lab-description">
                Modify a transaction and observe how its hash and the
                Merkle root change. Explore how these changes make
                transaction tampering detectable.
              </p>

              
            </div>

            <span className="lab-status">LAB / READY</span>
          </div>

          <MerkleTamperSimulation />
        </section>
      )}

      <footer className="module-footer">
        <div>
          <b>LEARNING LAB</b>
          <span>Interactive technology education</span>
        </div>

        <span>Designed and developed by Choki Dorji</span>

        <a href="/">
          Return to portfolio
          <ArrowRight size={14} />
        </a>
      </footer>

      <style jsx>{`
        :global(*) {
          box-sizing: border-box;
        }

        .module-lab {
          --background: #081014;
          --panel: #0d171c;
          --panel-light: #111d23;
          --line: #27353d;
          --text: #edf3f0;
          --muted: #8c9ba3;
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 75% 8%,
              rgba(242, 140, 40, 0.08),
              transparent 27%
            ),
            var(--background);
          color: var(--text);
          font-family: Inter, ui-sans-serif, system-ui, sans-serif;
        }

        button,
        input {
          font: inherit;
        }

        .module-header {
          position: sticky;
          top: 0;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 72px;
          padding: 0 max(22px, 5vw);
          border-bottom: 1px solid var(--line);
          background: rgba(8, 16, 20, 0.92);
          backdrop-filter: blur(16px);
        }

        .module-brand {
          display: flex;
          align-items: center;
          gap: 11px;
          border: 0;
          background: transparent;
          color: inherit;
          text-align: left;
          cursor: pointer;
        }

        .module-brand > span {
          display: grid;
          place-items: center;
          width: 37px;
          height: 37px;
          border: 1px solid #f28c28;
          color: #f28c28;
          font: 800 11px monospace;
        }

        .module-brand div {
          display: grid;
          gap: 2px;
        }

        .module-brand b {
          font-size: 13px;
          letter-spacing: 0.08em;
        }

        .module-brand small {
          color: var(--muted);
          font: 600 8px monospace;
          letter-spacing: 0.12em;
        }

        .module-status {
          color: var(--muted);
          font: 600 10px monospace;
          letter-spacing: 0.1em;
        }

        .module-status i {
          display: inline-block;
          width: 7px;
          height: 7px;
          margin-right: 8px;
          border-radius: 50%;
          background: #31c77e;
          box-shadow: 0 0 11px #31c77e;
        }

        .header-back,
        .text-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 0;
          background: transparent;
          color: var(--muted);
          cursor: pointer;
        }

        .header-back:hover,
        .text-back:hover {
          color: #f28c28;
        }

        .module-screen {
          width: min(1440px, 100%);
          margin: auto;
          padding: clamp(48px, 7vw, 100px) max(22px, 5vw);
        }

        .module-hero {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          align-items: end;
          gap: 70px;
          padding-bottom: clamp(65px, 8vw, 110px);
        }

        .eyebrow {
          margin: 0 0 15px;
          color: #f28c28;
          font: 700 11px monospace;
          letter-spacing: 0.16em;
        }

        .eyebrow > span {
          display: inline-block;
          width: 32px;
          height: 1px;
          margin-right: 10px;
          vertical-align: middle;
          background: #f28c28;
        }

        .module-hero h1,
        .blockchain-heading h1 {
          max-width: 940px;
          margin: 0;
          font-size: clamp(3rem, 7vw, 7rem);
          line-height: 0.92;
          letter-spacing: -0.06em;
        }

        h1 em {
          color: #f28c28;
          font-style: normal;
        }

        .hero-description,
        .blockchain-heading > p:last-child {
          max-width: 750px;
          margin-top: 28px;
          color: var(--muted);
          font-size: 1.08rem;
          line-height: 1.75;
        }

        .hero-summary {
          padding: 30px;
          border: 1px solid var(--line);
          background: rgba(13, 23, 28, 0.75);
        }

        .hero-summary svg {
          color: #f28c28;
        }

        .hero-summary > span {
          display: block;
          margin: 22px 0 10px;
          color: var(--muted);
          font: 700 10px monospace;
          letter-spacing: 0.14em;
        }

        .hero-summary strong {
          font-size: 1.15rem;
        }

        .hero-summary p {
          color: var(--muted);
          line-height: 1.6;
        }

        .section-heading,
        .concept-toolbar {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 25px;
          margin-bottom: 28px;
        }

        .section-heading h2,
        .concept-toolbar h2 {
          margin: 5px 0 0;
          font-size: clamp(1.8rem, 3vw, 3rem);
        }

        .section-heading > span,
        .concept-toolbar span {
          color: var(--muted);
          font: 600 10px monospace;
          letter-spacing: 0.1em;
        }

        .module-grid,
        .concept-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          border: 1px solid var(--line);
          background: var(--line);
        }

        .module-card,
        .concept-card {
          position: relative;
          padding: clamp(25px, 4vw, 46px);
          background: var(--panel);
          overflow: hidden;
        }

        .module-card.available::before,
        .concept-card.available::before {
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          height: 3px;
          background: var(--card-accent);
          content: '';
        }

        .module-card.locked,
        .concept-card.locked {
          opacity: 0.58;
        }

        .card-number {
          position: absolute;
          top: 24px;
          right: 25px;
          color: rgba(255, 255, 255, 0.05);
          font: 800 52px monospace;
        }

        .module-icon,
        .concept-icon {
          display: grid;
          place-items: center;
          width: 54px;
          height: 54px;
          margin-bottom: 28px;
          border: 1px solid color-mix(
            in srgb,
            var(--card-accent) 55%,
            var(--line)
          );
          color: var(--card-accent);
          background: color-mix(
            in srgb,
            var(--card-accent) 7%,
            var(--panel)
          );
        }

        .module-code,
        .concept-top {
          color: var(--card-accent);
          font: 700 10px monospace;
          letter-spacing: 0.14em;
        }

        .module-card h3,
        .concept-card h3 {
          margin: 12px 0;
          font-size: clamp(1.55rem, 3vw, 2.4rem);
        }

        .module-card > p,
        .concept-card > p {
          min-height: 55px;
          color: var(--muted);
          line-height: 1.65;
        }

        .module-meta {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          margin: 27px 0 18px;
          padding-top: 18px;
          border-top: 1px solid var(--line);
          color: var(--muted);
          font-size: 0.78rem;
        }

        .status-ready {
          color: #31c77e;
          font: 700 9px monospace;
          letter-spacing: 0.11em;
        }

        .status-soon,
        .soon-label {
          color: #71808a;
          font: 700 9px monospace;
          letter-spacing: 0.11em;
        }

        .module-card button,
        .concept-card button {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 14px 16px;
          border: 1px solid var(--line);
          background: transparent;
          color: var(--text);
          font-weight: 700;
          cursor: pointer;
        }

        .module-card.available button:hover,
        .concept-card.available button:hover {
          border-color: var(--card-accent);
          color: var(--card-accent);
        }

        .module-card button:disabled,
        .concept-card button:disabled {
          color: #65737c;
          cursor: not-allowed;
        }

        .blockchain-heading {
          padding: 20px 0 clamp(60px, 8vw, 105px);
        }

        .text-back {
          margin-bottom: 60px;
          padding: 0;
          font: 700 10px monospace;
          letter-spacing: 0.13em;
        }

        .concept-toolbar {
          align-items: center;
        }

        .concept-toolbar label {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: min(370px, 100%);
          padding: 13px 15px;
          border: 1px solid var(--line);
          background: var(--panel);
          color: var(--muted);
        }

        .concept-toolbar input {
          width: 100%;
          border: 0;
          outline: 0;
          background: transparent;
          color: var(--text);
        }

        .concept-top {
          display: flex;
          justify-content: space-between;
          color: var(--muted);
        }

        .concept-icon {
          margin-top: 30px;
        }

        .concept-card dl {
          display: grid;
          grid-template-columns: 1fr 1fr;
          margin: 28px 0 20px;
          border: 1px solid var(--line);
        }

        .concept-card dl div {
          padding: 14px;
        }

        .concept-card dl div + div {
          border-left: 1px solid var(--line);
        }

        .concept-card dt {
          margin-bottom: 6px;
          color: #6e7c84;
          font: 700 9px monospace;
          letter-spacing: 0.12em;
        }

        .concept-card dd {
          margin: 0;
          font-size: 0.82rem;
        }

        .module-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 25px;
          padding: 28px max(22px, 5vw);
          border-top: 1px solid var(--line);
          color: var(--muted);
          font-size: 0.78rem;
        }

        .module-footer div {
          display: grid;
          gap: 4px;
        }

        .module-footer b {
          color: var(--text);
        }

        .module-footer a {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #f28c28;
          text-decoration: none;
        }

        @media (max-width: 850px) {
          .module-status {
            display: none;
          }

          .module-hero {
            grid-template-columns: 1fr;
          }

          .module-grid,
          .concept-grid {
            grid-template-columns: 1fr;
          }

          .concept-toolbar {
            align-items: stretch;
            flex-direction: column;
          }

          .concept-toolbar label {
            min-width: 100%;
          }
        }

        @media (max-width: 560px) {
          .module-header {
            min-height: 64px;
          }

          .header-back {
            font-size: 0;
          }

          .module-hero h1,
          .blockchain-heading h1 {
            font-size: 3.1rem;
          }

          .section-heading {
            align-items: flex-start;
            flex-direction: column;
          }

          .concept-card dl {
            grid-template-columns: 1fr;
          }

          .concept-card dl div + div {
            border-top: 1px solid var(--line);
            border-left: 0;
          }

          .module-footer {
            align-items: flex-start;
            flex-direction: column;
          }
        }
      `}</style>
    </main>
  )
}