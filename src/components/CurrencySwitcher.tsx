'use client'

import { useCurrency } from './CurrencyProvider'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown } from 'lucide-react'

const CURRENCIES = [
  { code: 'USD', label: 'US Dollar', symbol: '$' },
  { code: 'KES', label: 'Kenyan Shilling', symbol: 'KSh' },
  { code: 'EUR', label: 'Euro', symbol: '€' },
  { code: 'GBP', label: 'British Pound', symbol: '£' },
] as const

export function CurrencySwitcher({ className = '' }: { className?: string }) {
  const { currency, setCurrency } = useCurrency()
  const [open, setOpen] = useState(false)
  const current = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0]

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-[0.7rem] tracking-[0.15em] uppercase opacity-80 hover:opacity-100 transition-opacity"
      >
        <span>{current.code}</span>
        <ChevronDown size={12} strokeWidth={1.5} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 mt-2 z-50 min-w-[180px] py-2 rounded-md shadow-xl border"
              style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}
            >
              {CURRENCIES.map((c) => (
                <button
                  key={c.code}
                  onClick={() => { setCurrency(c.code); setOpen(false) }}
                  className={`w-full text-left px-4 py-2.5 text-[0.8rem] hover:bg-cream dark:hover:bg-[var(--bg-alt)] transition-colors ${currency === c.code ? 'font-medium text-[var(--accent)]' : ''}`}
                >
                  <span className="inline-block w-12 font-medium">{c.code}</span>
                  <span className="text-[var(--fg-muted)]">{c.label}</span>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
