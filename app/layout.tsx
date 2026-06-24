import type { Metadata } from 'next'
import './globals.css'
import { DarkModeProvider } from '@/components/DarkModeProvider'
import { LanguageProvider } from '@/components/LanguageProvider'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Cursor from '@/components/Cursor'

export const metadata: Metadata = {
  title: 'Julius Kenneweg — Industrial & UX Design',
  description: 'Portfolio of Julius Kenneweg, Industrial & UX Designer based in Darmstadt.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-grotesk@300,400,500,600,700&display=swap"
        />
        {/* Anti-flash script for dark mode */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('darkMode')==='true')document.documentElement.setAttribute('data-dark','true')}catch(e){}`,
          }}
        />
      </head>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', cursor: 'none' }}>
        <DarkModeProvider>
          <LanguageProvider>
            <Cursor />
            <Nav />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
          </LanguageProvider>
        </DarkModeProvider>
      </body>
    </html>
  )
}
