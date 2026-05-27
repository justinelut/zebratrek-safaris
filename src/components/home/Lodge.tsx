'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { getImageProps } from '@/lib/media'
import type { Media } from '@/payload-types'

const ease = [0.22, 1, 0.36, 1] as const

type Props = { headline: string; body: string; image: Media | string | null | undefined }

export function Lodge({ headline, body, image }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], [-30, 30])
  const img = getImageProps(image as Media)
  if (!headline && !body) return null

  return (
    <Link href="/safaris" className="block group">
      <section ref={ref} className="section-pad bg-[var(--bg)] transition-all duration-300">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {img.src && (
            <div className="relative overflow-hidden order-2 lg:order-1">
              <motion.div
                initial={{ scaleY: 1 }}
                whileInView={{ scaleY: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
                style={{ transformOrigin: 'top' }}
                className="absolute inset-0 z-10 bg-[var(--accent-warm)]"
              />
              <motion.div
                className="relative aspect-[4/3] overflow-hidden rounded-sm"
                style={{ y: imageY }}
              >
                <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </motion.div>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease, delay: 0.15 }}
            className="order-1 lg:order-2"
          >
            <span className="eyebrow">Accommodation</span>
            <h2 className="mt-4 text-[clamp(1.8rem,3vw,2.8rem)] font-light leading-[1.2]" style={{ fontFamily: 'var(--font-display)' }}>{headline}</h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 60 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5, ease }}
              className="h-px mt-6"
              style={{ background: 'var(--accent-warm)' }}
            />
            <p className="mt-6 text-[0.95rem] font-light leading-relaxed text-[var(--fg-muted)]">{body}</p>
            <span className="inline-block mt-6 text-[0.7rem] tracking-[0.2em] uppercase text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Browse safaris →
            </span>
          </motion.div>
        </div>
      </section>
    </Link>
  )
}
