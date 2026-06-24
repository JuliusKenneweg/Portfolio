'use client'

import Link from 'next/link'
import { useLanguage } from '@/components/LanguageProvider'
import ImagePlaceholder from '@/components/ImagePlaceholder'
import ProjectCard from '@/components/ProjectCard'
import projectsData from '@/data/projects'
import { type ProjectLocale } from '@/data/projects'

const PROJECT_NUMBERS: Record<string, string> = {
  '3d-print-remote': '01',
  swing: '02',
  'gpu-fan-cover': '03',
}

export default function HomePage() {
  const { t } = useLanguage()
  const localeProjects = t.projects as Record<string, ProjectLocale>
  const localizedProjects = projectsData.map(p => ({
    ...p,
    name: localeProjects[p.slug]?.name ?? p.slug,
    shortDesc: localeProjects[p.slug]?.shortDesc ?? '',
  }))

  return (
    <>
      {/* ── 1. Hero ─────────────────────────────── */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          minHeight: '520px',
          borderBottom: '1px solid var(--hairline)',
        }}
        className="hero-grid"
      >
        {/* Left dark panel */}
        <div
          style={{
            background: 'var(--surface-dark)',
            padding: '56px 40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            gap: '32px',
            borderRight: '1px solid var(--hairline)',
          }}
        >
          <div>
            <p className="label" style={{ color: 'rgba(240,236,232,0.4)', marginBottom: '20px' }}>
              {t.home.hero_tag}
            </p>
            <h1
              className="hero-headline hero-text"
              style={{
                fontSize: 'clamp(26px, 3.5vw, 38px)',
                fontWeight: 700,
                letterSpacing: '0.01em',
                lineHeight: 1.12,
                color: 'var(--cream)',
                maxWidth: '520px',
              }}
            >
              {t.home.hero_headline}
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href="#projects" className="btn btn-primary">
              {t.home.hero_cta_primary}
            </a>
            <Link href="/process" className="btn btn-ghost">
              {t.home.hero_cta_ghost}
            </Link>
          </div>
        </div>

        {/* Right image */}
        <div style={{ overflow: 'hidden', minHeight: '400px' }} className="hero-image-col">
          <ImagePlaceholder
            src="/images/project-01-preview.webp"
            alt="Hero image"
            height="100%"
            label="Hero Image"
            style={{ minHeight: '400px' }}
          />
        </div>
      </section>

      {/* ── 2. Projects ─────────────────────────── */}
      <section
        id="projects"
        className="section"
        style={{ borderBottom: '1px solid var(--hairline)' }}
      >
        <div style={{ marginBottom: '36px' }}>
          <p className="label" style={{ marginBottom: '8px' }}>
            {t.home.work_label}
          </p>
          <h2
            style={{
              fontSize: 'clamp(26px, 4vw, 36px)',
              fontWeight: 700,
              letterSpacing: '0.01em',
            }}
          >
            {t.home.work_title}
          </h2>
        </div>

        <div
          className="hairline-grid projects-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}
        >
          {localizedProjects.map((p) => (
            <ProjectCard
              key={p.slug}
              number={PROJECT_NUMBERS[p.slug] ?? '0?'}
              name={p.name}
              slug={p.slug}
              desc={p.shortDesc}
              tags={p.tags}
              thumbImage={p.thumbImage}
            />
          ))}
        </div>
      </section>

      {/* ── 3. CTA ──────────────────────────────── */}
      <section
        style={{
          textAlign: 'center',
          padding: '72px 32px',
          borderBottom: '1px solid var(--hairline)',
        }}
      >
        <p className="label" style={{ marginBottom: '12px' }}>
          {t.home.cta_label}
        </p>
        <h2
          style={{
            fontSize: 'clamp(22px, 4vw, 34px)',
            fontWeight: 700,
            letterSpacing: '0.01em',
            marginBottom: '12px',
          }}
        >
          {t.home.cta_headline}
        </h2>
        <p
          style={{
            fontSize: '14px',
            fontWeight: 300,
            color: 'var(--body-text)',
            maxWidth: '420px',
            margin: '0 auto 28px',
            lineHeight: 1.7,
          }}
        >
          {t.home.cta_subtext}
        </p>
        <a
          href="mailto:Julius.kenneweg8@gmail.com"
          className="btn btn-dark"
          style={{ padding: '12px 32px' }}
        >
          <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
            <rect x="0.75" y="0.75" width="12.5" height="9.5" rx="1.25" stroke="currentColor" strokeWidth="1.2" />
            <path d="M1 2l6 4 6-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          {t.home.cta_button}
        </a>
      </section>

      {/* ── 4. Bottom Cards ─────────────────────── */}
      <div
        className="hairline-grid bottom-cards"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--hairline)' }}
      >
        {/* About card */}
        <div className="section" style={{ paddingTop: '40px', paddingBottom: '40px', display: 'flex', flexDirection: 'column' }}>
          <ImagePlaceholder
            src="/images/portrait.webp"
            alt="Portrait"
            height={220}
            label="Portrait"
            style={{ marginBottom: '24px' }}
          />
          <p className="label" style={{ marginBottom: '10px' }}>
            {t.home.about_tag}
          </p>
          <h3
            style={{
              fontSize: '18px',
              fontWeight: 600,
              letterSpacing: '0.01em',
              marginBottom: '10px',
              lineHeight: 1.3,
            }}
          >
            {t.home.about_title}
          </h3>
          <p
            style={{
              fontSize: '13px',
              fontWeight: 300,
              lineHeight: 1.7,
              color: 'var(--body-text)',
              marginBottom: '20px',
              flex: 1,
            }}
          >
            {t.home.about_text}
          </p>
          <Link href="/about" style={{ fontSize: '13px', fontWeight: 500, color: 'var(--ink)' }}>
            {t.home.about_link}
          </Link>
        </div>

        {/* Process card */}
        <div className="section" style={{ paddingTop: '40px', paddingBottom: '40px', display: 'flex', flexDirection: 'column' }}>
          <ImagePlaceholder
            src="/images/process.mp4"
            alt="Process"
            height={220}
            label="Process"
            style={{ marginBottom: '24px' }}
          />
          <p className="label" style={{ marginBottom: '10px' }}>
            {t.home.process_tag}
          </p>
          <h3
            style={{
              fontSize: '18px',
              fontWeight: 600,
              letterSpacing: '0.01em',
              marginBottom: '10px',
              lineHeight: 1.3,
            }}
          >
            {t.home.process_title}
          </h3>
          <p
            style={{
              fontSize: '13px',
              fontWeight: 300,
              lineHeight: 1.7,
              color: 'var(--body-text)',
              marginBottom: '20px',
              flex: 1,
            }}
          >
            {t.home.process_text}
          </p>
          <Link href="/process" style={{ fontSize: '13px', fontWeight: 500, color: 'var(--ink)' }}>
            {t.home.process_link}
          </Link>
        </div>
      </div>

      {/* Responsive overrides via <style> tag */}
      <style>{`
        [data-dark="true"] .hero-text { color: var(--ink) !important; }
        @media (max-width: 1023px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-image-col { display: none; }
        }
        @media (max-width: 767px) {
          .projects-grid { grid-template-columns: 1fr !important; }
          .bottom-cards { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .projects-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </>
  )
}
