'use client'
import { motion } from 'motion/react'
import Link from 'next/link'

type Props = { headline: string; steps: { number?: number | null; title?: string | null; description?: string | null }[] }

const ease = [0.22, 1, 0.36, 1] as const

export function Process({ headline, steps }: Props) {
  if (!steps?.length) return null
  return (
    <Link href="/plan-your-safari" className="block group">
      <section className="section-pad transition-all duration-300">
        <div className="container-wide">
          <div className="text-center mb-16">
            <span className="eyebrow">How It Works</span>
            <h2 className="mt-4 text-[clamp(1.8rem,3vw,2.8rem)] font-light" style={{ fontFamily: 'var(--font-display)' }}>{headline}</h2>
          </div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          >
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="text-center"
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.7, ease }}
              >
                <span className="text-[3rem] font-light" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent-warm)' }}>
                  {step.number || i + 1}
                </span>
                <h3 className="mt-3 text-[1rem] font-medium">{step.title}</h3>
                <p className="mt-2 text-[0.85rem] text-[var(--fg-muted)] leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center mt-10">
            <span className="text-[0.7rem] tracking-[0.2em] uppercase text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Plan your safari →
            </span>
          </div>
        </div>
      </section>
    </Link>
  )
}
