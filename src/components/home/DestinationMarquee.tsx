'use client'

import { Marquee } from '@/components/motion/Marquee'

const ITEMS = [
  'Masai Mara',
  'Serengeti',
  'Amboseli',
  'Bwindi',
  'Ngorongoro',
  'Samburu',
  'Volcanoes Rwanda',
  'Tsavo',
  'Lake Nakuru',
  'Zanzibar',
  'Laikipia',
]

export function DestinationMarquee() {
  return (
    <section className="py-12 border-y border-[var(--border)] overflow-hidden">
      <Marquee speed={50}>
        {ITEMS.map((item) => (
          <span key={item} className="inline-flex items-center gap-12 text-[clamp(1.4rem,3vw,2.5rem)] font-light" style={{ fontFamily: 'var(--font-display)', color: 'var(--fg-muted)' }}>
            {item}
            <span className="text-[var(--accent-warm)]">·</span>
          </span>
        ))}
      </Marquee>
    </section>
  )
}
