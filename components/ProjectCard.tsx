import Link from 'next/link'
import ImagePlaceholder from './ImagePlaceholder'

interface Props {
  number: string
  name: string
  slug: string
  desc: string
  tags: string[]
  thumbImage?: string
}

export default function ProjectCard({ number, name, slug, desc, tags, thumbImage }: Props) {
  return (
    <Link
      href={`/projects/${slug}`}
      style={{
        display: 'block',
        color: 'var(--ink)',
        background: 'var(--cream)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <ImagePlaceholder
          src={thumbImage}
          alt={name}
          height={200}
          label={`Project ${number}`}
        />
        {/* Number overlay */}
        <span
          style={{
            position: 'absolute',
            top: '12px',
            left: '16px',
            fontSize: 'clamp(26px, 4vw, 36px)',
            fontWeight: 700,
            color: 'var(--ink-soft)',
            lineHeight: 1,
            letterSpacing: '0.01em',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          {number}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: 'var(--mute)',
            }}
          >
            [{number}]
          </span>
          <span style={{ fontSize: '16px', fontWeight: 600, letterSpacing: '0.01em' }}>
            {name}
          </span>
        </div>

        <p
          style={{
            fontSize: '13px',
            fontWeight: 300,
            lineHeight: 1.65,
            color: 'var(--body-text)',
            marginBottom: '14px',
          }}
        >
          {desc}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
          {tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>

        {/* Arrow link */}
        <span
          style={{
            fontSize: '13px',
            fontWeight: 500,
            color: 'var(--ink)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          View project
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
            <path d="M1 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  )
}
