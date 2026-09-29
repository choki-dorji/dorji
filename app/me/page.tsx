'use client'

import { useEffect, useMemo, useState } from 'react'
import citizenData from './data.json'

type CitizenDetail = {
  cid: string | null
  country: string | null
  dob: string | null
  fatherName: string | null
  firstIssuedDate: string | null
  fatherCIDNo: string | null
  firstName: string | null
  gender: string | null
  householdNo: string | null
  lastName: string | null
  middleName: string | null
  mobileNumber: string | null
  motherCIDNo: string | null
  motherName: string | null
  occupation: string | null
  dzongkhagId: string | null
  dzongkhagName: string | null
  gewogId: string | null
  gewogName: string | null
  houseNo: string | null
  thramNo: string | null
  villageSerialNo: string | null
  villageName: string | null
  placeOfBirth: string | null
  firstDzoName: string | null
  middleDzoName: string | null
  lastDzoName: string | null
  religion: string | null
  qualification: string | null
  Cid_Expiry_Date: string | null
}

type CitizenResponse = {
  citizenDetailsResponse: {
    citizenDetail: CitizenDetail[]
  }
}

const data = citizenData as CitizenResponse

const profileSections: Array<{
  title: string
  description: string
  fields: Array<[keyof CitizenDetail, string]>
}> = [
  {
    title: 'Personal Information',
    description: 'Identity and biographical details.',
    fields: [
      ['cid', 'CID Number'],
      ['firstName', 'First Name'],
      ['middleName', 'Middle Name'],
      ['lastName', 'Last Name'],
      ['firstDzoName', 'First Dzongkha Name'],
      ['middleDzoName', 'Middle Dzongkha Name'],
      ['lastDzoName', 'Last Dzongkha Name'],
      ['gender', 'Gender'],
      ['dob', 'Date of Birth'],
      ['placeOfBirth', 'Place of Birth'],
      ['religion', 'Religion'],
      ['country', 'Country'],
    ],
  },
  {
    title: 'Family Information',
    description: 'Parent and household information.',
    fields: [
      ['fatherName', "Father's Name"],
      ['fatherCIDNo', "Father's CID"],
      ['motherName', "Mother's Name"],
      ['motherCIDNo', "Mother's CID"],
      ['householdNo', 'Household Number'],
    ],
  },
  {
    title: 'Registered Address',
    description: 'Registered administrative location.',
    fields: [
      ['dzongkhagName', 'Dzongkhag'],
      ['dzongkhagId', 'Dzongkhag ID'],
      ['gewogName', 'Gewog'],
      ['gewogId', 'Gewog ID'],
      ['villageName', 'Village'],
      ['villageSerialNo', 'Village Serial Number'],
      ['houseNo', 'House Number'],
      ['thramNo', 'Thram Number'],
    ],
  },
  {
    title: 'Contact and Background',
    description: 'Contact, education and occupational details.',
    fields: [
      ['mobileNumber', 'Mobile Number'],
      ['occupation', 'Occupation'],
      ['qualification', 'Qualification'],
    ],
  },
  {
    title: 'Document Information',
    description: 'Citizen-card issuance and validity.',
    fields: [
      ['firstIssuedDate', 'First Issued Date'],
      ['Cid_Expiry_Date', 'CID Expiry Date'],
    ],
  },
]

function displayValue(value: string | null) {
  return value?.trim() || 'Not available'
}

function formatDate(value: string | null) {
  if (!value) return 'Not available'

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

function useDzongkhaTypewriter(text: string) {
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  const characters = useMemo(() => {
    if (!text) return []

    if (
      typeof Intl !== 'undefined' &&
      'Segmenter' in Intl
    ) {
      const segmenter = new Intl.Segmenter('bo', {
        granularity: 'grapheme',
      })

      return Array.from(
        segmenter.segment(text),
        segment => segment.segment,
      )
    }

    return Array.from(text)
  }, [text])

  useEffect(() => {
    if (!characters.length) return

    const currentCharacters =
      typeof Intl !== 'undefined' &&
      'Segmenter' in Intl
        ? Array.from(
            new Intl.Segmenter('bo', {
              granularity: 'grapheme',
            }).segment(displayedText),
            segment => segment.segment,
          )
        : Array.from(displayedText)

    const isComplete =
      currentCharacters.length === characters.length

    const isEmpty = currentCharacters.length === 0

    let delay = isDeleting ? 90 : 150

    if (!isDeleting && isComplete) {
      delay = 1800
    }

    if (isDeleting && isEmpty) {
      delay = 600
    }

    const timer = window.setTimeout(() => {
      if (!isDeleting && isComplete) {
        setIsDeleting(true)
        return
      }

      if (isDeleting && isEmpty) {
        setIsDeleting(false)
        return
      }

      if (isDeleting) {
        setDisplayedText(
          currentCharacters.slice(0, -1).join(''),
        )
      } else {
        setDisplayedText(
          characters
            .slice(0, currentCharacters.length + 1)
            .join(''),
        )
      }
    }, delay)

    return () => window.clearTimeout(timer)
  }, [characters, displayedText, isDeleting])

  return displayedText
}

export default function MePage() {
  const citizen =
    data.citizenDetailsResponse?.citizenDetail?.[0]

  const fullName = citizen
    ? [
        citizen.firstName,
        citizen.middleName,
        citizen.lastName,
      ]
        .filter(Boolean)
        .join(' ')
    : ''

  const dzongkhaName = citizen
    ? [
        citizen.firstDzoName,
        citizen.middleDzoName,
        citizen.lastDzoName,
      ]
        .filter(Boolean)
        .join(' ')
    : ''

  const typedDzongkhaName =
    useDzongkhaTypewriter(dzongkhaName)

  if (!citizen) {
    return (
      <main className="me-page">
        <section className="empty-state">
          <span>PROFILE / ERROR</span>

          <h1>No citizen information found.</h1>

          <p>
            Make sure citizen.json contains a
            citizenDetail array with at least one record.
          </p>

          <a href="/">← Return to portfolio</a>
        </section>

        <PageStyles />
      </main>
    )
  }

  const location = [
    citizen.villageName,
    citizen.gewogName,
    citizen.dzongkhagName,
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <main className="me-page">
      <header className="me-topbar">
        <a href="/">CD / DIGITAL SYSTEMS LAB</a>

        <span>PERSONAL PROFILE · DO NOT INDEX</span>
      </header>

      <section className="me-hero">
        <div className="identity-copy">
          <p className="eyebrow">
            CITIZEN PROFILE / BHUTAN
          </p>

          <h1>{fullName}</h1>

          {dzongkhaName && (
            <div
              className="dzongkha-typewriter"
              aria-label={dzongkhaName}
            >
              <span aria-hidden="true">
                {typedDzongkhaName}
              </span>

              <i aria-hidden="true" />
            </div>
          )}

          <p className="summary">
            {displayValue(citizen.occupation)}
            {' · '}
            {location || 'Location not available'}
          </p>
        </div>

        <div className="identity-status">
          <i />

          <div>
            <small>RECORD STATUS</small>
            <b>PROFILE AVAILABLE</b>
          </div>
        </div>
      </section>

      <aside className="privacy-notice">
        <strong>Private information</strong>

        <span>
          This page contains identification, family,
          contact and registered-address information.
        </span>
      </aside>

      <div className="profile-sections">
        {profileSections.map(
          (section, sectionIndex) => (
            <section
              className="detail-section"
              key={section.title}
            >
              <header>
                <span>
                  {String(sectionIndex + 1).padStart(
                    2,
                    '0',
                  )}
                </span>

                <div>
                  <h2>{section.title}</h2>
                  <p>{section.description}</p>
                </div>
              </header>

              <dl>
                {section.fields.map(([key, label]) => {
                  const value =
                    key === 'Cid_Expiry_Date'
                      ? formatDate(citizen[key])
                      : displayValue(citizen[key])

                  return (
                    <div key={key}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  )
                })}
              </dl>
            </section>
          ),
        )}
      </div>

      <footer className="me-footer">
        <a href="/">← Return to portfolio</a>

        <span>
          CHOKI DORJI / PERSONAL PROFILE
        </span>
      </footer>

      <PageStyles />
    </main>
  )
}

function PageStyles() {
  return (
    <style>{`
      :root {
        --me-bg: #07111f;
        --me-panel: #0e1b2a;
        --me-line: #26394d;
        --me-text: #edf6fc;
        --me-muted: #8ea2b6;
        --me-green: #00d68f;
        --me-orange: #ff8a24;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
      }

      .me-page {
        min-height: 100vh;
        color: var(--me-text);
        font-family: Inter, system-ui, sans-serif;
        background-color: var(--me-bg);
        background-image:
          linear-gradient(
            rgba(255, 255, 255, 0.025) 1px,
            transparent 1px
          ),
          linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.025) 1px,
            transparent 1px
          );
        background-size: 44px 44px;
      }

      .me-topbar {
        position: sticky;
        top: 0;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-height: 58px;
        padding: 0 clamp(20px, 5vw, 72px);
        border-bottom: 1px solid var(--me-line);
        background: rgba(7, 17, 31, 0.92);
        backdrop-filter: blur(12px);
        font: 700 10px monospace;
        letter-spacing: 0.08em;
      }

      .me-topbar a,
      .me-footer a,
      .empty-state a {
        color: var(--me-text);
        text-decoration: none;
      }

      .me-topbar a:hover,
      .me-footer a:hover {
        color: var(--me-green);
      }

      .me-topbar span {
        color: var(--me-muted);
      }

      .me-hero {
        display: flex;
        align-items: end;
        justify-content: space-between;
        gap: 32px;
        max-width: 1180px;
        margin: auto;
        padding:
          clamp(70px, 10vw, 130px)
          24px
          58px;
        border-bottom: 1px solid var(--me-line);
      }

      .identity-copy {
        min-width: 0;
      }

      .eyebrow {
        color: var(--me-orange);
        font: 700 10px monospace;
        letter-spacing: 0.14em;
      }

      .me-hero h1 {
        margin: 18px 0 8px;
        font-size: clamp(3rem, 7vw, 6.8rem);
        line-height: 0.94;
        letter-spacing: -0.065em;
      }

      .dzongkha-typewriter {
        display: flex;
        align-items: center;
        min-height: 58px;
        width: fit-content;
        margin: 16px 0;
        color: var(--me-green);
        font-family:
          "Noto Sans Tibetan",
          "Jomolhari",
          sans-serif;
        font-size: clamp(1.5rem, 3vw, 2.4rem);
        line-height: 1.6;
        white-space: nowrap;
      }

      .dzongkha-typewriter i {
        display: inline-block;
        width: 3px;
        height: 1.3em;
        margin-left: 6px;
        background: var(--me-green);
        animation:
          blinkDzongkhaCursor
          0.75s
          step-end
          infinite;
      }

      @keyframes blinkDzongkhaCursor {
        0%,
        50% {
          opacity: 1;
        }

        51%,
        100% {
          opacity: 0;
        }
      }

      .summary {
        color: var(--me-muted);
        line-height: 1.6;
      }

      .identity-status {
        display: flex;
        align-items: center;
        gap: 11px;
        min-width: 220px;
        padding: 14px 16px;
        border:
          1px solid
          rgba(0, 214, 143, 0.42);
        background: rgba(0, 214, 143, 0.06);
      }

      .identity-status > i {
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background: var(--me-green);
        box-shadow:
          0 0 0 5px
          rgba(0, 214, 143, 0.12);
      }

      .identity-status div {
        display: grid;
        gap: 4px;
      }

      .identity-status small {
        color: var(--me-muted);
        font: 700 8px monospace;
      }

      .identity-status b {
        color: var(--me-green);
        font: 700 10px monospace;
      }

      .privacy-notice {
        display: flex;
        gap: 18px;
        max-width: 1180px;
        margin: 25px auto 0;
        padding: 15px 18px;
        border:
          1px solid
          rgba(255, 138, 36, 0.4);
        background: rgba(255, 138, 36, 0.06);
        font-size: 0.78rem;
      }

      .privacy-notice strong {
        color: var(--me-orange);
        white-space: nowrap;
      }

      .privacy-notice span {
        color: var(--me-muted);
      }

      .profile-sections {
        max-width: 1180px;
        margin: auto;
        padding: 30px 24px 90px;
      }

      .detail-section {
        display: grid;
        grid-template-columns: 290px 1fr;
        padding: 42px 0;
        border-bottom: 1px solid var(--me-line);
      }

      .detail-section > header {
        display: flex;
        gap: 15px;
        padding-right: 30px;
      }

      .detail-section > header > span {
        display: grid;
        place-items: center;
        flex: 0 0 30px;
        width: 30px;
        height: 30px;
        border: 1px solid var(--me-line);
        border-radius: 50%;
        color: var(--me-orange);
        font: 700 9px monospace;
      }

      .detail-section h2 {
        margin: 1px 0 7px;
        font-size: 1.25rem;
      }

      .detail-section header p {
        margin: 0;
        color: var(--me-muted);
        font-size: 0.78rem;
        line-height: 1.5;
      }

      .detail-section dl {
        display: grid;
        grid-template-columns: 1fr 1fr;
        margin: 0;
        border: 1px solid var(--me-line);
      }

      .detail-section dl div {
        min-width: 0;
        padding: 16px;
        border-right: 1px solid var(--me-line);
        border-bottom: 1px solid var(--me-line);
        background: rgba(14, 27, 42, 0.78);
      }

      .detail-section dl div:nth-child(2n) {
        border-right: 0;
      }

      .detail-section dt {
        margin-bottom: 8px;
        color: var(--me-muted);
        font: 700 9px monospace;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .detail-section dd {
        overflow-wrap: anywhere;
        margin: 0;
        font-size: 0.92rem;
      }

      .me-footer {
        display: flex;
        justify-content: space-between;
        max-width: 1180px;
        margin: auto;
        padding: 28px 24px 50px;
        color: var(--me-muted);
        font: 10px monospace;
      }

      .empty-state {
        display: grid;
        gap: 14px;
        max-width: 700px;
        margin: auto;
        padding: 18vh 24px;
      }

      .empty-state > span {
        color: var(--me-orange);
        font: 700 10px monospace;
      }

      .empty-state h1 {
        margin: 0;
        font-size: clamp(2.4rem, 6vw, 5rem);
      }

      .empty-state p {
        color: var(--me-muted);
      }

      @media (prefers-reduced-motion: reduce) {
        .dzongkha-typewriter i {
          animation: none;
        }
      }

      @media (max-width: 760px) {
        .me-topbar span {
          display: none;
        }

        .me-hero {
          align-items: flex-start;
          flex-direction: column;
        }

        .identity-status {
          width: 100%;
        }

        .dzongkha-typewriter {
          min-height: 48px;
          white-space: normal;
        }

        .privacy-notice {
          align-items: flex-start;
          flex-direction: column;
          margin-inline: 18px;
        }

        .detail-section {
          grid-template-columns: 1fr;
          gap: 22px;
        }

        .detail-section dl {
          grid-template-columns: 1fr;
        }

        .detail-section dl div {
          border-right: 0;
        }

        .me-footer {
          align-items: flex-start;
          flex-direction: column;
          gap: 18px;
        }
      }
    `}</style>
  )
}