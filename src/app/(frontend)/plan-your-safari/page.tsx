import Image from 'next/image'
import Link from 'next/link'
import { getPlanYourSafariPage } from '@/lib/queries'
import { getImageProps } from '@/lib/media'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerGrid } from '@/components/motion/StaggerGrid'
import { StaggerItem } from '@/components/motion/StaggerItem'
import type { Media } from '@/payload-types'

export async function generateMetadata() {
  const page = await getPlanYourSafariPage()
  return { title: `${page.hero?.headline || 'Plan Your Safari'} — ZebraTrek Safaris` }
}

export default async function PlanYourSafariPage() {
  const page = await getPlanYourSafariPage()
  const heroImg = getImageProps(page.hero?.image as Media)

  return (
    <>
      <section className="relative h-[50vh] min-h-[400px] flex items-end pb-16 overflow-hidden">
        {heroImg.src && <Image src={heroImg.src} alt={heroImg.alt} fill className="object-cover" priority sizes="100vw" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <FadeIn className="container-wide relative z-10 text-ivory">
          <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-light" style={{ fontFamily: 'var(--font-display)' }}>{page.hero?.headline || 'Plan Your Safari'}</h1>
          {page.hero?.subheadline && <p className="mt-3 text-ivory/70 max-w-xl">{page.hero.subheadline}</p>}
        </FadeIn>
      </section>

      {page.steps && page.steps.length > 0 && (
        <section className="section-pad">
          <div className="container-wide">
            <span className="eyebrow">How It Works</span>
            <StaggerGrid className="mt-10 space-y-16">
              {page.steps.map((step, i) => {
                const img = getImageProps(step.image as Media)
                return (
                  <StaggerItem key={step.id || i}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                        <span className="text-[3rem] font-light text-[var(--accent-warm)] opacity-60" style={{ fontFamily: 'var(--font-display)' }}>{String(step.number || i + 1).padStart(2, '0')}</span>
                        <h3 className="mt-2 text-[1.4rem] font-light" style={{ fontFamily: 'var(--font-display)' }}>{step.title}</h3>
                        {step.description && <p className="mt-3 text-[0.9rem] text-[var(--fg-muted)] leading-relaxed">{step.description}</p>}
                      </div>
                      {img.src && (
                        <div className={`relative aspect-[4/3] overflow-hidden rounded-sm ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                          <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                        </div>
                      )}
                    </div>
                  </StaggerItem>
                )
              })}
            </StaggerGrid>
          </div>
        </section>
      )}

      {page.travelStyles && page.travelStyles.length > 0 && (
        <section className="section-pad bg-cream dark:bg-[var(--bg-alt)]">
          <div className="container-wide">
            <span className="eyebrow">Travel Styles</span>
            <StaggerGrid className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {page.travelStyles.map((style, i) => {
                const img = getImageProps(style.image as Media)
                return (
                  <StaggerItem key={style.id || i} className="group overflow-hidden rounded-sm">
                    {img.src && (
                      <div className="relative aspect-[3/2] overflow-hidden">
                        <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-[1.1rem] font-medium">{style.name}</h3>
                      {style.description && <p className="mt-2 text-[0.85rem] text-[var(--fg-muted)] leading-relaxed">{style.description}</p>}
                      {style.priceRange && <p className="mt-3 text-[0.75rem] tracking-[0.15em] uppercase text-[var(--accent-warm)]">{style.priceRange}</p>}
                    </div>
                  </StaggerItem>
                )
              })}
            </StaggerGrid>
          </div>
        </section>
      )}

      {page.cta?.headline && (
        <FadeIn>
          <section className="section-pad">
            <div className="container-narrow text-center">
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-light" style={{ fontFamily: 'var(--font-display)' }}>{page.cta.headline}</h2>
              {page.cta.ctaLink && (
                <Link href={page.cta.ctaLink} className="inline-block mt-8 text-[0.7rem] tracking-[0.25em] uppercase border border-[var(--fg)] px-10 py-4 hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-all duration-500">
                  {page.cta.ctaText || 'Start Planning'}
                </Link>
              )}
            </div>
          </section>
        </FadeIn>
      )}
    </>
  )
}
