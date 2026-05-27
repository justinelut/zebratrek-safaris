'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { Plane, Bus, Car, Palmtree, Globe, Map, Compass } from 'lucide-react'

const iconMap: Record<string, any> = { Plane, Bus, Car, Palmtree, Globe, Map, Compass }

type ServiceItem = { name: string; slug: string; icon?: string | null; shortDescription: string }
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
            const Icon = iconMap[s.icon || ''] || Compass
            return (
              <motion.div
                key={s.slug}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5, ease }}
              >
                <Link
                  href={`/services/${s.slug}`}
                  className="group block p-6 rounded-sm border border-[var(--border)] hover:border-[var(--accent)] bg-[var(--bg)] transition-all duration-300 h-full"
                >
                  <span className="w-10 h-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--accent)]/20 transition-colors">
                    <Icon className="w-5 h-5 text-[var(--accent)]" />
                  </span>
                  <h3 className="text-[0.95rem] font-medium mb-2">{s.name}</h3>
                  <p className="text-[0.8rem] text-[var(--fg-muted)] line-clamp-2 leading-relaxed">{s.shortDescription}</p>
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
