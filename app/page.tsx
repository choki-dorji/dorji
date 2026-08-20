'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Command,
  Copy,
  Download,
  Code2,
  BriefcaseBusiness,
  Mail,
  Menu,
  Moon,
  Network,
  Search,
  ShieldCheck,
  Sun,
  Terminal,
  X,
  Zap,
} from 'lucide-react'
import MerkleTamperSimulation from './merkle-tamper-simulation'

const projects = [
  { name: 'GoChain / production-oriented blockchain', type: 'Blockchain', year: '2025—now', status: 'Active', color: 'emerald', description: 'A from-scratch learning system for understanding blocks, signatures, consensus, and network state.', stack: 'Go · Cryptography · P2P' },
  { name: 'PII privacy risk assessment', type: 'Research', year: 'Research note', status: 'In progress', color: 'saffron', description: 'A practical framework for making personally identifiable information risks visible in Bhutanese digital systems.', stack: 'Privacy · Governance · Risk' },
  { name: 'Secure systems curriculum', type: 'Education', year: 'Teaching system', status: 'Maintained', color: 'cyan', description: 'Technical learning materials that turn complex computing concepts into observable experiments.', stack: 'Pedagogy · Labs · Assessment' },
  { name: 'Digital trust field notes', type: 'Writing', year: 'Ongoing', status: 'Open', color: 'cyan', description: 'Short explainers on signatures, Merkle proofs, consensus, and the decisions underneath abstractions.', stack: 'Research · Writing · Systems' },
]

const writings = [
  { title: 'Why consensus mechanisms are necessary', date: '08.2025', read: '8 min', level: 'Foundations', tag: 'Blockchain' },
  { title: 'Privacy risk is a system property', date: '05.2025', read: '6 min', level: 'Research note', tag: 'Cybersecurity' },
  { title: 'Building blockchain components in Go', date: '02.2025', read: '12 min', level: 'Technical', tag: 'Go' },
]

const navItems = ['profile', 'work', 'research', 'teaching', 'writing', 'lab', 'contact']

export default function Page() {
  const [dark, setDark] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [filter, setFilter] = useState('All')
  const [writingQuery, setWritingQuery] = useState('')
  const [copied, setCopied] = useState(false)
  const [sent, setSent] = useState(false)
  const [active, setActive] = useState('profile')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    document.documentElement.classList.toggle('light', !dark)
  }, [dark])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setPaletteOpen(true) }
      if (event.key === 'Escape') { setPaletteOpen(false); setMenuOpen(false) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const visibleProjects = filter === 'All' ? projects : projects.filter((project) => project.type === filter)
  const visibleWriting = writings.filter((post) => `${post.title} ${post.tag}`.toLowerCase().includes(writingQuery.toLowerCase()))
  const goTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setPaletteOpen(false); setMenuOpen(false) }
  const copyLink = async () => { await navigator.clipboard?.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 1600) }

  return (
    <main className="lab-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Choki Dorji home"><span className="brand-mark">CD</span><span>CHOKI DORJI</span><small>/ DIGITAL SYSTEMS LAB</small></a>
        <div className="system-status"><span className="status-dot" /> SYSTEM STATUS: AVAILABLE FOR COLLABORATION</div>
        <div className="top-actions">
          <button className="icon-button" onClick={() => setDark(!dark)} aria-label="Toggle color theme">{dark ? <Sun size={16} /> : <Moon size={16} />}</button>
          <button className="command-trigger" onClick={() => setPaletteOpen(true)}><Command size={14} /> <span>COMMAND</span><kbd>⌘ K</kbd></button>
          <button className="menu-button icon-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">{menuOpen ? <X size={17} /> : <Menu size={17} />}</button>
        </div>
      </header>

      <nav className={`mobile-nav ${menuOpen ? 'open' : ''}`} aria-label="Mobile navigation">{navItems.map((item) => <button key={item} onClick={() => goTo(item)}>{item.toUpperCase()} <ArrowUpRight size={13} /></button>)}</nav>

      <section id="top" className="hero section-grid">
        <div className="hero-copy">
          <p className="eyebrow"><span className="accent-line" /> HELLO, I&apos;M CHOKI DORJI</p>
          <h1>Engineering secure, decentralized and meaningful <em>digital systems.</em></h1>
          <p className="hero-lede">Full-stack software engineer building thoughtful digital products across frontend, backend, and blockchain systems.</p>
          <div className="hero-actions"><button className="button primary" onClick={() => goTo('work')}>Explore my work <ArrowUpRight size={15} /></button><button className="button ghost" onClick={() => goTo('research')}>View research <ChevronRight size={15} /></button><button className="download"><Download size={14} /> Download CV</button></div>
          <div className="hero-meta"><span>BASED IN <b>BHUTAN</b></span><span>FOCUS <b>TRUST + SYSTEMS</b></span><span>MODE <b>BUILDING</b></span></div>
        </div>
        <div className="hero-visual">
          <div className="visual-label">SYSTEMS / MAP_01 <span>LIVE</span></div>
          <div className="network-map">
            <div className="network-lines" />
            <button className="network-node node-a" onClick={() => goTo('work')}><Network size={17} /><span>BLOCKCHAIN</span><small>state / trust</small></button>
            <button className="network-node node-b" onClick={() => goTo('research')}><ShieldCheck size={17} /><span>CYBERSECURITY</span><small>privacy / risk</small></button>
            <button className="network-node node-c" onClick={() => goTo('work')}><Terminal size={17} /><span>SOFTWARE</span><small>backend / go</small></button>
            <button className="network-node node-d" onClick={() => goTo('teaching')}><Zap size={17} /><span>EDUCATION</span><small>concept / lab</small></button>
            <div className="network-core">CD<span>digital trust</span></div>
          </div>
          <div className="terminal-panel"><div className="terminal-top"><span><i /> <i /> <i /></span><small>identity.verify()</small><span>01 / 04</span></div><code><b>&gt; identity.verify()</b><br />Name: Choki Dorji<br />Role: Assistant Lecturer<br />Focus: Frontend + Backend + Blockchain<br />Location: Bhutan<br />Status: <strong>Building</strong><span className="cursor" /></code></div>
        </div>
      </section>

      <section id="profile" className="section profile-section"><div className="section-index">01 / PROFILE</div><div className="profile-grid"><div><h2>A technical practice built across the <em>full stack.</em></h2><p className="large-copy">I design and build interfaces, APIs, services, and decentralized applications. My work moves from polished React and Next.js frontends to reliable Node.js, Python, and Go backends, with Solidity and dapps when the product needs blockchain.</p><p className="muted-copy">I care about clear architecture, useful abstractions, and software that feels dependable in the hands of real people. This lab is a record of that practice: products, experiments, systems, and notes in progress.</p></div><aside className="focus-panel"><div className="panel-heading"><span className="status-dot" /> CURRENT FOCUS <span className="mono">AUG 2025</span></div>{['Building a blockchain from scratch in Go','Exploring secure digital identity','Researching PII privacy risks','Developing cybersecurity education'].map((focus, index) => <div className="focus-row" key={focus}><span>0{index + 1}</span>{focus}<Check size={14} /></div>)}</aside></div></section>

      <section className="section capability-section"><div className="section-index">02 / CAPABILITY MAP</div><div className="capability-header"><h2>Connected domains, <em>shared problems.</em></h2><p>Filter the lab by the kind of work you want to explore.</p></div><div className="capability-grid">{[['FRONTEND', 'cyan', 'React · Next.js · UI systems'], ['BACKEND', 'saffron', 'Node.js · Python · Go'], ['BLOCKCHAIN', 'emerald', 'Solidity · dapps · Smart contracts'], ['SOFTWARE ENGINEERING', 'neutral', 'APIs · Architecture · Delivery']].map(([name, color, detail]) => <button className={`capability-card ${color}`} key={name} onClick={() => { setFilter(name === 'BLOCKCHAIN' ? 'Blockchain' : 'All'); goTo('work') }}><span className="capability-number">0{['FRONTEND','BACKEND','BLOCKCHAIN','SOFTWARE ENGINEERING'].indexOf(name) + 1}</span><h3>{name}</h3><p>{detail}</p><ArrowUpRight size={17} /></button>)}</div></section>

      <section id="work" className="section work-section"><div className="section-index">03 / SELECTED WORK</div><div className="section-heading"><div><h2>Systems in <em>construction.</em></h2><p>Projects are presented as working notes, not polished endpoints.</p></div><div className="filter-list">{['All', 'Blockchain', 'Research', 'Education', 'Writing'].map((item) => <button className={filter === item ? 'selected' : ''} key={item} onClick={() => setFilter(item)}>{item}</button>)}</div></div><div className="project-list">{visibleProjects.map((project, index) => <article className={`project-row ${index === 0 ? 'featured-row' : ''}`} key={project.name}><div className={`project-number ${project.color}`}>0{index + 1}</div><div className="project-main"><div className="project-kicker"><span className={`tiny-status ${project.color}`} /> {project.type} <span>/</span> {project.year}</div><h3>{project.name}</h3><p>{project.description}</p><div className="project-stack">{project.stack.split(' · ').map((tech) => <span key={tech}>{tech}</span>)}</div></div><div className="project-status"><span>{project.status}</span><ArrowUpRight size={18} /></div></article>)}</div></section>

      <section className="section flagship"><div className="section-index">04 / FLAGSHIP BUILD</div><div className="flagship-head"><div><p className="eyebrow"><span className="accent-line" /> GOCHAIN / ROADMAP</p><h2>Building a production-oriented <em>blockchain in Go.</em></h2></div><span className="build-badge"><span className="status-dot" /> ACTIVE BUILD</span></div><div className="architecture"><div className="arch-flow">{['Wallet', 'Transaction Pool', 'Consensus', 'Block Execution', 'Blockchain State', 'Peer Network'].map((node, i) => <div className={`arch-node ${i < 3 ? 'complete' : i === 3 ? 'active' : ''}`} key={node}><span>{String(i + 1).padStart(2, '0')}</span><b>{node}</b><small>{i < 3 ? 'complete' : i === 3 ? 'active' : 'planned'}</small>{i < 5 && <ChevronRight className="arch-arrow" size={16} />}</div>)}</div><div className="roadmap"><span>ROADMAP</span>{['Core data structures','Cryptographic signing','Peer-to-peer networking','Consensus engine','Smart-contract execution'].map((step, i) => <div className="roadmap-row" key={step}><span className={i < 2 ? 'done' : i === 2 ? 'live' : ''}>{i < 2 ? '✓' : i === 2 ? '→' : '·'}</span>{step}<small>{i < 2 ? 'shipped' : i === 2 ? 'in progress' : 'next'}</small></div>)}</div></div></section>

      <section id="research" className="section research-section"><div className="section-index">05 / RESEARCH</div><div className="research-grid"><div><p className="eyebrow">RESEARCH NOTE / 001</p><h2>Privacy risk assessment of personally identifiable information <em>in Bhutan.</em></h2><p className="large-copy">How can digital systems make privacy risk legible before it becomes a breach?</p></div><div className="research-card"><div className="research-meta"><span>STATUS / IN PROGRESS</span><span>METHOD / FRAMEWORK</span></div><div className="research-path"><span>Question</span><ChevronRight size={14} /><span>Context</span><ChevronRight size={14} /><span>Model</span><ChevronRight size={14} /><span>Practice</span></div><p>Developing a practical model for identifying and communicating PII exposure across the systems people rely on.</p><button className="text-button">Read research notes <ArrowUpRight size={14} /></button></div></div></section>

      <section id="teaching" className="section teaching-section"><div className="section-index">06 / TEACHING SYSTEM</div><div className="teaching-head"><h2>Make complex things <em>observable.</em></h2><p>Teaching is a systems practice: move from concept to evidence, then give people room to test the model.</p></div><div className="teaching-flow">{['Concept','Demonstration','Guided Practice','Experiment','Reflection','Assessment'].map((step, i) => <div className="teach-step" key={step}><span>0{i + 1}</span><b>{step}</b>{i < 5 && <ChevronRight size={15} />}</div>)}</div><div className="module-grid">{['Blockchain','Cybersecurity','Backend Development with Go','Algorithms + Data Structures','Full-stack Development','Software Engineering'].map((module) => <span key={module}>{module} <ArrowUpRight size={13} /></span>)}</div></section>

      <section id="lab" className="section lab-section"><div className="section-index">07 / DIGITAL LAB</div><div className="lab-header"><div><p className="eyebrow"><span className="accent-line" /> FEATURED LEARNING ENVIRONMENT</p><h2>Consensus Lab: see how networks reach <em>agreement.</em></h2><p>Enter an interactive environment where transactions, validators, miners, authorities, and consensus messages come to life.</p><div className="hero-actions"><a className="button primary" href="/lab">Launch Learning Lab <ArrowUpRight size={15} /></a><a className="button ghost" href="/lab?view=compare">View available simulations <ChevronRight size={15} /></a></div></div><span className="mono">LAB / READY</span></div><MerkleTamperSimulation /></section>

      <section id="writing" className="section writing-section"><div className="section-index">08 / WRITING</div><div className="section-heading"><div><h2>Notes from the <em>working layer.</em></h2><p>Technical writing and teaching notes, written for curious builders.</p></div><label className="search-field"><Search size={15} /><span className="sr-only">Search writing</span><input value={writingQuery} onChange={(event) => setWritingQuery(event.target.value)} placeholder="Search notes" /></label></div><div className="writing-list">{visibleWriting.map((post, i) => <article className="writing-row" key={post.title}><span className="writing-no">0{i + 1}</span><div><span className="post-tag">{post.tag}</span><h3>{post.title}</h3></div><span className="post-level">{post.level}</span><span className="post-meta">{post.date} / {post.read}</span><ArrowUpRight size={17} /></article>)}</div></section>

      <section id="contact" className="section contact-section"><div className="section-index">09 / CONTACT</div><div className="contact-grid"><div><h2>Let&apos;s build systems that people can <em>trust.</em></h2><p className="large-copy">For technical collaboration, research, teaching, or thoughtful conversations about digital systems.</p><div className="social-links"><a href="mailto:hello@chokidorji.dev"><Mail size={15} /> Email</a><a href="https://github.com" target="_blank"><Code2 size={15} /> GitHub</a><a href="https://linkedin.com" target="_blank"><BriefcaseBusiness size={15} /> LinkedIn</a></div></div><form className="contact-form" onSubmit={(event) => { event.preventDefault(); setSent(true) }}>{sent ? <div className="success-state"><Check size={24} /><h3>Message queued.</h3><p>Thanks for reaching out. This demo form is ready to connect to your preferred email service.</p><button type="button" className="text-button" onClick={() => setSent(false)}>Send another</button></div> : <><label>Name<input required placeholder="Your name" /></label><label>Email<input required type="email" placeholder="you@organization.com" /></label><label>Purpose<select defaultValue=""><option value="" disabled>Select a purpose</option><option>Technical collaboration</option><option>Research</option><option>Teaching</option><option>Speaking invitation</option></select></label><label>Message<textarea required rows={3} placeholder="What are you working on?" /></label><button className="button primary" type="submit">Send message <ArrowUpRight size={15} /></button></>}</form></div></section>

      <footer className="footer"><div><b>CHOKI DORJI / DIGITAL SYSTEMS LAB</b><p>Designed and engineered with purpose.</p></div><div className="footer-right"><span>BHUTAN · 2025</span><span><span className="status-dot" /> SYSTEM OPERATIONAL</span><button onClick={copyLink} className="copy-button">{copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'LINK COPIED' : 'COPY LINK'}</button></div></footer>

      {paletteOpen && <div className="palette-backdrop" onClick={() => setPaletteOpen(false)}><div className="command-palette" onClick={(event) => event.stopPropagation()}><div className="palette-input"><Search size={16} /><input autoFocus placeholder="Navigate the lab..." /></div>{navItems.map((item) => <button key={item} onClick={() => goTo(item)}><span>{item.toUpperCase()}</span><ArrowUpRight size={15} /></button>)}<small>ESC TO CLOSE · ⌘ K TO OPEN</small></div></div>}
    </main>
  )
}