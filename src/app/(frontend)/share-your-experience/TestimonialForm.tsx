'use client'

import { useState, type FormEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'

export function TestimonialForm({ whatsAppNumber }: { whatsAppNumber: string }) {
  const [error, setError] = useState('')
  const fieldClass = 'w-full border border-[var(--border)] bg-transparent px-4 py-3 text-[0.9rem] rounded-sm focus:border-[var(--accent)] outline-none transition-colors'

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') || '').trim()
    const country = String(form.get('country') || '').trim()
    const tripType = String(form.get('tripType') || '').trim()
    const rating = String(form.get('rating') || '').trim()
    const story = String(form.get('story') || '').trim()
    const destination = whatsAppNumber.replace(/\D/g, '')

    if (!destination) {
      setError('WhatsApp is not available right now. Please use the direct contact details on this page.')
      return
    }

    const message = [
      'Hello ZebraTrek Safaris, I would like to share feedback about my safari.',
      '',
      `Name: ${name}`,
      country ? `Country: ${country}` : '',
      tripType ? `Trip: ${tripType}` : '',
      `Rating: ${rating}/5`,
      `Experience: ${story}`,
    ].filter(Boolean).join('\n')

    window.location.assign(`https://wa.me/${destination}?text=${encodeURIComponent(message)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="story-name" className="block text-[0.7rem] tracking-[0.15em] uppercase mb-2">Your name *</label>
          <input id="story-name" name="name" autoComplete="name" required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="story-country" className="block text-[0.7rem] tracking-[0.15em] uppercase mb-2">Country</label>
          <input id="story-country" name="country" autoComplete="country-name" className={fieldClass} />
        </div>
      </div>
      <div>
        <label htmlFor="story-trip" className="block text-[0.7rem] tracking-[0.15em] uppercase mb-2">Trip type</label>
        <input id="story-trip" name="tripType" placeholder="e.g. Classic Masai Mara, Family Safari" className={fieldClass} />
      </div>
      <div>
        <label htmlFor="story-rating" className="block text-[0.7rem] tracking-[0.15em] uppercase mb-2">Rating</label>
        <select id="story-rating" name="rating" defaultValue="5" className={fieldClass}>
          {[5, 4, 3, 2, 1].map((rating) => <option key={rating} value={rating}>{rating} / 5</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="story-text" className="block text-[0.7rem] tracking-[0.15em] uppercase mb-2">Your experience *</label>
        <textarea id="story-text" name="story" required rows={5} placeholder="Tell us about your favourite moment or what you would tell a friend." className={`${fieldClass} resize-y`} />
      </div>
      {error && <p role="alert" className="text-[0.85rem] text-copper">{error}</p>}
      <button type="submit" className="inline-flex items-center gap-2 text-[0.7rem] tracking-[0.25em] uppercase px-10 py-4 bg-[var(--accent)] text-ivory hover:bg-[var(--accent-hover)] transition-colors rounded-sm">
        Continue in WhatsApp <ArrowUpRight size={15} />
      </button>
      <p className="text-xs text-[var(--fg-muted)]">WhatsApp opens with your story ready. Tap Send there to share it with our team.</p>
    </form>
  )
}
