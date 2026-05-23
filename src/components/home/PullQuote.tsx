'use client'
import { motion } from 'motion/react'

type Props = { quote: string; attribution: string }

const ease = [0.22, 1, 0.36, 1] as const

export function PullQuote({ quote, attribution }: Props) {
  if (!quote) return null
  return (
    <section className="section-pad bg-cream dark:bg-[var(--bg-alt)]">
      <div className="container-narrow text-center">
        <motion.blockquote
          className="text-[clamp(1.2rem,2.2vw,1.6rem)] font-light italic leading-[1.7]"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--fg)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease }}
        >
          &ldquo;{quote}&rdquo;
        </motion.blockquote>
        {attribution && (
          <motion.cite
            className="block mt-6 text-[0.75rem] tracking-[0.15em] uppercase not-italic text-[var(--fg-muted)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
          >
            — {attribution}
          </motion.cite>
        )}
      </div>
    </section>
  )
}
