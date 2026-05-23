'use client'
import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'motion/react'
import { getImageProps } from '@/lib/media'
import type { Media } from '@/payload-types'

type Props = { image: Media | string | null | undefined; alt: string; height?: string }

export function ImageBreak({ image, alt, height = 'h-[60vh] min-h-[400px]' }: Props) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 50])
  const img = getImageProps(image as Media)
  if (!img.src) return null
  return (
    <section ref={ref} className={`relative ${height} overflow-hidden`}>
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image src={img.src} alt={alt || img.alt} fill className="object-cover" sizes="100vw" />
      </motion.div>
    </section>
  )
}
