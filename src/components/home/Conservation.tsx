'use client'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { getImageProps } from '@/lib/media'
import type { Media } from '@/payload-types'

const ease = [0.22, 1, 0.36, 1] as const

type Props = { headline: string; body: string; stat: string; image: Media | string | null | undefined }

export function Conservation({ headline, body, stat, image }: Props) {
  const img = getImageProps(image as Media)
  if (!headline && !body) return null
  return (
    <Link href="/conservation" className="block group">
      <section className="section-pad transition-all duration-300">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="eyebrow">Conservation</span>
            <h2 className="mt-4 text-[clamp(1.8rem,3vw,2.8rem)] font-light leading-[1.2]" style={{ fontFamily: 'var(--font-display)' }}>{headline}</h2>
            <p className="mt-6 text-[0.95rem] font-light leading-relaxed text-[var(--fg-muted)]">{body}</p>
            {stat && (
              <p className="mt-8 text-[1.1rem] font-medium" style={{ color: 'var(--accent)' }}>{stat}</p>
            )}
            <span className="inline-block mt-6 text-[0.7rem] tracking-[0.2em] uppercase text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Learn more →
            </span>
          </motion.div>
          {img.src && (
            <motion.div
              className="relative aspect-[4/3] overflow-hidden rounded-sm"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease }}
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </motion.div>
          )}
        </div>
      </section>
    </Link>
  )
}
