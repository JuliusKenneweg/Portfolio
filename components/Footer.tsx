'use client'

import Link from 'next/link'
import { useState, useRef, useCallback } from 'react'
import { useLanguage } from './LanguageProvider'
import { useDarkMode } from './DarkModeProvider'

const LOGO_A = '/images/logo-a.png'
const LOGO_B = '/images/logo-b.png'
const LOGO_C = '/images/logo-c.png'

export default function Footer() {
  const { t } = useLanguage()
  const { dark } = useDarkMode()

  const [logoHovered, setLogoHovered] = useState(false)
  const [logoClicked, setLogoClicked] = useState(false)
  const [logoAFailed, setLogoAFailed] = useState(false)
  const [logoBFailed, setLogoBFailed] = useState(false)
  const [logoCFailed, setLogoCFailed] = useState(false)
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showLogoC = dark && (logoHovered || logoClicked)
  const showLogoB = !showLogoC && (dark || logoHovered || logoClicked)

  const handleLogoClick = useCallback(() => {
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current)
    setLogoClicked(true)
    clickTimerRef.current = setTimeout(() => setLogoClicked(false), 333)
  }, [])

  return (
    <footer
      style={{
        borderTop: '1px solid var(--hairline)',
        padding: '24px 32px',
        background: 'var(--cream)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        flexWrap: 'wrap',
      }}
    >
      <Link
        href="/"
        onClick={handleLogoClick}
        onMouseEnter={() => setLogoHovered(true)}
        onMouseLeave={() => setLogoHovered(false)}
        style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
      >
        {showLogoC && !logoCFailed ? (
          <img src={LOGO_C} alt="Logo" onError={() => setLogoCFailed(true)} style={{ height: '24px', width: 'auto', display: 'block' }} />
        ) : showLogoB && !logoBFailed ? (
          <img src={LOGO_B} alt="Logo" onError={() => setLogoBFailed(true)} style={{ height: '24px', width: 'auto', display: 'block' }} />
        ) : !logoAFailed ? (
          <img src={LOGO_A} alt="Logo" onError={() => setLogoAFailed(true)} style={{ height: '24px', width: 'auto', display: 'block' }} />
        ) : (
          <span style={{ fontSize: '15px', fontWeight: 600, letterSpacing: '0.01em', color: 'var(--ink)', whiteSpace: 'nowrap' }}>
            {t.footer.logo}
          </span>
        )}
      </Link>

      <div style={{ display: 'flex', gap: '24px' }}>
        {[
          { label: t.footer.work, href: '/' },
          { label: t.footer.about, href: '/about' },
          { label: t.footer.process, href: '/process' },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{ fontSize: '13px', color: 'var(--mute)', fontWeight: 400 }}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <a
        href="mailto:Julius.kenneweg8@gmail.com"
        className="btn btn-dark"
        style={{ fontSize: '13px', padding: '8px 20px' }}
      >
        {t.footer.cta}
      </a>

      <span style={{ fontSize: '12px', color: 'var(--mute)', fontWeight: 400 }}>
        {t.footer.location}
      </span>
    </footer>
  )
}
