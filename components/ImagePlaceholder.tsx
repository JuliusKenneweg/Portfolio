'use client'

import { useState } from 'react'

interface Props {
  src?: string
  alt: string
  height?: number | string
  label?: string
  style?: React.CSSProperties
  contain?: boolean
}

const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg', '.mov']

function isVideo(src: string) {
  return VIDEO_EXTENSIONS.some((ext) => src.toLowerCase().endsWith(ext))
}

export default function ImagePlaceholder({ src, alt, height = 200, label, style, contain }: Props) {
  const [failed, setFailed] = useState(false)
  const h = typeof height === 'number' ? `${height}px` : height

  if (src && !failed) {
    if (isVideo(src)) {
      return (
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          onError={() => setFailed(true)}
          style={{
            width: '100%',
            height: h,
            objectFit: 'cover',
            display: 'block',
            ...style,
          }}
        />
      )
    }

    if (contain) {
      return (
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          style={{ width: '100%', height: 'auto', display: 'block', ...style }}
        />
      )
    }

    return (
      <img
        src={src}
        alt={alt}
        onError={() => setFailed(true)}
        style={{ width: '100%', height: h, objectFit: 'cover', display: 'block', ...style }}
      />
    )
  }

  return (
    <div
      style={{
        width: '100%',
        height: h,
        background: 'var(--surface-card)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        ...style,
      }}
    >
      <span
        style={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--mute)',
          fontFamily: 'inherit',
        }}
      >
        {label || alt}
      </span>
    </div>
  )
}
