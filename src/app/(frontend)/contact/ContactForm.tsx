'use client'

import { useActionState, useRef } from 'react'
import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'
import { submitEnquiry } from './actions'

type Props = { safariSlug?: string; successMessage: string }

export function ContactForm({ safariSlug, successMessage }: Props) {
  const [state, action, pending] = useActionState(submitEnquiry, { success: false })
  const turnstileRef = useRef<TurnstileInstance>(null)

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
        <p className="text-[1.4rem] font-light" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>Enquiry Sent</p>
        <p className="mt-3 text-[var(--fg-muted)] max-w-md mx-auto leading-relaxed">{successMessage}</p>
      </motion.div>
    )
  }

  return (
    <form action={action} className="space-y-6">
      {safariSlug && <input type="hidden" name="safari" value={safariSlug} />}
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      {state.error && <p className="text-[0.85rem] text-copper">{state.error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[0.7rem] tracking-[0.15em] uppercase mb-2">Name *</label>
          <input name="name" required className="w-full border border-[var(--border)] bg-transparent px-4 py-3 text-[0.9rem] rounded-sm focus:border-[var(--accent)] outline-none transition-colors" />
        </div>
        <div>
          <label className="block text-[0.7rem] tracking-[0.15em] uppercase mb-2">Email *</label>
          <input name="email" type="email" required className="w-full border border-[var(--border)] bg-transparent px-4 py-3 text-[0.9rem] rounded-sm focus:border-[var(--accent)] outline-none transition-colors" />
        </div>
        <div>
          <label className="block text-[0.7rem] tracking-[0.15em] uppercase mb-2">Phone</label>
          <input name="phone" type="tel" className="w-full border border-[var(--border)] bg-transparent px-4 py-3 text-[0.9rem] rounded-sm focus:border-[var(--accent)] outline-none transition-colors" />
        </div>
        <div>
          <label className="block text-[0.7rem] tracking-[0.15em] uppercase mb-2">Country</label>
          <input name="country" className="w-full border border-[var(--border)] bg-transparent px-4 py-3 text-[0.9rem] rounded-sm focus:border-[var(--accent)] outline-none transition-colors" />
        </div>
        <div>
          <label className="block text-[0.7rem] tracking-[0.15em] uppercase mb-2">Preferred Travel Dates</label>
          <input name="travelDates" placeholder="e.g. July 2026" className="w-full border border-[var(--border)] bg-transparent px-4 py-3 text-[0.9rem] rounded-sm focus:border-[var(--accent)] outline-none transition-colors" />
        </div>
        <div>
          <label className="block text-[0.7rem] tracking-[0.15em] uppercase mb-2">Number of Guests</label>
          <input name="numberOfGuests" type="number" min="1" className="w-full border border-[var(--border)] bg-transparent px-4 py-3 text-[0.9rem] rounded-sm focus:border-[var(--accent)] outline-none transition-colors" />
        </div>
        <div>
          <label className="block text-[0.7rem] tracking-[0.15em] uppercase mb-2">Budget</label>
          <select name="budget" className="w-full border border-[var(--border)] bg-transparent px-4 py-3 text-[0.9rem] rounded-sm focus:border-[var(--accent)] outline-none transition-colors">
            <option value="">Select range</option>
            <option>Under $3,000</option>
            <option>$3,000-$5,000</option>
            <option>$5,000-$10,000</option>
            <option>$10,000-$20,000</option>
            <option>$20,000+</option>
          </select>
        </div>
        <div>
          <label className="block text-[0.7rem] tracking-[0.15em] uppercase mb-2">How did you hear about us?</label>
          <select name="howDidYouHear" className="w-full border border-[var(--border)] bg-transparent px-4 py-3 text-[0.9rem] rounded-sm focus:border-[var(--accent)] outline-none transition-colors">
            <option value="">Select</option>
            <option>Google</option>
            <option>Instagram</option>
            <option>Facebook</option>
            <option>Friend/Referral</option>
            <option>Travel Agent</option>
            <option>TripAdvisor</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-[0.7rem] tracking-[0.15em] uppercase mb-2">Special Requests or Questions</label>
        <textarea name="specialRequests" rows={4} className="w-full border border-[var(--border)] bg-transparent px-4 py-3 text-[0.9rem] rounded-sm focus:border-[var(--accent)] outline-none transition-colors resize-none" />
      </div>

      <Turnstile
        ref={turnstileRef}
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
        options={{ theme: 'light', size: 'normal' }}
        onError={() => turnstileRef.current?.reset()}
      />

      <button
        type="submit"
        disabled={pending}
        className="text-[0.7rem] tracking-[0.25em] uppercase px-10 py-4 bg-[var(--accent)] text-ivory hover:bg-[var(--accent-hover)] transition-colors duration-300 rounded-sm disabled:opacity-50"
      >
        {pending ? 'Sending...' : 'Send Enquiry'}
      </button>
    </form>
  )
}
