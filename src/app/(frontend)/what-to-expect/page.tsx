import Image from 'next/image'
import { getWhatToExpectPage } from '@/lib/queries'
import { getImageProps } from '@/lib/media'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerGrid } from '@/components/motion/StaggerGrid'
import { StaggerItem } from '@/components/motion/StaggerItem'
import type { Media } from '@/payload-types'

export async function generateMetadata() {
  const page = await getWhatToExpectPage()
  return { title: `${page.hero?.headline || 'What to Expect'} — ZebraTrek Safaris` }
}

export default async function WhatToExpectPage() {
  const page = await getWhatToExpectPage()
  const heroImg = getImageProps(page.hero?.image as Media)

  return (
    <>
      <section className="relative h-[50vh] min-h-[400px] flex items-end pb-16 overflow-hidden">
        {heroImg.src && <Image src={heroImg.src} alt={heroImg.alt} fill className="object-cover" priority sizes="100vw" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="container-wide relative z-10 text-ivory">
          <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-light" style={{ fontFamily: 'var(--font-display)' }}>{page.hero?.headline || 'What to Expect'}</h1>
          {page.hero?.subheadline && <p className="mt-3 text-ivory/70 max-w-xl">{page.hero.subheadline}</p>}
        </div>
      </section>

      {page.sections && page.sections.length > 0 && (
        <section className="section-pad">
          <div className="container-wide space-y-20">
            {page.sections.map((s, i) => {
              const img = getImageProps(s.image as Media)
              return (
                <FadeIn key={s.id || i} delay={i % 2 === 0 ? 0 : 0.2}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                      <h2 className="text-[1.4rem] font-light" style={{ fontFamily: 'var(--font-display)' }}>{s.title}</h2>
                      {s.body && <p className="mt-4 text-[0.9rem] text-[var(--fg-muted)] leading-relaxed">{s.body}</p>}
                    </div>
                    {img.src && (
                      <div className={`relative aspect-[4/3] overflow-hidden rounded-sm ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                        <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                      </div>
                    )}
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </section>
      )}

      {page.dayOnSafari && page.dayOnSafari.length > 0 && (
        <section className="section-pad bg-cream dark:bg-[var(--bg-alt)]">
          <div className="container-narrow">
            <span className="eyebrow">A Day on Safari</span>
            <StaggerGrid className="mt-10 space-y-8 border-l-2 border-[var(--accent-warm)] pl-8">
              {page.dayOnSafari.map((entry, i) => (
                <StaggerItem key={entry.id || i}>
                  <span className="text-[0.7rem] tracking-[0.2em] uppercase text-[var(--accent-warm)]">{entry.time}</span>
                  <h3 className="mt-1 text-[1rem] font-medium">{entry.activity}</h3>
                  {entry.description && <p className="mt-1 text-[0.85rem] text-[var(--fg-muted)] leading-relaxed">{entry.description}</p>}
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </section>
      )}

      {page.packingList && page.packingList.length > 0 && (
        <section className="section-pad">
          <div className="container-wide">
            <span className="eyebrow">Packing List</span>
            <StaggerGrid className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {page.packingList.map((cat, i) => (
                <StaggerItem key={cat.id || i}>
                  <h3 className="text-[1rem] font-medium mb-3">{cat.category}</h3>
                  {cat.items && (
                    <ul className="space-y-1">
                      {cat.items.map((item, j) => (
                        <li key={item.id || j} className="text-[0.85rem] text-[var(--fg-muted)] flex items-start gap-2">
                          <span className="text-[var(--accent-warm)] mt-0.5">•</span>
                          {item.item}
                        </li>
                      ))}
                    </ul>
                  )}
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </section>
      )}
    </>
  )
}
