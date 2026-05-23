'use client'

import { useActionState } from 'react'
import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import { submitTestimonial } from './actions'

export function TestimonialForm() {
  const [state, action, pending] = useActionState(submitTestimonial, { success: false })

  if (state.success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="p-12 border border-[var(--accent)] rounded-lg text-center bg-[var(--accent)]/5"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-16 h-16 mx-auto rounded-full bg-[var(--accent)] text-ivory flex items-center justify-center mb-6"
        >
          <Check size={32} strokeWidth={2} />
        </motion.div>
        <p className="text-[1.4rem] font-light" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>Thank You</p>
        <p className="mt-3 text-[var(--fg-muted)] max-w-md mx-auto leading-relaxed">Your experience has been submitted. We may feature it on our website after review.</p>
      </motion.div>
    )
  }

  return (
    <form action={action} className="space-y-6 max-w-xl mx-auto">
      {state.error && <p className="text-[0.85rem] text-copper">{state.error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[0.7rem] tracking-[0.15em] uppercase mb-2">Your Name *</label>
          <input name="guestName" required className="w-full border border-[var(--border)] bg-transparent px-4 py-3 text-[0.9rem] rounded-sm focus:border-[var(--accent)] outline-none transition-colors" />
        </div>
        <div>
          <label className="block text-[0.7rem] tracking-[0.15em] uppercase mb-2">Country</label>
          <input name="guestCountry" className="w-full border border-[var(--border)] bg-transparent px-4 py-3 text-[0.9rem] rounded-sm focus:border-[var(--accent)] outline-none transition-colors" />
        </div>
      </div>

      <div>
        <label className="block text-[0.7rem] tracking-[0.15em] uppercase mb-2">Trip Type</label>
        <input name="tripType" placeholder="e.g. Classic Masai Mara, Family Safari" className="w-full border border-[var(--border)] bg-transparent px-4 py-3 text-[0.9rem] rounded-sm focus:border-[var(--accent)] outline-none transition-colors" />
      </div>

      <div>
        <label className="block text-[0.7rem] tracking-[0.15em] uppercase mb-3">Rating</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <label key={n} className="cursor-pointer">
              <input type="radio" name="rating" value={n} defaultChecked={n === 5} className="sr-only peer" />
              <span className="block w-10 h-10 border border-[var(--border)] rounded-sm flex items-center justify-center text-[0.9rem] peer-checked:bg-[var(--accent-warm)] peer-checked:text-ivory peer-checked:border-[var(--accent-warm)] transition-colors">
                {n}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-[0.7rem] tracking-[0.15em] uppercase mb-2">Your Experience *</label>
        <textarea name="quote" required rows={5} placeholder="Tell us about your favourite moment, what surprised you, or what you'd tell a friend..." className="w-full border border-[var(--border)] bg-transparent px-4 py-3 text-[0.9rem] rounded-sm focus:border-[var(--accent)] outline-none transition-colors resize-none" />
      </div>

      <button type="submit" disabled={pending} className="text-[0.7rem] tracking-[0.25em] uppercase px-10 py-4 bg-[var(--accent)] text-ivory hover:bg-[var(--accent-hover)] transition-colors rounded-sm disabled:opacity-50">
        {pending ? 'Submitting...' : 'Share Your Story'}
      </button>
    </form>
  )
}
