'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import { useRef } from 'react'
import { getImageProps } from '@/lib/media'
import { SplitText } from '@/components/motion/SplitText'
import { MagneticButton } from '@/components/motion/MagneticButton'
import type { Media } from '@/payload-types'

type Props = {
  headline: string
  subheadline: string
  backgroundImage: Media | string | null | undefined
  ctaText: string
  ctaLink: string
}

const ease = [0.22, 1, 0.36, 1] as const

export function Hero({ headline, subheadline, backgroundImage, ctaText, ctaLink }: Props) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const img = getImageProps(backgroundImage as Media)

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] flex items-end pb-24 overflow-hidden">
      {img.src && (
        <motion.div className="absolute inset-0" style={{ y, scale }}>
          <Image src={img.src} alt={img.alt} fill className="object-cover" priority sizes="100vw" />
        </motion.div>
      )}
      {/* Dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      {/* Subtle vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)' }} />

      <motion.div className="container-wide relative z-10 text-ivory" style={{ opacity }}>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="text-[0.7rem] tracking-[0.3em] uppercase text-ivory/60 block"
        >
          Luxury East African Safaris
        </motion.span>

        <SplitText
          text={headline}
          as="h1"
          delay={0.4}
          stagger={0.06}
          className="mt-4 text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.05] max-w-4xl"
        />

        {subheadline && (
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease }}
            className="mt-6 text-[1.05rem] font-light text-ivory/70 max-w-xl leading-relaxed"
          >
            {subheadline}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5, ease }}
          className="mt-10"
        >
          <MagneticButton
            href={ctaLink}
            className="inline-block text-[0.7rem] tracking-[0.25em] uppercase border border-ivory/40 px-10 py-4 hover:bg-ivory hover:text-charcoal transition-colors duration-500"
          >
            {ctaText}
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-ivory/50"
      >
        <span className="text-[0.6rem] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-ivory/30"
        />
      </motion.div>
    </section>
  )
}
