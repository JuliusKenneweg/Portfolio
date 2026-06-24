'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface DarkModeContextType {
  dark: boolean
  toggle: () => void
}

const DarkModeContext = createContext<DarkModeContextType>({ dark: false, toggle: () => {} })

export function DarkModeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('darkMode')
      if (stored === 'false') {
        setDark(false)
        document.documentElement.removeAttribute('data-dark')
      } else {
        document.documentElement.setAttribute('data-dark', 'true')
      }
    } catch {
      document.documentElement.setAttribute('data-dark', 'true')
    }
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    try { localStorage.setItem('darkMode', String(next)) } catch {}
    if (next) {
      document.documentElement.setAttribute('data-dark', 'true')
    } else {
      document.documentElement.removeAttribute('data-dark')
    }
  }

  return (
    <DarkModeContext.Provider value={{ dark, toggle }}>
      {children}
    </DarkModeContext.Provider>
  )
}

export function useDarkMode() {
  return useContext(DarkModeContext)
}
