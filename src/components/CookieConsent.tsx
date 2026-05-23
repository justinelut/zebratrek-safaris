'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) setShow(true)
  }, [])

  const accept = () => { localStorage.setItem('cookie-consent', 'accepted'); setShow(false) }
  const decline = () => { localStorage.setItem('cookie-consent', 'declined'); setShow(false) }

  if (!show) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-[var(--bg)] border-t border-[var(--border)] shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="container-wide flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="text-[0.8rem] text-[var(--fg-muted)] max-w-2xl leading-relaxed">
          We use cookies to improve your experience. By continuing to browse, you agree to our{' '}
          <Link href="/privacy-policy" className="underline hover:text-[var(--fg)]">privacy policy</Link>.
        </p>
        <div className="flex gap-3 shrink-0">
          <button onClick={decline} className="text-[0.7rem] tracking-[0.15em] uppercase px-5 py-2.5 border border-[var(--border)] hover:border-[var(--fg)] transition-colors rounded-sm">
            Decline
          </button>
          <button onClick={accept} className="text-[0.7rem] tracking-[0.15em] uppercase px-5 py-2.5 bg-[var(--accent)] text-ivory hover:bg-[var(--accent-hover)] transition-colors rounded-sm">
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
