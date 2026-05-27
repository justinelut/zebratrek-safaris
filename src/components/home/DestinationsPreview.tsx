'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { getImageProps } from '@/lib/media'
import type { Destination, Media } from '@/payload-types'

type Props = { destinations: Destination[] }

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } } }

export function DestinationsPreview({ destinations }: Props) {
  if (!destinations?.length) return null
  return (
    <section className="section-pad bg-[var(--bg)]">
      <div className="container-wide">
        <div className="text-center mb-12">
          <span className="eyebrow">Destinations</span>
          <h2 className="mt-4 text-[clamp(1.8rem,3vw,2.8rem)] font-light" style={{ fontFamily: 'var(--font-display)' }}>Where We Go</h2>
        </div>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
          {destinations.map((dest) => {
            const img = getImageProps(dest.heroImage as Media)
            return (
              <motion.div key={dest.id} variants={item}>
                <Link href={`/destinations/${dest.slug}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                    <motion.div className="relative w-full h-full" whileHover={{ scale: 1.05 }} transition={{ duration: 0.7 }}>
                      <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-ivory">
                      <h3 className="text-[1.2rem] font-light" style={{ fontFamily: 'var(--font-display)' }}>{dest.name}</h3>
                      {dest.tagline && <p className="mt-1 text-[0.75rem] text-ivory/70">{dest.tagline}</p>}
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
