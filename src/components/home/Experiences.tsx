'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { getImageProps } from '@/lib/media'
import { TiltCard } from '@/components/motion/TiltCard'
import { Price } from '@/components/Price'
import type { SafariPackage, Media } from '@/payload-types'

const ease = [0.22, 1, 0.36, 1] as const

type Props = { headline: string; subheadline: string; safaris: SafariPackage[] }

export function Experiences({ headline, subheadline, safaris }: Props) {
  return (
    <section className="section-pad">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-16"
        >
          <span className="eyebrow">Experiences</span>
          <h2 className="mt-4 text-[clamp(1.8rem,3vw,2.8rem)] font-light" style={{ fontFamily: 'var(--font-display)' }}>
            {headline}
          </h2>
          {subheadline && <p className="mt-3 text-[var(--fg-muted)] text-[0.95rem]">{subheadline}</p>}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {safaris.map((safari) => {
            const img = getImageProps(safari.heroImage as Media)
            return (
              <motion.div
                key={safari.id}
                variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
              >
                <TiltCard intensity={6}>
                  <Link href={`/safaris/${safari.slug}`} className="group block" style={{ transformStyle: 'preserve-3d' }}>
                    <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                      <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 33vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-ivory pointer-events-none" style={{ transform: 'translateZ(40px)' }}>
                        <p className="text-[0.65rem] tracking-[0.2em] uppercase text-ivory/60">{safari.category}</p>
                        <h3 className="mt-1 text-[1.3rem] font-light leading-tight" style={{ fontFamily: 'var(--font-display)' }}>{safari.title}</h3>
                        <p className="mt-1 text-[0.8rem] text-ivory/70">{safari.duration} · <Price amount={safari.priceFrom} baseCurrency={safari.currency} showFrom /></p>
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
