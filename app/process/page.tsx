'use client'

import { useLanguage } from '@/components/LanguageProvider'
import ImagePlaceholder from '@/components/ImagePlaceholder'
import SvgViewer from '@/components/SvgViewer'

type ProcessLocale = {
  label: string
  headline: string
  intro: string
  goal: { number: string; title: string; text: string }
  medium: {
    title: string
    subtitle: string
    options: { name: string; text: string; chosen: boolean }[]
  }
  differentiate: { title: string }
  tracks: { title: string }[]
  conclusion: { text1: string; text2: string }
  organise: { title: string; text1: string; text2: string }
}

const Arrow = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '48px', borderBottom: '1px solid var(--hairline)', color: 'var(--ink)' }}>
    <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
      <path d="M6 0v16M1 11l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
)

export default function ProcessPage() {
  const { t } = useLanguage()
  const p = t.process as unknown as ProcessLocale

  return (
    <>
      {/* ── Header ─────────────────────────────── */}
      <div className="process-header-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--hairline)', minHeight: '360px' }}>
        <div style={{ padding: '56px 32px 40px', borderRight: '1px solid var(--hairline)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <p className="label" style={{ marginBottom: '12px' }}>{p.label}</p>
          <h1 style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 700, letterSpacing: '0.01em', lineHeight: 1.15, maxWidth: '600px', marginBottom: '20px' }}>
            {p.headline}
          </h1>
          <p style={{ fontSize: '15px', fontWeight: 300, lineHeight: 1.75, color: 'var(--body-text)', maxWidth: '520px' }}>
            {p.intro}
          </p>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <img
            src="/images/process-hero.webp"
            alt="Process"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      </div>

      {/* ── 01 Das Ziel ────────────────────────── */}
      <div style={{ padding: '48px 32px', borderBottom: '1px solid var(--hairline)', textAlign: 'center' }}>
        <p className="label" style={{ marginBottom: '12px' }}>{p.goal.number}</p>
        <h2 style={{ fontSize: '20px', fontWeight: 600, letterSpacing: '0.01em', marginBottom: '16px' }}>
          {p.goal.title}
        </h2>
        <p style={{ fontSize: '15px', fontWeight: 300, lineHeight: 1.75, color: 'var(--body-text)', maxWidth: '560px', margin: '0 auto' }}>
          {p.goal.text}
        </p>
      </div>

      <Arrow />

      {/* ── Medium ─────────────────────────────── */}
      <div style={{ padding: '40px 32px 32px', borderBottom: '1px solid var(--hairline)', textAlign: 'center' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 600, letterSpacing: '0.01em', marginBottom: '8px' }}>
          {p.medium.title}
        </h2>
        <p style={{ fontSize: '14px', fontWeight: 300, color: 'var(--body-text)' }}>
          {p.medium.subtitle}
        </p>
      </div>

      {/* ── Options ────────────────────────────── */}
      <div className="hairline-grid options-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: '1px solid var(--hairline)' }}>
        {/* Zeile 1: Namen */}
        {p.medium.options.map((opt, i) => (
          <div key={`name-${i}`} style={{ padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: opt.chosen ? 'var(--surface-soft)' : 'var(--cream)' }}>
            <p style={{ fontSize: '17px', fontWeight: 600, letterSpacing: '0.01em' }}>{opt.name}</p>
            {opt.chosen && (
              <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', background: 'var(--ink)', color: 'var(--cream)', padding: '3px 8px' }}>✓</span>
            )}
          </div>
        ))}
        {/* Zeile 2: Texte */}
        {p.medium.options.map((opt, i) => (
          <div key={`text-${i}`} style={{ padding: '20px 28px 28px', background: 'var(--surface-soft)' }}>
            <p style={{ fontSize: '13px', fontWeight: 300, lineHeight: 1.75, color: 'var(--body-text)' }}>{opt.text}</p>
          </div>
        ))}
      </div>

      <Arrow />

      {/* ── Differenzieren ─────────────────────── */}
      <div style={{ padding: '36px 32px', borderBottom: '1px solid var(--hairline)', textAlign: 'center' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 600, letterSpacing: '0.01em' }}>
          {p.differentiate.title}
        </h2>
      </div>

      {/* ── Zwei Tracks ────────────────────────── */}
      <div className="tracks-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--hairline)' }}>
        {p.tracks.map((track, i) => (
          <div
            key={i}
            style={{
              padding: '32px',
              borderRight: i === 0 ? '1px solid var(--hairline)' : 'none',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: '15px', fontWeight: 400, color: 'var(--body-text)' }}>
              {track.title}
            </p>
          </div>
        ))}
      </div>

      {/* ── Fazit ──────────────────────────────── */}
      <div style={{ padding: '56px 32px' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <p style={{ fontSize: '15px', fontWeight: 300, lineHeight: 1.85, color: 'var(--body-text)', marginBottom: '24px' }}>
            {p.conclusion.text1}
          </p>
          <p style={{ fontSize: '15px', fontWeight: 300, lineHeight: 1.85, color: 'var(--body-text)' }}>
            {p.conclusion.text2}
          </p>
        </div>
      </div>

      {/* ── Organisieren von Ideen ─────────────── */}
      <div style={{ borderTop: '1px solid var(--hairline)' }}>
        <div style={{ padding: '40px 32px 32px', borderBottom: '1px solid var(--hairline)' }}>
          <p className="label">{p.organise.title}</p>
        </div>
        <div className="hairline-grid organise-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          {/* Zeile 1: Text + Video */}
          <div style={{ padding: '32px' }}>
            <p style={{ fontSize: '14px', fontWeight: 300, lineHeight: 1.75, color: 'var(--body-text)' }}>
              {p.organise.text1}
            </p>
          </div>
          <div>
            <ImagePlaceholder
              src="/images/process-01.mp4"
              alt="Process video"
              height={280}
              label="Video"
            />
          </div>
          {/* Zeile 2: Text + SVG */}
          <div style={{ padding: '32px' }}>
            <p style={{ fontSize: '14px', fontWeight: 300, lineHeight: 1.75, color: 'var(--body-text)' }}>
              {p.organise.text2}
            </p>
          </div>
          <div>
            <SvgViewer
              src="/images/process-02.svg"
              style={{ minHeight: '280px' }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .process-header-grid { grid-template-columns: 1fr !important; }
          .process-header-grid > div:last-child { min-height: 240px; }
          .options-grid { grid-template-columns: 1fr !important; }
          .options-grid > div { border-right: none !important; border-bottom: 1px solid var(--hairline); }
          .tracks-grid { grid-template-columns: 1fr !important; }
          .tracks-grid > div { border-right: none !important; border-bottom: 1px solid var(--hairline); }
        }
      `}</style>
    </>
  )
}
