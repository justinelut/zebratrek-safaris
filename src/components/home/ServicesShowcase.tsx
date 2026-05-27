'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'

type ServiceItem = { name: string; slug: string; icon?: string | null; shortDescription: string; image?: { url?: string; alt?: string } | string | null }
type Props = { headline: string; subheadline?: string; services: ServiceItem[] }

const ease = [0.22, 1, 0.36, 1] as const

export function ServicesShowcase({ headline, subheadline, services }: Props) {
  if (!services?.length) return null
  const total = services.length.toString().padStart(2, '0')

  return (
    <section className="py-28 md:py-36 bg-[var(--bg)]">
      <div className="container-wide">
        {/* Asymmetric header: left heading, right subtitle */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 lg:mb-20">
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="text-[0.65rem] tracking-[0.3em] uppercase text-[var(--accent)] block mb-4">
              {total} Services
            </span>
            <h2
              className="text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.05] text-[var(--fg)]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {headline}
            </h2>
          </motion.div>
          {subheadline && (
            <motion.div
              className="lg:col-span-5 lg:col-start-8 flex items-end"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease }}
            >
              <p className="text-[var(--fg-muted)] text-[0.95rem] leading-relaxed max-w-md">{subheadline}</p>
            </motion.div>
          )}
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="relative">
          <motion.div
            className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 lg:grid-cols-4 md:overflow-visible md:pb-0 md:gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          >
            {services.map((s, i) => {
              const imgUrl = s.image && typeof s.image === 'object' && s.image.url ? s.image.url : null
              const num = (i + 1).toString().padStart(2, '0')
              return (
                <motion.div
                  key={s.slug}
                  className="snap-start shrink-0 w-[75vw] md:w-auto"
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.6, ease }}
                >
                  <Link
                    href={`/services/${s.slug}`}
                    className="group relative block h-[340px] md:h-[380px] overflow-hidden rounded-sm bg-[var(--bg-alt)] border border-[var(--border)] hover:border-[var(--accent)]/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(184,134,11,0.12)]"
                  >
                    {/* Background image */}
                    {imgUrl && (
                      <Image
                        src={imgUrl}
                        alt={s.name}
                        fill
                        className="object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
                        sizes="(max-width: 768px) 75vw, 25vw"
                      />
                    )}
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

                    {/* Counter top-right */}
                    <span className="absolute top-4 right-4 text-[0.6rem] tracking-[0.15em] text-[var(--fg-muted)]/60 font-medium z-10">
                      {num} / {total}
                    </span>

                    {/* Content at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                      <span className="block text-[0.65rem] tracking-[0.2em] text-[var(--accent)] mb-2 font-medium">{num}</span>
                      <h3
                        className="text-[1.2rem] md:text-[1.35rem] text-[var(--fg)] leading-tight mb-2"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {s.name}
                      </h3>
                      {/* Gold underline that animates in on hover */}
                      <div className="h-[1px] w-0 group-hover:w-12 bg-[var(--accent)] transition-all duration-500 mb-3" />
                      <p className="text-[0.78rem] text-[var(--fg-muted)] leading-relaxed line-clamp-2 opacity-80">
                        {s.shortDescription}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Mobile scroll indicator */}
          <div className="flex md:hidden justify-center mt-4 gap-1">
            {services.slice(0, 5).map((_, i) => (
              <div key={i} className="w-6 h-[2px] bg-[var(--border)] rounded-full" />
            ))}
          </div>
        </div>

        {/* View all link */}
        <motion.div
          className="mt-14 flex justify-end"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link
            href="/services"
            className="text-[0.65rem] tracking-[0.25em] uppercase text-[var(--fg-muted)] hover:text-[var(--accent-warm)] transition-colors duration-300 border-b border-[var(--border)] hover:border-[var(--accent)] pb-1"
          >
            All Services →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
