'use client'

import Link from 'next/link'
import { useState, useRef, useEffect, useCallback } from 'react'
import { useLanguage } from './LanguageProvider'
import { useDarkMode } from './DarkModeProvider'
import DarkModeToggle from './DarkModeToggle'

const PROJECT_LINKS = [
  { label: '01 — 3D-Print Remote', href: '/projects/3d-print-remote' },
  { label: '02 — Swing', href: '/projects/swing' },
  { label: '03 — GPU Fan Cover', href: '/projects/gpu-fan-cover' },
]

const LOGO_A = '/images/logo-a.png'
const LOGO_B = '/images/logo-b.png'
const LOGO_C = '/images/logo-c.png'

export default function Nav() {
  const { t, lang, setLang } = useLanguage()
  const { dark } = useDarkMode()
  const [workOpen, setWorkOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
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
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setWorkOpen(false)
      }
    }
    document.addEventListener('mousedown', onOutside)
    return () => document.removeEventListener('mousedown', onOutside)
  }, [])

  return (
    <>
      <style>{`
        @media (max-width: 767px) {
          .nav-name { display: none !important; }
        }
      `}</style>
      <nav
        style={{
          height: '88px',
          borderBottom: '1px solid var(--hairline)',
          background: 'var(--cream)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'stretch',
          justifyContent: 'space-between',
        }}
      >
        {/* ── Left side ── */}
        <div style={{ display: 'flex', alignItems: 'stretch' }}>
          {/* Logo + Name — gesamtes Feld ist Link zur Startseite */}
          <Link
            href="/"
            onClick={handleLogoClick}
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
            style={{
              display: 'flex',
              alignItems: 'stretch',
              borderRight: '1px solid var(--hairline)',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', padding: '0 12px 0 36px', height: '100%' }}>
              {showLogoC && !logoCFailed ? (
                <img src={LOGO_C} alt="Logo" onError={() => setLogoCFailed(true)} style={{ height: '24px', width: 'auto', display: 'block' }} />
              ) : showLogoB && !logoBFailed ? (
                <img src={LOGO_B} alt="Logo" onError={() => setLogoBFailed(true)} style={{ height: '24px', width: 'auto', display: 'block' }} />
              ) : !logoAFailed ? (
                <img src={LOGO_A} alt="Logo" onError={() => setLogoAFailed(true)} style={{ height: '24px', width: 'auto', display: 'block' }} />
              ) : (
                <span style={{ fontSize: '15px', fontWeight: 600, letterSpacing: '0.01em', color: 'var(--ink)', whiteSpace: 'nowrap' }}>
                  {t.nav.logo}
                </span>
              )}
            </div>

            <div className="nav-name" style={{ display: 'flex', alignItems: 'center', padding: '0 36px 0 12px', height: '100%' }}>
              <span style={{ fontSize: '14px', fontWeight: 400, color: 'var(--ink)', whiteSpace: 'nowrap' }}>
                Julius Kenneweg
              </span>
            </div>
          </Link>

          {/* Work dropdown — hidden on mobile */}
          <div
            ref={dropdownRef}
            className="nav-desktop-links"
            onMouseEnter={() => setWorkOpen(true)}
            onMouseLeave={() => setWorkOpen(false)}
            style={{ position: 'relative', display: 'flex', alignItems: 'stretch' }}
          >
            <button
              onClick={() => setWorkOpen(!workOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0 36px',
                gap: '6px',
                borderRight: '1px solid var(--hairline)',
                fontSize: '14px',
                fontWeight: 400,
                color: 'var(--ink)',
                background: 'none',
                cursor: 'pointer',
                height: '100%',
                whiteSpace: 'nowrap',
                fontFamily: 'inherit',
              }}
            >
              {t.nav.work}
              <svg
                width="8"
                height="5"
                viewBox="0 0 8 5"
                fill="none"
                style={{
                  transform: workOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.15s ease',
                  opacity: 0.5,
                }}
              >
                <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {workOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '88px',
                  left: 0,
                  background: 'var(--cream)',
                  border: '1px solid var(--hairline-strong)',
                  borderTop: 'none',
                  minWidth: '220px',
                  zIndex: 200,
                }}
              >
                {PROJECT_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setWorkOpen(false)}
                    style={{
                      display: 'block',
                      padding: '13px 20px',
                      fontSize: '13px',
                      fontWeight: 400,
                      color: 'var(--ink)',
                      borderBottom: '1px solid var(--hairline)',
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* About me */}
          <Link href="/about" className="nav-link nav-desktop-links">
            {t.nav.about}
          </Link>

          {/* Process */}
          <Link href="/process" className="nav-link nav-desktop-links">
            {t.nav.process}
          </Link>
        </div>

        {/* ── Right side ── */}
        <div style={{ display: 'flex', alignItems: 'stretch' }}>
          {/* Language switch */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0 36px',
              borderLeft: '1px solid var(--hairline)',
            }}
          >
            {(['en', 'de'] as const).map((l, i) => (
              <span key={l} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {i > 0 && (
                  <span style={{ color: 'var(--hairline-strong)', fontSize: '11px' }}>/</span>
                )}
                <button
                  onClick={() => setLang(l)}
                  style={{
                    fontSize: '11px',
                    fontWeight: lang === l ? 600 : 400,
                    color: lang === l ? 'var(--ink)' : 'var(--mute)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    letterSpacing: '0.08em',
                    padding: 0,
                    fontFamily: 'inherit',
                  }}
                >
                  {l.toUpperCase()}
                </button>
              </span>
            ))}
          </div>

          {/* Dark mode toggle */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0 36px',
              borderLeft: '1px solid var(--hairline)',
            }}
          >
            <DarkModeToggle />
          </div>

          {/* Hamburger — visible on mobile only */}
          <button
            className="nav-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: '52px',
              background: 'none',
              border: 'none',
              borderLeft: '1px solid var(--hairline)',
              cursor: 'pointer',
              color: 'var(--ink)',
              flexShrink: 0,
            }}
          >
            {mobileOpen ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                <path d="M0 1h18M0 7h18M0 13h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      <div
        className="nav-mobile-drawer"
        style={{
          position: 'fixed',
          top: '88px',
          left: 0,
          right: 0,
          background: 'var(--cream)',
          borderBottom: '1px solid var(--hairline-strong)',
          zIndex: 99,
          display: mobileOpen ? 'block' : 'none',
        }}
      >
        {[
          { label: t.nav.work, href: '/' },
          ...PROJECT_LINKS.map((l) => ({ label: '  ' + l.label, href: l.href })),
          { label: t.nav.about, href: '/about' },
          { label: t.nav.process, href: '/process' },
        ].map((item) => (
          <Link
            key={item.href + item.label}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            style={{
              display: 'block',
              padding: '14px 20px',
              fontSize: '14px',
              fontWeight: 400,
              color: 'var(--ink)',
              borderBottom: '1px solid var(--hairline)',
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </>
  )
}
