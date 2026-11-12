'use client'

import { useState, type FormEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'

type Props = { whatsAppNumber: string }

export function ContactForm({ whatsAppNumber }: Props) {
  const [error, setError] = useState('')
  const fieldClass = 'w-full border border-[var(--border)] bg-transparent px-4 py-3 text-[0.9rem] rounded-sm focus:border-[var(--accent)] outline-none transition-colors'

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    const form = new FormData(event.currentTarget)
    if (String(form.get('website') || '').trim()) return
    const name = String(form.get('name') || '').trim()
    const phone = String(form.get('phone') || '').trim()
    const email = String(form.get('email') || '').trim()
    const details = String(form.get('details') || '').trim()
    const destination = whatsAppNumber.replace(/\D/g, '')

    if (!destination) {
      setError('WhatsApp is not available right now. Please use the direct contact details on this page.')
      return
    }

    const query = new URLSearchParams(window.location.search)
    const safari = query.get('safari')
    const source = query.get('utm_source') || (query.has('fbclid') ? 'Facebook / Instagram ad' : '')
    const campaign = query.get('utm_campaign')
    const message = [
      'Hello ZebraTrek Safaris, I would like to plan a safari.',
      '',
      `Name: ${name}`,
      `Phone: ${phone}`,
      email ? `Email: ${email}` : '',
      safari ? `Safari of interest: ${safari}` : '',
      `Message: ${details}`,
      source ? `Source: ${source}` : '',
      campaign ? `Campaign: ${campaign}` : '',
    ].filter(Boolean).join('\n')

    const browser = window as Window & {
      fbq?: (...args: unknown[]) => void
      dataLayer?: Array<Record<string, unknown>>
    }
    browser.fbq?.('trackCustom', 'WhatsAppEnquiryPrepared')
    browser.dataLayer?.push({ event: 'whatsapp_enquiry_prepared', form: 'contact' })
    window.location.assign(`https://wa.me/${destination}?text=${encodeURIComponent(message)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="absolute -left-[10000px]" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="contact-name" className="block text-[0.7rem] tracking-[0.15em] uppercase mb-2">Name *</label>
          <input id="contact-name" name="name" autoComplete="name" required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="contact-phone" className="block text-[0.7rem] tracking-[0.15em] uppercase mb-2">Phone *</label>
          <input id="contact-phone" name="phone" type="tel" autoComplete="tel" required className={fieldClass} />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="contact-email" className="block text-[0.7rem] tracking-[0.15em] uppercase mb-2">Email <span className="normal-case tracking-normal text-[var(--fg-muted)]">(optional)</span></label>
          <input id="contact-email" name="email" type="email" autoComplete="email" className={fieldClass} />
        </div>
      </div>

      <div>
        <label htmlFor="contact-details" className="block text-[0.7rem] tracking-[0.15em] uppercase mb-2">How can we help? *</label>
        <textarea id="contact-details" name="details" required rows={5} placeholder="Tell us where you would like to travel, when, and who is travelling." className={`${fieldClass} resize-y`} />
      </div>

      {error && <p role="alert" className="text-[0.85rem] text-copper">{error}</p>}

      <button type="submit" className="inline-flex items-center gap-2 text-[0.7rem] tracking-[0.25em] uppercase px-10 py-4 bg-[var(--accent)] text-ivory hover:bg-[var(--accent-hover)] transition-colors duration-300 rounded-sm">
        Continue in WhatsApp <ArrowUpRight size={15} />
      </button>
      <p className="text-xs text-[var(--fg-muted)]">WhatsApp opens with your details ready. Tap Send there to reach our team.</p>
    </form>
  )
}
