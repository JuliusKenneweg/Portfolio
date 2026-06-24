'use client'

import { useEffect, useRef } from 'react'

const CLICKABLE = 'a, button, [role="button"], input, label, select, textarea'

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!dot.current) return
      dot.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`

      const el = document.elementFromPoint(e.clientX, e.clientY)
      const isClickable = !!el?.closest(CLICKABLE)
      const isDrag = !!el?.closest('[data-drag="true"]')
      if (label.current) {
        label.current.style.opacity = (isClickable || isDrag) ? '1' : '0'
        label.current.textContent = isDrag ? 'Drag me' : 'Click me'
      }
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div
      ref={dot}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        background: '#fff',
        mixBlendMode: 'difference',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-100px, -100px)',
        marginLeft: '-5px',
        marginTop: '-5px',
      }}
    >
      <span
        ref={label}
        style={{
          position: 'absolute',
          left: '14px',
          top: '-4px',
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          color: '#fff',
          opacity: 0,
          transition: 'opacity 0.15s ease',
        }}
      >
        Click me
      </span>
    </div>
  )
}
