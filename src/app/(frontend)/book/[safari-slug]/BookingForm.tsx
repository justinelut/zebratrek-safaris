'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Calendar, Users, Bed, Sparkles, Check, ChevronLeft, ChevronRight } from 'lucide-react'
import { submitBookingRequest } from './actions'
import { Price } from '@/components/Price'
import { useCurrency } from '@/components/CurrencyProvider'
import { convertPrice, formatPrice } from '@/lib/currency'

type Props = { safariId: string; safariSlug: string; safariTitle: string; basePrice: number; currency: string; duration: string }

const ACCOMMODATIONS = [
  { id: 'Standard', name: 'Standard Lodge', description: 'Comfortable lodge rooms with en-suite bathrooms', priceMultiplier: 1, badge: 'Best Value' },
  { id: 'Luxury', name: 'Luxury Tented Camp', description: 'Premium tented suites with private decks and outdoor showers', priceMultiplier: 1.4, badge: 'Most Popular' },
  { id: 'Ultra-Luxury', name: 'Private Villa', description: 'Exclusive villas with butler service, plunge pools, and gourmet dining', priceMultiplier: 2.2, badge: null },
]

const EXTRAS = [
  { id: 'Hot Air Balloon', name: 'Hot Air Balloon Safari', price: 450, description: 'Sunrise flight with champagne breakfast' },
  { id: 'Photography Guide', name: 'Specialist Photography Guide', price: 350, description: 'Per day, dedicated expert' },
  { id: 'Private Vehicle', name: 'Private Game Drive Vehicle', price: 800, description: 'Per safari, no shared seats' },
  { id: 'Bush Dinner', name: 'Private Bush Dinner', price: 250, description: 'Candlelit dinner under the stars' },
  { id: 'Spa Treatment', name: 'Couples Spa Package', price: 200, description: 'In-camp massage and treatment' },
  { id: 'Walking Safari', name: 'Walking Safari', price: 150, description: 'Half-day with armed ranger' },
  { id: 'Night Drive', name: 'Night Game Drive', price: 180, description: 'Spotlight nocturnal wildlife' },
  { id: 'Cultural Visit', name: 'Maasai Village Visit', price: 90, description: 'Authentic cultural experience' },
]

export function BookingForm({ safariId, safariSlug, safariTitle, basePrice, currency, duration }: Props) {
  const { currency: displayCurrency } = useCurrency()
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<{ success: boolean; ref?: string; error?: string } | null>(null)
  const [form, setForm] = useState({
    startDate: '', endDate: '', numberOfAdults: 2, numberOfChildren: 0,
    guestName: '', guestEmail: '', guestPhone: '', guestCountry: '',
    accommodation: 'Luxury', extras: [] as string[], specialRequests: '',
  })

  const update = <K extends keyof typeof form>(field: K, value: typeof form[K]) => setForm((f) => ({ ...f, [field]: value }))
  const toggleExtra = (extra: string) => {
    setForm((f) => ({ ...f, extras: f.extras.includes(extra) ? f.extras.filter((e) => e !== extra) : [...f.extras, extra] }))
  }

  // Calculate pricing
  const pricing = useMemo(() => {
    const accom = ACCOMMODATIONS.find((a) => a.id === form.accommodation) || ACCOMMODATIONS[1]
    const guests = form.numberOfAdults + form.numberOfChildren * 0.5
    const safariTotal = basePrice * accom.priceMultiplier * guests
    const extrasTotal = form.extras.reduce((sum, id) => sum + (EXTRAS.find((e) => e.id === id)?.price || 0), 0)
    const subtotal = safariTotal + extrasTotal
    const conservation = subtotal * 0.05
    const total = subtotal + conservation
    return { safariTotal, extrasTotal, conservation, total, accom }
  }, [form.accommodation, form.numberOfAdults, form.numberOfChildren, form.extras])

  const handleSubmit = async () => {
    setSubmitting(true)
    const res = await submitBookingRequest({ ...form, numberOfAdults: String(form.numberOfAdults), numberOfChildren: String(form.numberOfChildren), safariId })
    setResult(res)
    setSubmitting(false)
  }

  const nights = useMemo(() => {
    if (!form.startDate || !form.endDate) return 0
    const ms = new Date(form.endDate).getTime() - new Date(form.startDate).getTime()
    return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)))
  }, [form.startDate, form.endDate])

  if (result?.success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-12 border border-[var(--accent)] rounded-lg bg-[var(--accent)]/5"
      >
        <div className="w-16 h-16 mx-auto rounded-full bg-[var(--accent)] text-ivory flex items-center justify-center mb-6">
          <Check size={32} strokeWidth={2} />
        </div>
        <h2 className="text-[1.6rem] font-light" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>Booking Request Received</h2>
        <p className="mt-3 text-[var(--fg-muted)]">Reference: <strong className="text-[var(--fg)]">{result.ref}</strong></p>
        <p className="mt-4 text-[0.9rem] text-[var(--fg-muted)] max-w-md mx-auto leading-relaxed">
          Our safari specialists are preparing your detailed quote. Expect a personalised response within 24 hours at <strong>{form.guestEmail}</strong>.
        </p>
      </motion.div>
    )
  }

  const steps = [
    { num: 1, label: 'Dates & Guests', icon: Calendar },
    { num: 2, label: 'Accommodation', icon: Bed },
    { num: 3, label: 'Extras', icon: Sparkles },
    { num: 4, label: 'Your Details', icon: Users },
    { num: 5, label: 'Review', icon: Check },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main flow */}
      <div className="lg:col-span-2">
        {/* Progress indicator */}
        <div className="flex items-center justify-between mb-10 overflow-x-auto pb-2">
          {steps.map((s, i) => {
            const Icon = s.icon
            const active = step === s.num
            const done = step > s.num
            return (
              <div key={s.num} className="flex items-center gap-3 shrink-0">
                <motion.div
                  animate={{ scale: active ? 1.1 : 1, backgroundColor: active || done ? 'var(--accent)' : 'transparent' }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-[0.8rem] font-medium border ${active || done ? 'border-[var(--accent)] text-ivory' : 'border-[var(--border)] text-[var(--fg-muted)]'}`}
                >
                  {done ? <Check size={16} /> : <Icon size={16} />}
                </motion.div>
                <span className={`text-[0.7rem] tracking-[0.1em] uppercase hidden md:block ${active ? 'text-[var(--fg)] font-medium' : 'text-[var(--fg-muted)]'}`}>{s.label}</span>
                {i < steps.length - 1 && <div className={`w-8 h-px ${done ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'}`} />}
              </div>
            )
          })}
        </div>

        {result?.error && <p className="mb-4 text-[0.85rem] text-copper">{result.error}</p>}

        <AnimatePresence mode="wait">
          {/* Step 1: Dates & Guests */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }} className="space-y-8">
              <div>
                <h2 className="text-[1.5rem] font-light" style={{ fontFamily: 'var(--font-display)' }}>When are you travelling?</h2>
                <p className="text-[0.85rem] text-[var(--fg-muted)] mt-1">Select your preferred dates. We&apos;ll confirm availability.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[0.7rem] tracking-[0.15em] uppercase mb-2 text-[var(--fg-muted)]">Check-in *</label>
                  <input type="date" value={form.startDate} min={new Date().toISOString().split('T')[0]} onChange={(e) => update('startDate', e.target.value)} required className="w-full border border-[var(--border)] bg-transparent px-4 py-3.5 text-[0.9rem] rounded-md focus:border-[var(--accent)] outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-[0.7rem] tracking-[0.15em] uppercase mb-2 text-[var(--fg-muted)]">Check-out *</label>
                  <input type="date" value={form.endDate} min={form.startDate || new Date().toISOString().split('T')[0]} onChange={(e) => update('endDate', e.target.value)} required className="w-full border border-[var(--border)] bg-transparent px-4 py-3.5 text-[0.9rem] rounded-md focus:border-[var(--accent)] outline-none transition-colors" />
                </div>
              </div>
              {nights > 0 && (
                <div className="px-4 py-3 bg-[var(--accent)]/5 rounded-md text-[0.85rem]">
                  <span className="text-[var(--fg-muted)]">Duration: </span>
                  <strong className="text-[var(--accent)]">{nights} {nights === 1 ? 'night' : 'nights'}</strong>
                </div>
              )}

              <div className="pt-4 border-t border-[var(--border)]">
                <h3 className="text-[1rem] font-medium mb-4">How many travellers?</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-[var(--border)] rounded-md">
                    <div>
                      <p className="font-medium text-[0.95rem]">Adults</p>
                      <p className="text-[0.75rem] text-[var(--fg-muted)]">Ages 13+</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => update('numberOfAdults', Math.max(1, form.numberOfAdults - 1))} className="w-9 h-9 rounded-full border border-[var(--border)] hover:border-[var(--fg)] disabled:opacity-30 transition-colors" disabled={form.numberOfAdults <= 1}>−</button>
                      <span className="w-8 text-center font-medium tabular-nums">{form.numberOfAdults}</span>
                      <button onClick={() => update('numberOfAdults', form.numberOfAdults + 1)} className="w-9 h-9 rounded-full border border-[var(--border)] hover:border-[var(--fg)] transition-colors">+</button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-[var(--border)] rounded-md">
                    <div>
                      <p className="font-medium text-[0.95rem]">Children</p>
                      <p className="text-[0.75rem] text-[var(--fg-muted)]">Ages 2-12 (50% rate)</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => update('numberOfChildren', Math.max(0, form.numberOfChildren - 1))} className="w-9 h-9 rounded-full border border-[var(--border)] hover:border-[var(--fg)] disabled:opacity-30 transition-colors" disabled={form.numberOfChildren <= 0}>−</button>
                      <span className="w-8 text-center font-medium tabular-nums">{form.numberOfChildren}</span>
                      <button onClick={() => update('numberOfChildren', form.numberOfChildren + 1)} className="w-9 h-9 rounded-full border border-[var(--border)] hover:border-[var(--fg)] transition-colors">+</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button onClick={() => setStep(2)} disabled={!form.startDate || !form.endDate || nights <= 0} className="text-[0.7rem] tracking-[0.25em] uppercase px-10 py-4 bg-[var(--accent)] text-ivory hover:bg-[var(--accent-hover)] transition-colors rounded-md disabled:opacity-50 inline-flex items-center gap-2">
                  Choose Accommodation <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Accommodation */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }} className="space-y-6">
              <div>
                <h2 className="text-[1.5rem] font-light" style={{ fontFamily: 'var(--font-display)' }}>Choose your accommodation</h2>
                <p className="text-[0.85rem] text-[var(--fg-muted)] mt-1">All options include full board, game drives, and park fees.</p>
              </div>
              <div className="space-y-4">
                {ACCOMMODATIONS.map((accom) => {
                  const selected = form.accommodation === accom.id
                  const price = basePrice * accom.priceMultiplier
                  return (
                    <motion.button
                      key={accom.id}
                      whileHover={{ y: -2 }}
                      onClick={() => update('accommodation', accom.id)}
                      className={`w-full text-left p-5 border-2 rounded-lg transition-all ${selected ? 'border-[var(--accent)] bg-[var(--accent)]/5' : 'border-[var(--border)] hover:border-[var(--fg)]'}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-medium text-[1.05rem]">{accom.name}</h3>
                            {accom.badge && <span className="text-[0.65rem] tracking-[0.1em] uppercase px-2 py-0.5 bg-[var(--accent-warm)]/20 text-[var(--accent-warm)] rounded">{accom.badge}</span>}
                          </div>
                          <p className="text-[0.85rem] text-[var(--fg-muted)] mt-1">{accom.description}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-[1.1rem] font-medium tabular-nums" style={{ fontFamily: 'var(--font-display)' }}>{formatPrice(convertPrice(price, currency, displayCurrency), displayCurrency)}</p>
                          <p className="text-[0.7rem] text-[var(--fg-muted)]">per person</p>
                        </div>
                      </div>
                      {selected && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 pt-4 border-t border-[var(--accent)]/20 text-[0.8rem] text-[var(--accent)] flex items-center gap-2">
                          <Check size={14} /> Selected
                        </motion.div>
                      )}
                    </motion.button>
                  )
                })}
              </div>
              <div className="flex justify-between pt-4">
                <button onClick={() => setStep(1)} className="text-[0.7rem] tracking-[0.25em] uppercase px-8 py-4 border border-[var(--border)] hover:border-[var(--fg)] transition-colors rounded-md inline-flex items-center gap-2"><ChevronLeft size={14} /> Back</button>
                <button onClick={() => setStep(3)} className="text-[0.7rem] tracking-[0.25em] uppercase px-10 py-4 bg-[var(--accent)] text-ivory hover:bg-[var(--accent-hover)] transition-colors rounded-md inline-flex items-center gap-2">Add Extras <ChevronRight size={14} /></button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Extras */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }} className="space-y-6">
              <div>
                <h2 className="text-[1.5rem] font-light" style={{ fontFamily: 'var(--font-display)' }}>Enhance your experience</h2>
                <p className="text-[0.85rem] text-[var(--fg-muted)] mt-1">Optional add-ons to make your safari unforgettable.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {EXTRAS.map((extra) => {
                  const selected = form.extras.includes(extra.id)
                  return (
                    <motion.button
                      key={extra.id}
                      whileHover={{ y: -2 }}
                      onClick={() => toggleExtra(extra.id)}
                      className={`text-left p-4 border-2 rounded-lg transition-all ${selected ? 'border-[var(--accent)] bg-[var(--accent)]/5' : 'border-[var(--border)] hover:border-[var(--fg)]'}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-[0.9rem]">{extra.name}</p>
                          <p className="text-[0.75rem] text-[var(--fg-muted)] mt-1">{extra.description}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-[0.9rem] font-medium tabular-nums">+{formatPrice(convertPrice(extra.price, 'USD', displayCurrency), displayCurrency)}</p>
                          {selected && <Check size={14} className="ml-auto mt-1 text-[var(--accent)]" />}
                        </div>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
              <div className="flex justify-between pt-4">
                <button onClick={() => setStep(2)} className="text-[0.7rem] tracking-[0.25em] uppercase px-8 py-4 border border-[var(--border)] hover:border-[var(--fg)] transition-colors rounded-md inline-flex items-center gap-2"><ChevronLeft size={14} /> Back</button>
                <button onClick={() => setStep(4)} className="text-[0.7rem] tracking-[0.25em] uppercase px-10 py-4 bg-[var(--accent)] text-ivory hover:bg-[var(--accent-hover)] transition-colors rounded-md inline-flex items-center gap-2">Your Details <ChevronRight size={14} /></button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Guest Details */}
          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }} className="space-y-6">
              <div>
                <h2 className="text-[1.5rem] font-light" style={{ fontFamily: 'var(--font-display)' }}>Your details</h2>
                <p className="text-[0.85rem] text-[var(--fg-muted)] mt-1">We&apos;ll use these to send your quote.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[0.7rem] tracking-[0.15em] uppercase mb-2 text-[var(--fg-muted)]">Full Name *</label>
                  <input value={form.guestName} onChange={(e) => update('guestName', e.target.value)} required className="w-full border border-[var(--border)] bg-transparent px-4 py-3.5 text-[0.9rem] rounded-md focus:border-[var(--accent)] outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-[0.7rem] tracking-[0.15em] uppercase mb-2 text-[var(--fg-muted)]">Email *</label>
                  <input type="email" value={form.guestEmail} onChange={(e) => update('guestEmail', e.target.value)} required className="w-full border border-[var(--border)] bg-transparent px-4 py-3.5 text-[0.9rem] rounded-md focus:border-[var(--accent)] outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-[0.7rem] tracking-[0.15em] uppercase mb-2 text-[var(--fg-muted)]">Phone</label>
                  <input type="tel" value={form.guestPhone} onChange={(e) => update('guestPhone', e.target.value)} className="w-full border border-[var(--border)] bg-transparent px-4 py-3.5 text-[0.9rem] rounded-md focus:border-[var(--accent)] outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-[0.7rem] tracking-[0.15em] uppercase mb-2 text-[var(--fg-muted)]">Country</label>
                  <input value={form.guestCountry} onChange={(e) => update('guestCountry', e.target.value)} className="w-full border border-[var(--border)] bg-transparent px-4 py-3.5 text-[0.9rem] rounded-md focus:border-[var(--accent)] outline-none transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-[0.7rem] tracking-[0.15em] uppercase mb-2 text-[var(--fg-muted)]">Special Requests</label>
                <textarea value={form.specialRequests} onChange={(e) => update('specialRequests', e.target.value)} rows={3} placeholder="Dietary requirements, accessibility, celebrations..." className="w-full border border-[var(--border)] bg-transparent px-4 py-3 text-[0.9rem] rounded-md focus:border-[var(--accent)] outline-none transition-colors resize-none" />
              </div>
              <div className="flex justify-between pt-4">
                <button onClick={() => setStep(3)} className="text-[0.7rem] tracking-[0.25em] uppercase px-8 py-4 border border-[var(--border)] hover:border-[var(--fg)] transition-colors rounded-md inline-flex items-center gap-2"><ChevronLeft size={14} /> Back</button>
                <button onClick={() => setStep(5)} disabled={!form.guestName || !form.guestEmail} className="text-[0.7rem] tracking-[0.25em] uppercase px-10 py-4 bg-[var(--accent)] text-ivory hover:bg-[var(--accent-hover)] transition-colors rounded-md disabled:opacity-50 inline-flex items-center gap-2">Review <ChevronRight size={14} /></button>
              </div>
            </motion.div>
          )}

          {/* Step 5: Review */}
          {step === 5 && (
            <motion.div key="s5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }} className="space-y-6">
              <div>
                <h2 className="text-[1.5rem] font-light" style={{ fontFamily: 'var(--font-display)' }}>Review your booking</h2>
                <p className="text-[0.85rem] text-[var(--fg-muted)] mt-1">Confirm details before submitting your request.</p>
              </div>
              <div className="space-y-3 p-6 bg-cream dark:bg-[var(--bg-alt)] rounded-lg">
                <Row label="Safari" value={safariTitle} />
                <Row label="Dates" value={`${new Date(form.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} → ${new Date(form.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`} />
                <Row label="Travellers" value={`${form.numberOfAdults} adults${form.numberOfChildren > 0 ? `, ${form.numberOfChildren} children` : ''}`} />
                <Row label="Accommodation" value={pricing.accom.name} />
                {form.extras.length > 0 && <Row label="Extras" value={form.extras.join(', ')} />}
                <Row label="Contact" value={`${form.guestName} · ${form.guestEmail}`} />
              </div>
              <div className="p-4 bg-[var(--accent)]/5 border border-[var(--accent)]/20 rounded-lg text-[0.8rem] text-[var(--fg-muted)]">
                <strong className="text-[var(--fg)]">No payment required now.</strong> We&apos;ll review your request and send a detailed personalised quote within 24 hours.
              </div>
              <div className="flex justify-between pt-4">
                <button onClick={() => setStep(4)} className="text-[0.7rem] tracking-[0.25em] uppercase px-8 py-4 border border-[var(--border)] hover:border-[var(--fg)] transition-colors rounded-md inline-flex items-center gap-2"><ChevronLeft size={14} /> Back</button>
                <button onClick={handleSubmit} disabled={submitting} className="text-[0.7rem] tracking-[0.25em] uppercase px-10 py-4 bg-[var(--accent)] text-ivory hover:bg-[var(--accent-hover)] transition-colors rounded-md disabled:opacity-50">
                  {submitting ? 'Submitting...' : 'Confirm Booking Request'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sidebar: Price Summary */}
      <aside className="lg:col-span-1">
        <div className="lg:sticky lg:top-24 p-6 border border-[var(--border)] rounded-lg bg-[var(--bg)]">
          <h3 className="text-[1.1rem] font-medium mb-1">{safariTitle}</h3>
          <p className="text-[0.75rem] text-[var(--fg-muted)]">{duration}</p>

          <div className="mt-6 pt-6 border-t border-[var(--border)] space-y-3">
            <PriceRow label={`Safari × ${form.numberOfAdults + form.numberOfChildren} guest${form.numberOfAdults + form.numberOfChildren > 1 ? 's' : ''}`} value={pricing.safariTotal} fromCurrency={currency} toCurrency={displayCurrency} />
            {pricing.extrasTotal > 0 && <PriceRow label="Extras" value={pricing.extrasTotal} fromCurrency="USD" toCurrency={displayCurrency} />}
            <PriceRow label="Conservation contribution (5%)" value={pricing.conservation} fromCurrency={currency} toCurrency={displayCurrency} muted />
          </div>

          <div className="mt-6 pt-6 border-t border-[var(--border)]">
            <div className="flex items-baseline justify-between">
              <span className="text-[0.85rem] text-[var(--fg-muted)]">Estimated total</span>
              <motion.span
                key={pricing.total}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                className="text-[1.6rem] font-medium tabular-nums"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {formatPrice(convertPrice(pricing.total, currency, displayCurrency), displayCurrency)}
              </motion.span>
            </div>
            <p className="mt-2 text-[0.7rem] text-[var(--fg-muted)] leading-relaxed">
              Final price confirmed in your personalised quote. Includes all-inclusive safari, accommodation, meals, game drives.
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-[var(--border)] space-y-2 text-[0.75rem] text-[var(--fg-muted)]">
            <div className="flex items-center gap-2"><Check size={12} className="text-[var(--accent)]" /> 24-hour response</div>
            <div className="flex items-center gap-2"><Check size={12} className="text-[var(--accent)]" /> No deposit until confirmed</div>
            <div className="flex items-center gap-2"><Check size={12} className="text-[var(--accent)]" /> Free cancellation 60+ days</div>
          </div>
        </div>
      </aside>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-3 gap-4 text-[0.85rem]">
      <span className="text-[var(--fg-muted)]">{label}</span>
      <span className="col-span-2 text-[var(--fg)]">{value}</span>
    </div>
  )
}

function PriceRow({ label, value, muted, fromCurrency = 'USD', toCurrency = 'USD' }: { label: string; value: number; muted?: boolean; fromCurrency?: string; toCurrency?: string }) {
  const converted = convertPrice(value, fromCurrency, toCurrency)
  return (
    <div className="flex justify-between text-[0.85rem]">
      <span className={muted ? 'text-[var(--fg-muted)]' : 'text-[var(--fg)]'}>{label}</span>
      <span className={`tabular-nums ${muted ? 'text-[var(--fg-muted)]' : 'text-[var(--fg)] font-medium'}`}>{formatPrice(converted, toCurrency)}</span>
    </div>
  )
}
