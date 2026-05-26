'use client'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { getImageProps } from '@/lib/media'
import type { Media } from '@/payload-types'

type Animal = {
  name?: string | null
  scientificName?: string | null
  description?: string | null
  images?: { image?: Media | string | number | null }[] | null
  linkType?: 'none' | 'safaris' | 'destinations' | 'custom' | null
  customUrl?: string | null
  // legacy single-image support (pre-migration data)
  image?: Media | string | number | null
}

type Props = {
  headline: string
  intro?: string
  animals: Animal[]
}

const ease = [0.22, 1, 0.36, 1] as const

function buildHref(a: Animal): string | null {
  const slug = (a.name || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  switch (a.linkType) {
    case 'none':
      return null
    case 'custom':
      return a.customUrl || null
    case 'destinations':
      return slug ? `/destinations?wildlife=${slug}` : '/destinations'
    case 'safaris':
    default:
      return slug ? `/safaris?wildlife=${slug}` : '/safaris'
  }
}

function pickPrimaryImage(a: Animal): Media | string | number | null {
  if (a.images && a.images.length > 0 && a.images[0]?.image) return a.images[0].image
  if (a.image) return a.image
  return null
}

export function WildlifeGrid({ headline, intro, animals }: Props) {
  if (!animals?.length) return null
  return (
    <section className="section-pad">
      <div className="container-wide">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <span className="eyebrow">Wildlife</span>
          <h2 className="mt-4 text-[clamp(1.8rem,3vw,2.8rem)] font-light" style={{ fontFamily: 'var(--font-display)' }}>
            {headline}
          </h2>
          {intro && (
            <p className="mt-5 text-[1rem] text-[var(--fg-muted)] leading-[1.7] font-light">{intro}</p>
          )}
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
        >
          {animals.map((animal, i) => (
            <AnimalCard key={i} animal={animal} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function AnimalCard({ animal, index }: { animal: Animal; index: number }) {
  const [hovered, setHovered] = useState(false)
  const [imgIdx, setImgIdx] = useState(0)
  const primary = pickPrimaryImage(animal)
  if (!primary) return null

  const allImages = (animal.images || [])
    .map((i) => i.image)
    .filter(Boolean) as (Media | string | number)[]
  const cycleImages = allImages.length > 1 ? allImages : [primary]
  const current = cycleImages[imgIdx % cycleImages.length] || primary
  const img = getImageProps(current as Media)
  const href = buildHref(animal)
  const hasMulti = cycleImages.length > 1

  const cardInner = (
    <motion.article
      className="relative aspect-[4/5] overflow-hidden rounded-sm group bg-[var(--bg-alt)]"
      variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.6, ease }}
      onHoverStart={() => {
        setHovered(true)
        if (hasMulti) {
          // start cycling on hover
          const id = setInterval(() => setImgIdx((n) => n + 1), 1100)
          ;(cardInner as any)._intervalId = id
        }
      }}
      onHoverEnd={() => {
        setHovered(false)
        const id = (cardInner as any)._intervalId
        if (id) clearInterval(id)
        setImgIdx(0)
      }}
    >
      {img.src && (
        <motion.div
          className="absolute inset-0"
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.7, ease }}
        >
          <Image
            src={img.src}
            alt={animal.name || ''}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </motion.div>
      )}

      {/* Bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

      {/* Image dots if multiple */}
      {hasMulti && (
        <div className="absolute top-3 right-3 flex gap-1 z-10">
          {cycleImages.map((_, i) => (
            <span
              key={i}
              className="block h-1 w-1.5 rounded-full transition-colors duration-300"
              style={{ background: i === imgIdx % cycleImages.length ? '#eff3cf' : 'rgba(239,243,207,0.4)' }}
            />
          ))}
        </div>
      )}

      {/* Text content */}
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        <h3
          className="text-[1.05rem] md:text-[1.15rem] font-light text-[#eff3cf] leading-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {animal.name}
        </h3>
        {animal.scientificName && (
          <p className="mt-0.5 text-[0.7rem] italic text-[#eff3cf]/60">{animal.scientificName}</p>
        )}

        <motion.div
          initial={false}
          animate={{ height: hovered ? 'auto' : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35, ease }}
          className="overflow-hidden"
        >
          {animal.description && (
            <p className="mt-2.5 text-[0.8rem] leading-[1.55] text-[#eff3cf]/85 font-light">
              {animal.description}
            </p>
          )}
          {href && (
            <p className="mt-3 text-[0.65rem] tracking-[0.22em] uppercase text-[#D4A843] flex items-center gap-1.5">
              {animal.linkType === 'destinations' ? 'Where to see' : 'View safaris'} →
            </p>
          )}
        </motion.div>
      </div>
    </motion.article>
  )

  if (!href) return cardInner
  return (
    <Link href={href} className="block focus:outline-none focus:ring-2 focus:ring-[var(--accent)] rounded-sm">
      {cardInner}
    </Link>
  )
}
