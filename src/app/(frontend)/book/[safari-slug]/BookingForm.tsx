'use client'

import { useState, type FormEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'

type Props = { safariTitle: string; whatsAppNumber: string }

export function BookingForm({ safariTitle, whatsAppNumber }: Props) {
  const [error, setError] = useState('')
  const fieldClass = 'w-full border border-[var(--border)] bg-transparent px-4 py-3 text-[0.9rem] rounded-sm focus:border-[var(--accent)] outline-none transition-colors'

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    const form = new FormData(event.currentTarget)
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
    const source = query.get('utm_source') || (query.has('fbclid') ? 'Facebook / Instagram ad' : '')
    const campaign = query.get('utm_campaign')
    const message = [
      `Hello ZebraTrek Safaris, I am interested in the ${safariTitle}.`,
      '',
      `Name: ${name}`,
      `Phone: ${phone}`,
      email ? `Email: ${email}` : '',
      `Travel plans: ${details}`,
      source ? `Source: ${source}` : '',
      campaign ? `Campaign: ${campaign}` : '',
    ].filter(Boolean).join('\n')

    const browser = window as Window & {
      fbq?: (...args: unknown[]) => void
      dataLayer?: Array<Record<string, unknown>>
    }
    browser.fbq?.('trackCustom', 'WhatsAppEnquiryPrepared')
    browser.dataLayer?.push({ event: 'whatsapp_enquiry_prepared', form: 'booking' })
    window.location.assign(`https://wa.me/${destination}?text=${encodeURIComponent(message)}`)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 p-6 md:p-10 border border-[var(--border)] rounded-lg">
        <h2 className="text-[1.5rem] font-light" style={{ fontFamily: 'var(--font-display)' }}>Plan your safari</h2>
        <p className="text-[0.85rem] text-[var(--fg-muted)] mt-2 mb-8">Share the essentials. WhatsApp will open with your request ready; you can add photos and send it there.</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="booking-name" className="block text-[0.7rem] tracking-[0.15em] uppercase mb-2">Name *</label>
            <input id="booking-name" name="name" autoComplete="name" required className={fieldClass} />
          </div>
          <div>
            <label htmlFor="booking-phone" className="block text-[0.7rem] tracking-[0.15em] uppercase mb-2">Phone *</label>
            <input id="booking-phone" name="phone" type="tel" autoComplete="tel" required className={fieldClass} />
          </div>
          <div>
            <label htmlFor="booking-email" className="block text-[0.7rem] tracking-[0.15em] uppercase mb-2">Email <span className="normal-case tracking-normal text-[var(--fg-muted)]">(optional)</span></label>
            <input id="booking-email" name="email" type="email" autoComplete="email" className={fieldClass} />
          </div>
          <div>
            <label htmlFor="booking-details" className="block text-[0.7rem] tracking-[0.15em] uppercase mb-2">Travel plans *</label>
            <textarea id="booking-details" name="details" required rows={5} placeholder="Preferred dates, number of travellers, and anything else we should know." className={`${fieldClass} resize-y`} />
          </div>
          {error && <p role="alert" className="text-[0.85rem] text-copper">{error}</p>}
          <button type="submit" className="inline-flex items-center gap-2 text-[0.7rem] tracking-[0.25em] uppercase px-10 py-4 bg-[var(--accent)] text-ivory hover:bg-[var(--accent-hover)] transition-colors duration-300 rounded-sm">
            Continue in WhatsApp <ArrowUpRight size={15} />
          </button>
        </form>
      </div>
      <aside className="p-6 border border-[var(--border)] rounded-lg bg-[var(--bg)]">
        <h3 className="text-[1.1rem] font-medium">No payment required now</h3>
        <p className="mt-2 text-[0.85rem] text-[var(--fg-muted)] leading-relaxed">Our safari specialists will review your plans and prepare a personalised quote in WhatsApp.</p>
      </aside>
    </div>
  )
}
