import Image from 'next/image'
import { getWhenToVisitPage } from '@/lib/queries'
import { getImageProps } from '@/lib/media'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerGrid } from '@/components/motion/StaggerGrid'
import { StaggerItem } from '@/components/motion/StaggerItem'
import type { Media } from '@/payload-types'

export async function generateMetadata() {
  const page = await getWhenToVisitPage()
  return { title: `${page.hero?.headline || 'When to Visit'} — ZebraTrek Safaris` }
}

export default async function WhenToVisitPage() {
  const page = await getWhenToVisitPage()
  const heroImg = getImageProps(page.hero?.image as Media)

  return (
    <>
      <section className="relative h-[50vh] min-h-[400px] flex items-end pb-16 overflow-hidden">
        {heroImg.src && <Image src={heroImg.src} alt={heroImg.alt} fill className="object-cover" priority sizes="100vw" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="container-wide relative z-10 text-ivory">
          <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-light" style={{ fontFamily: 'var(--font-display)' }}>{page.hero?.headline || 'When to Visit'}</h1>
          {page.hero?.subheadline && <p className="mt-3 text-ivory/70 max-w-xl">{page.hero.subheadline}</p>}
        </div>
      </section>

      {page.intro && (
        <section className="section-pad">
          <div className="container-narrow">
            <FadeIn>
              <p className="text-[1.1rem] leading-relaxed text-[var(--fg-muted)]">{page.intro}</p>
            </FadeIn>
          </div>
        </section>
      )}

      {page.months && page.months.length > 0 && (
        <section className="section-pad bg-cream dark:bg-[var(--bg-alt)]">
          <div className="container-wide">
            <span className="eyebrow">Month by Month</span>
            <StaggerGrid className="mt-10 space-y-0">
              {page.months.map((m, i) => (
                <StaggerItem key={m.id || i} className="grid grid-cols-5 border-b border-[var(--fg)]/5 text-[0.85rem]">
                  <span className="py-3 pr-4 font-medium">{m.month}</span>
                  <span className="py-3 pr-4 text-[var(--fg-muted)]">{m.weather}</span>
                  <span className="py-3 pr-4 text-[var(--fg-muted)]">{m.wildlife}</span>
                  <span className="py-3 pr-4 text-[var(--fg-muted)]">{m.crowds}</span>
                  <span className="py-3">
                    {m.rating && (
                      <span className="text-[var(--accent-warm)]">
                        {'●'.repeat(m.rating)}{'○'.repeat(5 - m.rating)}
                      </span>
                    )}
                  </span>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </section>
      )}

      {page.seasons && page.seasons.length > 0 && (
        <section className="section-pad">
          <div className="container-wide">
            <span className="eyebrow">Seasons</span>
            <StaggerGrid className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
              {page.seasons.map((season, i) => {
                const img = getImageProps(season.image as Media)
                return (
                  <StaggerItem key={season.id || i} className="overflow-hidden rounded-sm">
                    {img.src && (
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-[1.2rem] font-light" style={{ fontFamily: 'var(--font-display)' }}>{season.name}</h3>
                      {season.months && <p className="mt-1 text-[0.75rem] tracking-[0.15em] uppercase text-[var(--accent-warm)]">{season.months}</p>}
                      {season.description && <p className="mt-3 text-[0.85rem] text-[var(--fg-muted)] leading-relaxed">{season.description}</p>}
                      {season.highlights && <p className="mt-3 text-[0.85rem] leading-relaxed">{season.highlights}</p>}
                    </div>
                  </StaggerItem>
                )
              })}
            </StaggerGrid>
          </div>
        </section>
      )}
    </>
  )
}
