'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-6 left-6 z-40 w-11 h-11 rounded-full border border-[var(--border)] bg-[var(--bg)] flex items-center justify-center shadow-md hover:border-[var(--fg)] transition-all duration-300"
    >
      <ArrowUp size={16} strokeWidth={1.5} />
    </button>
  )
}
