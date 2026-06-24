'use client'

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { use } from 'react'
import { useLanguage } from '@/components/LanguageProvider'
import ImagePlaceholder from '@/components/ImagePlaceholder'
import projectsData, { type ProjectLocale } from '@/data/projects'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default function ProjectPage({ params }: PageProps) {
  const { slug } = use(params)
  const { t, lang: _lang } = useLanguage()
  const pt = t.project

  const base = projectsData.find((p) => p.slug === slug)
  if (!base) notFound()

  const locale = (t.projects as Record<string, ProjectLocale>)[slug] ?? ({} as ProjectLocale)

  const project = {
    slug: base.slug,
    year: base.year,
    tags: base.tags,
    heroImage: base.heroImage,
    imageA: base.imageA,
    imageB: base.imageB,
    name: locale.name ?? slug,
    category: locale.category ?? '',
    tools: locale.tools ?? '',
    headline: locale.headline ?? '',
    intro: locale.intro ?? [],
    videoSection: base.videoSection && locale.videoSection
      ? { ...locale.videoSection, video: base.videoSection.video }
      : undefined,
    interfaceSection: base.interfaceSection && locale.interfaceSection
      ? {
          title: locale.interfaceSection.title,
          items: base.interfaceSection.items.map((item, i) => ({
            image: item.image,
            text: locale.interfaceSection!.items[i]?.text ?? '',
          })),
        }
      : undefined,
    interactionSection: base.interactionSection && locale.interactionSection
      ? {
          title: locale.interactionSection.title,
          items: base.interactionSection.items.map((item, i) => ({
            image: item.image,
            caption: locale.interactionSection!.items[i]?.caption ?? '',
          })),
        }
      : undefined,
    imageTextSection: base.imageTextSection && locale.imageTextSection
      ? { ...locale.imageTextSection, image: base.imageTextSection.image }
      : undefined,
    gallerySection: base.gallerySection && locale.gallerySection
      ? {
          images: base.gallerySection.items.map((item) => item.image),
          captions: locale.gallerySection.captions,
        }
      : undefined,
    conceptSection: base.conceptSection && locale.conceptSection
      ? {
          title: locale.conceptSection.title,
          items: base.conceptSection.items.map((item, i) => ({
            image: item.image,
            text: locale.conceptSection!.texts[i] ?? '',
          })),
        }
      : undefined,
    processSteps: base.processSteps && locale.processSteps
      ? base.processSteps.map((step, i) => ({
          number: step.number,
          image: step.image,
          contain: step.contain,
          title: locale.processSteps![i]?.title ?? '',
          text: locale.processSteps![i]?.text ?? '',
          critical: locale.processSteps![i]?.critical,
        }))
      : undefined,
    criticalPoints: locale.criticalPoints ?? [],
    prevProject: base.prevProject
      ? {
          slug: base.prevProject,
          name: (t.projects as Record<string, ProjectLocale>)[base.prevProject]?.name ?? base.prevProject,
        }
      : undefined,
    nextProject: base.nextProject
      ? {
          slug: base.nextProject,
          name: (t.projects as Record<string, ProjectLocale>)[base.nextProject]?.name ?? base.nextProject,
        }
      : undefined,
  }

  return (
    <>
      {/* ── 1. Hero Image ──────────────────────── */}
      <div style={{ borderBottom: '1px solid var(--hairline)' }}>
        <ImagePlaceholder
          src={project.heroImage}
          alt={`${project.name} hero`}
          height={600}
          label={project.name}
        />
      </div>

      {/* ── 2. Meta Bar ────────────────────────── */}
      <div
        className="hairline-grid meta-bar"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          borderBottom: '1px solid var(--hairline)',
        }}
      >
        {[
          { label: pt.meta_project, value: project.name },
          { label: pt.meta_category, value: project.category },
          { label: pt.meta_tools, value: project.tools },
          { label: pt.meta_year, value: project.year },
        ].map((item) => (
          <div key={item.label} style={{ padding: '20px 24px' }}>
            <p className="label" style={{ marginBottom: '4px' }}>
              {item.label}
            </p>
            <p style={{ fontSize: '14px', fontWeight: 400, color: 'var(--ink)' }}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* ── 3. Intro ───────────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '3fr 5fr',
          borderBottom: '1px solid var(--hairline)',
        }}
        className="intro-grid"
      >
        <div
          style={{
            padding: '52px 40px 52px 32px',
            borderRight: '1px solid var(--hairline)',
            display: 'flex',
            alignItems: 'flex-start',
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(22px, 3vw, 32px)',
              fontWeight: 700,
              letterSpacing: '0.01em',
              lineHeight: 1.2,
            }}
          >
            {project.headline}
          </h1>
        </div>

        <div style={{ padding: '52px 32px 52px 40px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {project.intro.map((para, i) => (
            <p
              key={i}
              style={{ fontSize: '14px', fontWeight: 300, lineHeight: 1.8, color: 'var(--body-text)' }}
            >
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* ── 3b. Video Section (optional) ──────── */}
      {project.videoSection && (
        <div
          className="hairline-grid video-section-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            borderBottom: '1px solid var(--hairline)',
          }}
        >
          <div style={{
            padding: '48px 40px 48px 32px',
            borderRight: '1px solid var(--hairline)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '14px',
          }}>
            <p className="label">{project.videoSection.title}</p>
            <p style={{
              fontSize: '14px',
              fontWeight: 300,
              lineHeight: 1.75,
              color: 'var(--body-text)',
            }}>
              {project.videoSection.text}
            </p>
          </div>

          <ImagePlaceholder
            src={project.videoSection.video}
            alt="Project video"
            height={360}
            label="Video"
          />
        </div>
      )}

      {/* ── 4. Image Pair ──────────────────────── */}
      <div
        className="hairline-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          borderBottom: '1px solid var(--hairline)',
        }}
      >
        <ImagePlaceholder
          src={project.imageA}
          alt={`${project.name} A`}
          height={320}
          label={`${project.name} — A`}
        />
        <ImagePlaceholder
          src={project.imageB}
          alt={`${project.name} B`}
          height={320}
          label={`${project.name} — B`}
        />
      </div>

      {/* ── 4b. Image + Text Section (optional) ── */}
      {project.imageTextSection && (
        <div
          className="hairline-grid image-text-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            borderBottom: '1px solid var(--hairline)',
          }}
        >
          <ImagePlaceholder
            src={project.imageTextSection.image}
            alt={project.imageTextSection.title}
            height={360}
            label={project.imageTextSection.title}
          />

          <div style={{
            padding: '48px 32px 48px 40px',
            borderLeft: '1px solid var(--hairline)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '14px',
          }}>
            <p className="label">{project.imageTextSection.title}</p>
            <p style={{
              fontSize: '14px',
              fontWeight: 300,
              lineHeight: 1.75,
              color: 'var(--body-text)',
            }}>
              {project.imageTextSection.text}
            </p>
          </div>
        </div>
      )}

      {/* ── 4c. Concept Section (optional) ──────── */}
      {project.conceptSection && (
        <div style={{ borderBottom: '1px solid var(--hairline)' }}>
          <div style={{ padding: '40px 32px 24px' }}>
            <p className="label">{project.conceptSection.title}</p>
          </div>
          <div
            className="hairline-grid concept-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              borderTop: '1px solid var(--hairline)',
            }}
          >
            {project.conceptSection.items.map((item, i) => (
              <ImagePlaceholder
                key={`ci-${i}`}
                src={item.image}
                alt={`Concept ${i + 1}`}
                height={320}
                label={`Concept 0${i + 1}`}
                contain
              />
            ))}
            {project.conceptSection.items.map((item, i) => (
              <div key={`ct-${i}`} style={{ padding: '28px 32px' }}>
                <p style={{ fontSize: '14px', fontWeight: 300, lineHeight: 1.75, color: 'var(--body-text)' }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 5. Process Steps ───────────────────── */}
      {project.processSteps && project.processSteps.length > 0 && (
        <div style={{ borderBottom: '1px solid var(--hairline)' }}>
          <div style={{ padding: '40px 32px 24px' }}>
            <p className="label">{locale.processLabel ?? pt.process_label}</p>
          </div>

          {project.processSteps.map((step) => (
            <div
              key={step.number}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                borderTop: '1px solid var(--hairline)',
              }}
              className="step-grid"
            >
              <div
                style={{
                  padding: '40px 40px 40px 32px',
                  borderRight: '1px solid var(--hairline)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '14px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', color: 'var(--mute)' }}>
                    {step.number}
                  </span>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, letterSpacing: '0.01em' }}>
                    {step.title}
                  </h3>
                </div>
                <p style={{ fontSize: '14px', fontWeight: 300, lineHeight: 1.75, color: 'var(--body-text)' }}>
                  {step.text}
                </p>

                {step.critical && (
                  <div className="critical-block">
                    {step.critical}
                  </div>
                )}
              </div>

              <ImagePlaceholder
                src={step.image}
                alt={`Step ${step.number}`}
                height={280}
                label={`Step ${step.number}`}
                contain={step.contain}
              />
            </div>
          ))}
        </div>
      )}

      {/* ── 5b. Interaction Section (optional) ─── */}
      {project.interactionSection && (
        <div style={{ borderBottom: '1px solid var(--hairline)' }}>
          <div style={{ padding: '40px 32px 24px' }}>
            <p className="label">{project.interactionSection.title}</p>
          </div>

          <div
            className="hairline-grid interaction-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}
          >
            {project.interactionSection.items.map((item, i) => (
              <div key={i} style={{ background: 'var(--cream)' }}>
                <ImagePlaceholder
                  src={item.image}
                  alt={`Interaction ${i + 1}`}
                  height={260}
                  label={`Interaction 0${i + 1}`}
                />
                <div style={{ padding: '20px 20px 24px' }}>
                  <p style={{
                    fontSize: '13px',
                    fontWeight: 300,
                    lineHeight: 1.7,
                    color: 'var(--body-text)',
                  }}>
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 5c. Interface Section (optional) ────── */}
      {project.interfaceSection && (
        <div style={{ borderBottom: '1px solid var(--hairline)' }}>
          <div style={{ padding: '40px 32px 24px' }}>
            <p className="label">{project.interfaceSection.title}</p>
          </div>

          <div className="hairline-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            {project.interfaceSection.items.map((item, i) => (
              <div
                key={i}
                className="hairline-grid interface-row"
                style={{ display: 'contents' }}
              >
                <div style={{
                  padding: '36px 40px 36px 32px',
                  borderRight: '1px solid var(--hairline)',
                  display: 'flex',
                  alignItems: 'center',
                  borderTop: i > 0 ? '1px solid var(--hairline)' : undefined,
                }}>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: 300,
                    lineHeight: 1.75,
                    color: 'var(--body-text)',
                  }}>
                    {item.text}
                  </p>
                </div>
                <div style={{ borderTop: i > 0 ? '1px solid var(--hairline)' : undefined }}>
                  <ImagePlaceholder
                    src={item.image}
                    alt={`Interface ${i + 1}`}
                    height={280}
                    label={`Interface 0${i + 1}`}
                    contain
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 5d. Gallery Section (optional) ─────── */}
      {project.gallerySection && (
        <div style={{ borderBottom: '1px solid var(--hairline)' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
            }}
            className="hairline-grid gallery-grid"
          >
            {project.gallerySection.images.map((img, i) => (
              <ImagePlaceholder
                key={i}
                src={img}
                alt={`Gallery ${i + 1}`}
                height={200}
                label={`${i + 1}`}
              />
            ))}
            {project.gallerySection.captions.map((caption, i) => (
              <div
                key={i}
                style={{
                  gridColumn: 'span 2',
                  padding: '20px 24px',
                  borderTop: '1px solid var(--hairline)',
                  borderRight: i < 2 ? '1px solid var(--hairline)' : undefined,
                }}
              >
                <p style={{ fontSize: '13px', fontWeight: 300, lineHeight: 1.7, color: 'var(--body-text)' }}>
                  {caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 6. Critical Points ─────────────────── */}
      <div style={{ borderBottom: '1px solid var(--hairline)' }}>
        <div style={{ padding: '40px 32px 24px' }}>
          <p className="label">{pt.critical_label}</p>
        </div>

        <div
          className="hairline-grid critical-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
          }}
        >
          {project.criticalPoints.map((point) => (
            <div key={point.title} style={{ padding: '28px 28px 32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--mute)' }}>{point.positive ? '[+]' : '[-]'}</span>
                <h4 style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '0.01em' }}>
                  {point.title}
                </h4>
              </div>
              <p style={{ fontSize: '13px', fontWeight: 300, lineHeight: 1.7, color: 'var(--body-text)' }}>
                {point.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── 7. Project Navigation ──────────────── */}
      <div
        className="hairline-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
        }}
      >
        <div style={{ padding: '32px' }}>
          {project.prevProject ? (
            <Link
              href={`/projects/${project.prevProject.slug}`}
              style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
            >
              <span className="label">{pt.prev_project}</span>
              <span style={{ fontSize: '16px', fontWeight: 600, letterSpacing: '0.01em', color: 'var(--ink)' }}>
                {project.prevProject.name}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </div>

        <div
          style={{
            padding: '32px',
            textAlign: 'right',
            borderLeft: '1px solid var(--hairline)',
          }}
        >
          {project.nextProject ? (
            <Link
              href={`/projects/${project.nextProject.slug}`}
              style={{ display: 'inline-flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}
            >
              <span className="label">{pt.next_project}</span>
              <span style={{ fontSize: '16px', fontWeight: 600, letterSpacing: '0.01em', color: 'var(--ink)' }}>
                {project.nextProject.name}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .meta-bar { grid-template-columns: repeat(2, 1fr) !important; }
          .intro-grid { grid-template-columns: 1fr !important; }
          .intro-grid > div:first-child { border-right: none !important; padding: 32px 20px 24px !important; }
          .intro-grid > div:last-child { padding: 0 20px 32px !important; }
          .step-grid { grid-template-columns: 1fr !important; }
          .step-grid > div:first-child { border-right: none !important; }
          .step-grid > div:last-child { display: none; }
          .critical-grid { grid-template-columns: 1fr !important; }
          .interaction-grid { grid-template-columns: 1fr !important; }
          .video-section-grid { grid-template-columns: 1fr !important; }
          .video-section-grid > div:first-child { border-right: none !important; padding: 32px 20px 24px !important; }
          .image-text-grid { grid-template-columns: 1fr !important; }
          .concept-grid { grid-template-columns: 1fr !important; }
          .image-text-grid > div:last-child { border-left: none !important; padding: 32px 20px 24px !important; }
        }
      `}</style>
    </>
  )
}
