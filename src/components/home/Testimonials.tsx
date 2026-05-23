'use client'
import { motion } from 'motion/react'
import type { Testimonial } from '@/payload-types'

type Props = { testimonials: Testimonial[] }

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }
const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } } }

export function Testimonials({ testimonials }: Props) {
  if (!testimonials?.length) return null
  return (
    <section className="section-pad bg-cream dark:bg-[var(--bg-alt)]">
      <div className="container-wide">
        <div className="text-center mb-12">
          <span className="eyebrow">Guest Stories</span>
          <h2 className="mt-4 text-[clamp(1.8rem,3vw,2.8rem)] font-light" style={{ fontFamily: 'var(--font-display)' }}>What They Say</h2>
        </div>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto" variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
          {testimonials.map((t) => (
            <motion.blockquote key={t.id} className="border-l-2 border-[var(--accent-warm)] pl-6" variants={item} whileHover={{ scale: 1.02 }}>
              <p className="text-[0.95rem] font-light italic leading-relaxed text-[var(--fg)]">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-4">
                <p className="text-[0.8rem] font-medium">{t.guestName}</p>
                <p className="text-[0.7rem] text-[var(--fg-muted)]">{t.guestCountry}{t.tripType ? ` · ${t.tripType}` : ''}</p>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
