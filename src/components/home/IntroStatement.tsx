'use client'

import { motion } from 'motion/react'

type Props = { text: string }

export function IntroStatement({ text }: Props) {
  if (!text) return null
  return (
    <section className="section-pad">
      <div className="container-narrow text-center">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-[clamp(1.3rem,2.5vw,1.8rem)] font-light leading-[1.6]"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--fg)' }}
        >
          {text}
        </motion.p>
      </div>
    </section>
  )
}
