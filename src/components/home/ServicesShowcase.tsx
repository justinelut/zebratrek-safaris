'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'

type ServiceItem = { name: string; slug: string; icon?: string | null; shortDescription: string; image?: { url?: string; alt?: string } | string | null }
type Props = { headline: string; subheadline?: string; services: ServiceItem[] }

const ease = [0.22, 1, 0.36, 1] as const

export function ServicesShowcase({ headline, subheadline, services }: Props) {
  if (!services?.length) return null
  return (
    <section className="section-pad bg-cream dark:bg-[var(--bg-alt)]">
      <div className="container-wide">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <span className="eyebrow">Services</span>
          <h2 className="mt-4 text-[clamp(1.8rem,3vw,2.8rem)] font-light" style={{ fontFamily: 'var(--font-display)' }}>
            {headline}
          </h2>
          {subheadline && <p className="mt-4 text-[var(--fg-muted)] leading-relaxed">{subheadline}</p>}
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {services.map((s) => {
            const imgUrl = s.image && typeof s.image === 'object' && s.image.url ? s.image.url : null
            return (
              <motion.div
                key={s.slug}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5, ease }}
              >
                <Link
                  href={`/services/${s.slug}`}
                  className="group block rounded-sm overflow-hidden border border-[var(--border)] hover:border-[var(--accent)] bg-[var(--bg)] transition-all duration-300 h-full"
                >
                  {imgUrl ? (
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={imgUrl}
                        alt={s.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <span className="absolute bottom-3 left-3 text-[0.9rem] font-medium text-ivory" style={{ fontFamily: 'var(--font-display)' }}>{s.name}</span>
                    </div>
                  ) : (
                    <div className="p-5">
                      <h3 className="text-[0.95rem] font-medium mb-2">{s.name}</h3>
                      <p className="text-[0.8rem] text-[var(--fg-muted)] line-clamp-2 leading-relaxed">{s.shortDescription}</p>
                    </div>
                  )}
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        <div className="text-center mt-10">
          <Link href="/services" className="text-[0.7rem] tracking-[0.2em] uppercase text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors">
            View All Services →
          </Link>
        </div>
      </div>
    </section>
  )
}
