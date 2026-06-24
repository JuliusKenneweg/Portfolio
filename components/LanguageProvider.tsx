'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import en from '@/locales/en.json'
import de from '@/locales/de.json'

export type Lang = 'en' | 'de'
export type Translations = typeof en

interface LanguageContextType {
  lang: Lang
  t: Translations
  setLang: (lang: Lang) => void
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  t: en,
  setLang: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    try {
      const stored = localStorage.getItem('lang') as Lang | null
      if (stored === 'en' || stored === 'de') setLangState(stored)
    } catch {}
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    try { localStorage.setItem('lang', l) } catch {}
  }

  const t = (lang === 'de' ? de : en) as Translations

  return (
    <LanguageContext.Provider value={{ lang, t, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
