'use client'
import { motion } from 'motion/react'
import Image from 'next/image'
import { getImageProps } from '@/lib/media'
import type { Media } from '@/payload-types'

type Props = { headline: string; animals: { name?: string | null; image?: Media | string | null }[] }

const ease = [0.22, 1, 0.36, 1] as const

export function WildlifeGrid({ headline, animals }: Props) {
  if (!animals?.length) return null
  return (
    <section className="section-pad">
      <div className="container-wide">
        <div className="text-center mb-12">
          <span className="eyebrow">Wildlife</span>
          <h2 className="mt-4 text-[clamp(1.8rem,3vw,2.8rem)] font-light" style={{ fontFamily: 'var(--font-display)' }}>{headline}</h2>
        </div>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
        >
          {animals.map((animal, i) => {
            const img = getImageProps(animal.image as Media)
            return (
              <motion.div
                key={i}
                className="relative aspect-square overflow-hidden rounded-sm group"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6, ease }}
              >
                {img.src && (
                  <motion.div className="relative w-full h-full" whileHover={{ scale: 1.05 }} transition={{ duration: 0.4, ease }}>
                    <Image src={img.src} alt={animal.name || ''} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
                  </motion.div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <p className="absolute bottom-4 left-4 text-ivory text-[0.8rem] tracking-[0.1em]">{animal.name}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
