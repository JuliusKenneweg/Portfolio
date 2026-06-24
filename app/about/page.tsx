'use client'

import { useLanguage } from '@/components/LanguageProvider'
import ImagePlaceholder from '@/components/ImagePlaceholder'

export default function AboutPage() {
  const { t } = useLanguage()
  const a = t.about

  return (
    <>
      {/* ── Header ─────────────────────────────── */}
      <div
        style={{
          padding: '56px 32px 40px',
          borderBottom: '1px solid var(--hairline)',
        }}
      >
        <p className="label" style={{ marginBottom: '12px' }}>
          {a.label}
        </p>
        <h1
          style={{
            fontSize: 'clamp(28px, 5vw, 44px)',
            fontWeight: 700,
            letterSpacing: '0.01em',
            lineHeight: 1.1,
            maxWidth: '640px',
          }}
        >
          {a.headline}
        </h1>
      </div>

      {/* ── Main Content ────────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          borderBottom: '1px solid var(--hairline)',
        }}
        className="about-grid"
      >
        {/* Bio */}
        <div
          style={{
            padding: '48px 40px 48px 32px',
            borderRight: '1px solid var(--hairline)',
          }}
        >
          {[a.bio_1, a.bio_2, a.bio_3].map((para, i) => (
            <p
              key={i}
              style={{
                fontSize: '15px',
                fontWeight: 300,
                lineHeight: 1.8,
                color: 'var(--body-text)',
                marginBottom: i < 2 ? '20px' : 0,
              }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* Sidebar */}
        <div style={{ padding: '48px 32px' }}>
          <ImagePlaceholder
            src="/images/portrait.webp"
            alt="Portrait of Julius Kenneweg"
            height={240}
            label="Portrait"
            style={{ marginBottom: '32px' }}
          />

          {/* Skills */}
          <div style={{ marginBottom: '28px' }}>
            <p className="label" style={{ marginBottom: '12px' }}>
              {a.skills_label}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {a.skills.map((skill) => (
                <span key={skill} className="tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="label" style={{ marginBottom: '12px' }}>
              {a.contact_label}
            </p>
            <a
              href={`mailto:${a.contact_email}`}
              style={{
                fontSize: '13px',
                fontWeight: 400,
                color: 'var(--ink)',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
              }}
            >
              {a.contact_email}
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .about-grid { grid-template-columns: 1fr !important; }
          .about-grid > div:first-child { border-right: none !important; padding: 32px 20px !important; }
          .about-grid > div:last-child { padding: 32px 20px !important; border-top: 1px solid var(--hairline); }
        }
      `}</style>
    </>
  )
}
