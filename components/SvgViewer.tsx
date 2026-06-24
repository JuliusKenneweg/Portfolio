'use client'

import { useRef, useState, useCallback, useEffect } from 'react'

interface Props {
  src: string
  style?: React.CSSProperties
}

interface VB { x: number; y: number; w: number; h: number }

export default function SvgViewer({ src, style }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const origVB = useRef<VB | null>(null)
  const curVB = useRef<VB | null>(null)
  const drag = useRef({ active: false, lastX: 0, lastY: 0 })
  const [markup, setMarkup] = useState('')

  useEffect(() => {
    fetch(src)
      .then(r => r.text())
      .then(text => {
        const parser = new DOMParser()
        const doc = parser.parseFromString(text, 'image/svg+xml')
        const svg = doc.querySelector('svg')
        if (!svg) return

        // Ensure a viewBox exists
        let vb: VB
        const raw = svg.getAttribute('viewBox')
        if (raw) {
          const [x, y, w, h] = raw.trim().split(/[\s,]+/).map(Number)
          vb = { x, y, w, h }
        } else {
          const w = parseFloat(svg.getAttribute('width') ?? '100')
          const h = parseFloat(svg.getAttribute('height') ?? '100')
          vb = { x: 0, y: 0, w, h }
          svg.setAttribute('viewBox', `0 0 ${w} ${h}`)
        }
        origVB.current = vb
        curVB.current = { ...vb }

        // Fill container
        svg.setAttribute('width', '100%')
        svg.setAttribute('height', '100%')
        svg.style.display = 'block'

        setMarkup(svg.outerHTML)
      })
      .catch(() => {})
  }, [src])

  const getSvg = () =>
    containerRef.current?.querySelector('svg') as SVGSVGElement | null

  const applyVB = (vb: VB) => {
    const orig = origVB.current
    let { x, y, w, h } = vb
    if (orig) {
      const mx = orig.w * 0.1
      const my = orig.h * 0.1
      x = Math.min(orig.x + orig.w - mx, Math.max(orig.x - w + mx, x))
      y = Math.min(orig.y + orig.h - my, Math.max(orig.y - h + my, y))
    }
    const clamped = { x, y, w, h }
    const svg = getSvg()
    if (svg) svg.setAttribute('viewBox', `${x} ${y} ${w} ${h}`)
    curVB.current = clamped
  }

  const reset = useCallback(() => {
    if (origVB.current) applyVB({ ...origVB.current })
  }, [])

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault()
    const container = containerRef.current
    const vb = curVB.current
    const orig = origVB.current
    if (!container || !vb || !orig) return

    const rect = container.getBoundingClientRect()
    const fx = (e.clientX - rect.left) / rect.width
    const fy = (e.clientY - rect.top) / rect.height

    const factor = e.deltaY > 0 ? 1.15 : 1 / 1.15
    const newW = Math.min(orig.w * 5, Math.max(orig.w / 100, vb.w * factor))
    const newH = Math.min(orig.h * 5, Math.max(orig.h / 100, vb.h * factor))

    // Keep the point under the cursor fixed
    applyVB({
      x: vb.x + (vb.w - newW) * fx,
      y: vb.y + (vb.h - newH) * fy,
      w: newW,
      h: newH,
    })
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [handleWheel])

  const setCursor = (c: string) => {
    if (containerRef.current) containerRef.current.style.cursor = c
  }

  const onMouseDown = (e: React.MouseEvent) => {
    drag.current = { active: true, lastX: e.clientX, lastY: e.clientY }
    setCursor('grabbing')
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!drag.current.active) return
    const container = containerRef.current
    const vb = curVB.current
    if (!container || !vb) return

    const rect = container.getBoundingClientRect()
    const dx = ((e.clientX - drag.current.lastX) / rect.width) * vb.w
    const dy = ((e.clientY - drag.current.lastY) / rect.height) * vb.h
    drag.current.lastX = e.clientX
    drag.current.lastY = e.clientY

    applyVB({ ...vb, x: vb.x - dx, y: vb.y - dy })
  }

  const stopPan = () => {
    drag.current.active = false
    setCursor('grab')
  }

  return (
    <div
      ref={containerRef}
      data-drag="true"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={stopPan}
      onMouseLeave={stopPan}
      onDoubleClick={reset}
      style={{
        width: '100%',
        height: '100%',
        minHeight: '280px',
        overflow: 'hidden',
        cursor: 'grab',
        position: 'relative',
        userSelect: 'none',
        border: '1px solid var(--hairline)',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {markup ? (
        <div
          style={{ position: 'absolute', inset: 0 }}
          dangerouslySetInnerHTML={{ __html: markup }}
        />
      ) : (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mute)' }}>
            SVG
          </span>
        </div>
      )}

      {/* Reset button */}
      <button
        onMouseDown={e => e.stopPropagation()}
        onClick={reset}
        title="Ansicht zurücksetzen"
        style={{
          position: 'absolute',
          bottom: '12px',
          right: '12px',
          width: '28px',
          height: '28px',
          background: 'var(--cream)',
          border: '1px solid var(--hairline-strong)',
          borderRadius: '4px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          color: 'var(--mute)',
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 1.5A4.5 4.5 0 1 0 10.5 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          <path d="M10.5 2.5V6h-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}
