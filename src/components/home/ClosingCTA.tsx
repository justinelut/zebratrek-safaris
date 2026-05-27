'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import { MagneticButton } from '@/components/motion/MagneticButton'

type Props = { headline: string; body: string; ctaText: string; ctaLink: string; brandPattern?: string | null }

const ease = [0.22, 1, 0.36, 1] as const

const fadeUp = (delay: number) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease, delay } },
})

export function ClosingCTA({ headline, body, ctaText, ctaLink, brandPattern }: Props) {
  if (!headline) return null
  return (
    <section className="section-pad-lg relative overflow-hidden">
      {/* Subtle radial gradient backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 60%, color-mix(in srgb, var(--accent-warm) 8%, transparent), transparent 60%)' }}
      />
      {/* Brand pattern — large faint centerpiece */}
      {brandPattern && (
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
          style={{ opacity: 0.05 }}
        >
          <Image src={brandPattern} alt="" width={900} height={900} className="w-[90vw] max-w-[900px] h-auto" />
        </div>
      )}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="container-narrow text-center relative z-10"
      >
        {brandPattern && (
          <motion.div variants={fadeUp(0)} className="flex justify-center mb-8">
            <Image
              src={brandPattern}
              alt=""
              width={64}
              height={64}
              className="h-12 w-auto opacity-50"
              style={{ filter: 'sepia(0.4) saturate(1.4) hue-rotate(-5deg)' }}
            />
          </motion.div>
        )}
        <motion.h2 variants={fadeUp(0.1)} className="text-[clamp(2rem,4.5vw,3.5rem)] font-light leading-[1.1]" style={{ fontFamily: 'var(--font-display)' }}>
          {headline}
        </motion.h2>
        {body && (
          <motion.p variants={fadeUp(0.2)} className="mt-6 text-[1rem] text-[var(--fg-muted)] leading-relaxed max-w-lg mx-auto">
            {body}
          </motion.p>
        )}
        <motion.div variants={fadeUp(0.4)} className="mt-12">
          <MagneticButton
            href={ctaLink}
            className="inline-block text-[0.7rem] tracking-[0.25em] uppercase px-12 py-5 bg-[var(--fg)] text-[var(--bg)] hover:bg-[var(--accent)] hover:text-ivory transition-colors duration-500 rounded-sm"
          >
            {ctaText}
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  )
}
