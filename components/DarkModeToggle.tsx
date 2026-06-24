'use client'

import { useDarkMode } from './DarkModeProvider'

export default function DarkModeToggle() {
  const { dark, toggle } = useDarkMode()

  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'var(--ink)',
        padding: 0,
      }}
    >
      <span style={{ fontSize: '13px', lineHeight: 1 }}>
        {'☽'}
      </span>
      <div
        style={{
          width: '28px',
          height: '16px',
          borderRadius: '8px',
          background: dark ? 'var(--ink)' : 'var(--surface-card)',
          border: '1px solid var(--hairline-strong)',
          position: 'relative',
          transition: 'background 0.2s ease',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '2px',
            left: dark ? '12px' : '2px',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: dark ? 'var(--cream)' : 'var(--mute)',
            transition: 'left 0.2s ease',
          }}
        />
      </div>
    </button>
  )
}
