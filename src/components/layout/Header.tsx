'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Sheet, SheetClose } from '@/components/ui/Sheet'
import { CurrencySwitcher } from '@/components/CurrencySwitcher'
type Props = {
  companyName: string
  navLinks: { href: string; label: string }[]
  ctaText: string
  ctaLink: string
}

export function Header({ companyName, navLinks, ctaText, ctaLink }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const textColor = scrolled ? 'text-[var(--fg)]' : 'text-ivory'
  const textMuted = scrolled ? 'text-[var(--fg-muted)]' : 'text-ivory/80'

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'backdrop-blur-md' : 'bg-transparent'
        }`}
        style={scrolled ? { background: 'color-mix(in srgb, var(--bg) 95%, transparent)' } : undefined}
      >
        <div className="container-wide flex items-center justify-between py-5">
          <Link
            href="/"
            className={`text-[1.5rem] font-light tracking-[0.02em] transition-colors duration-300 ${textColor}`}
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {companyName}
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[0.75rem] font-light tracking-[0.2em] uppercase transition-colors duration-300 hover:opacity-60 ${textMuted}`}
              >
                {link.label}
              </Link>
            ))}
            <div className={`${textMuted} transition-colors`}>
              <CurrencySwitcher />
            </div>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`transition-colors duration-300 hover:opacity-60 ${textMuted}`}
              aria-label="Toggle theme"
            >
              {mounted ? (theme === 'dark' ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />) : <span style={{ width: 16, height: 16, display: 'inline-block' }} />}
            </button>
          </nav>

          <button
            className={`lg:hidden transition-colors duration-300 ${textColor}`}
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <Sheet open={open} onOpenChange={setOpen}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between border-b px-6 py-5" style={{ borderColor: 'var(--border)' }}>
            <span className="text-[1.2rem] font-light" style={{ fontFamily: 'var(--font-display)', color: 'var(--fg)' }}>
              {companyName}
            </span>
            <SheetClose className="opacity-60 hover:opacity-100 transition-opacity" />
          </div>

          <nav className="flex-1 flex flex-col gap-1 px-6 py-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-[1.8rem] font-light py-2 hover:text-gold transition-colors duration-300"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--fg)' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="px-6 py-6 space-y-5" style={{ borderTop: '1px solid var(--border)' }}>
            <Link
              href={ctaLink}
              onClick={() => setOpen(false)}
              className="block w-full text-center text-[0.7rem] tracking-[0.2em] uppercase py-4 border hover:bg-charcoal hover:text-ivory transition-all duration-300"
              style={{ borderColor: 'var(--fg)', color: 'var(--fg)' }}
            >
              {ctaText}
            </Link>
            <div className="flex items-center justify-between">
              <span className="text-[0.65rem] tracking-[0.2em] uppercase" style={{ color: 'var(--fg-muted)' }}>Appearance</span>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="flex items-center gap-2 text-[0.7rem] hover:text-gold transition-colors"
                style={{ color: 'var(--fg-muted)' }}
              >
                {mounted ? (theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />) : <span style={{ width: 14, height: 14 }} />}
                {mounted ? (theme === 'dark' ? 'Light' : 'Dark') : ''}
              </button>
            </div>
          </div>
        </div>
      </Sheet>
    </>
  )
}
