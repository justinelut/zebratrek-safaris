import Image from 'next/image'
import { getConservationPage } from '@/lib/queries'
import { getImageProps } from '@/lib/media'
import { RichText } from '@/components/RichText'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerGrid } from '@/components/motion/StaggerGrid'
import { StaggerItem } from '@/components/motion/StaggerItem'
import type { Media } from '@/payload-types'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getConservationPage()
  return { title: `${page.headline} — ZebraTrek Safaris` }
}

export default async function ConservationPage() {
  const page = await getConservationPage()
  const heroImage = page.image as Media | undefined
  const heroImg = heroImage ? getImageProps(heroImage) : null

  return (
    <>
      <section className="relative h-[50vh] min-h-[400px] flex items-end pb-16 overflow-hidden">
        {heroImg?.src && <Image src={heroImg.src} alt={heroImg.alt} fill className="object-cover" priority sizes="100vw" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <FadeIn className="container-wide relative z-10 text-ivory">
          <span className="eyebrow">Conservation</span>
          <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-light mt-2" style={{ fontFamily: 'var(--font-display)' }}>
            {page.headline}
          </h1>
          {page.subheadline && <p className="mt-3 text-ivory/70 max-w-xl">{page.subheadline}</p>}
        </FadeIn>
      </section>

      {page.body && (
        <section className="section-pad">
          <FadeIn className="container-narrow">
            {page.missionHeadline && (
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-light mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                {page.missionHeadline}
              </h2>
            )}
            <div className="prose prose-neutral max-w-none">
              <RichText content={page.body} />
            </div>
          </FadeIn>
        </section>
      )}

      {page.stats && page.stats.length > 0 && (
        <section className="section-pad bg-cream dark:bg-[var(--bg-alt)]">
          <div className="container-wide">
            <span className="eyebrow text-center block">Impact</span>
            <StaggerGrid className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-6 text-center">
              {page.stats.map((stat: any) => (
                <StaggerItem key={stat.id ?? stat.label}>
                  <span className="block text-4xl md:text-5xl tabular-nums" style={{ fontFamily: 'var(--font-display)' }}>{stat.value}</span>
                  <p className="text-sm text-[var(--fg-muted)] mt-1">{stat.label}</p>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </section>
      )}

      {page.partnerships && page.partnerships.length > 0 && (
        <section className="section-pad">
          <div className="container-wide">
            <span className="eyebrow text-center block">Partnerships</span>
            <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
              {page.partnerships.map((p: any) => {
                const logo = typeof p.logo === 'object' ? (p.logo as Media) : undefined
                return (
                  <StaggerItem key={p.id ?? p.name} className="flex items-start gap-4">
                    {logo && (
                      <div className="relative w-16 h-16 shrink-0">
                        <Image {...getImageProps(logo)} alt={p.name} fill className="object-contain" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg" style={{ fontFamily: 'var(--font-display)' }}>{p.name}</h3>
                      {p.description && <p className="text-sm text-[var(--fg-muted)] mt-1">{p.description}</p>}
                    </div>
                  </StaggerItem>
                )
              })}
            </StaggerGrid>
          </div>
        </section>
      )}

      {page.ctaHeadline && (
        <FadeIn>
          <section className="section-pad text-center bg-cream dark:bg-[var(--bg-alt)]">
            <div className="container-narrow">
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-light" style={{ fontFamily: 'var(--font-display)' }}>{page.ctaHeadline}</h2>
              {page.ctaBody && <p className="mt-4 text-[var(--fg-muted)]">{page.ctaBody}</p>}
              {page.ctaLink && (
                <a href={page.ctaLink} className="inline-block mt-8 text-[0.7rem] tracking-[0.25em] uppercase px-10 py-4 bg-[var(--accent)] text-ivory hover:bg-[var(--accent-hover)] transition-colors rounded-sm">
                  {page.ctaText || 'Plan Your Safari'}
                </a>
              )}
            </div>
          </section>
        </FadeIn>
      )}
    </>
  )
}
