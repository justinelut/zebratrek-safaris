import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDestinationBySlug } from '@/lib/queries'
import { getImageProps } from '@/lib/media'
import { generatePageMetadata } from '@/lib/seo'
import { RichText } from '@/components/RichText'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerGrid } from '@/components/motion/StaggerGrid'
import { StaggerItem } from '@/components/motion/StaggerItem'
import type { Media, SafariPackage } from '@/payload-types'

type Params = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params) {
  const { slug } = await params
  const destination = await getDestinationBySlug(slug)
  if (!destination) return {}
  return generatePageMetadata(destination as any, {
    title: `${destination.name} — ZebraTrek Safaris`,
    description: destination.tagline || '',
  })
}

export default async function DestinationDetailPage({ params }: Params) {
  const { slug } = await params
  const destination = await getDestinationBySlug(slug)
  if (!destination) notFound()

  const heroImg = getImageProps(destination.heroImage as Media)
  const relatedPackages = (destination.relatedPackages || []).filter(
    (p): p is SafariPackage => typeof p !== 'string' && typeof p !== 'number',
  )

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: destination.name,
    description: destination.tagline,
    ...(destination.country && {
      containedInPlace: { '@type': 'Country', name: destination.country },
    }),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative h-[60vh] min-h-[500px] flex items-end pb-16 overflow-hidden">
        <Image src={heroImg.src} alt={heroImg.alt} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="container-wide relative z-10 text-ivory">
          {destination.country && <p className="eyebrow text-ivory/60">{destination.country}</p>}
          <h1
            className="mt-3 text-[clamp(2rem,4vw,3.5rem)] font-light"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {destination.name}
          </h1>
          {destination.tagline && (
            <p className="mt-3 text-[1.05rem] text-ivory/70 max-w-xl">{destination.tagline}</p>
          )}
        </div>
      </section>

      <section className="section-pad">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-3 gap-16">
          <FadeIn className="lg:col-span-2">
            {destination.body ? (
              <RichText content={destination.body as any} />
            ) : destination.summary ? (
              <div>
                <span className="eyebrow">Overview</span>
                <p className="mt-4 text-[1.05rem] font-light leading-[1.7] text-[var(--fg)]" style={{ fontFamily: 'var(--font-display)' }}>
                  {destination.summary}
                </p>
              </div>
            ) : null}
          </FadeIn>

          <FadeIn delay={0.2} className="space-y-8">
            {destination.bestTimeToVisit && (
              <div className="p-6 bg-cream dark:bg-[var(--bg-alt)] rounded-sm">
                <h3 className="text-[0.7rem] tracking-[0.2em] uppercase mb-4">Best Time to Visit</h3>
                <p className="text-[0.85rem] text-[var(--fg-muted)]">{destination.bestTimeToVisit}</p>
              </div>
            )}
            {destination.location && (
              <div className="p-6 bg-cream dark:bg-[var(--bg-alt)] rounded-sm">
                <h3 className="text-[0.7rem] tracking-[0.2em] uppercase mb-4">Location</h3>
                <p className="text-[0.85rem] text-[var(--fg-muted)]">{destination.location}</p>
              </div>
            )}
          </FadeIn>
        </div>
      </section>

      {destination.wildlife && destination.wildlife.length > 0 && (
        <section className="section-pad bg-cream dark:bg-[var(--bg-alt)]">
          <div className="container-wide">
            <FadeIn>
              <h2 className="text-[1.8rem] font-light mb-8" style={{ fontFamily: 'var(--font-display)' }}>
                Wildlife
              </h2>
            </FadeIn>
            <StaggerGrid className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {destination.wildlife.map((animal) => {
                const img = getImageProps(animal.image as Media)
                return (
                  <StaggerItem key={animal.id}>
                    {img.src && (
                      <div className="relative aspect-square overflow-hidden rounded-sm">
                        <Image
                          src={img.src}
                          alt={animal.animal}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      </div>
                    )}
                    <h3 className="mt-3 text-[0.95rem] font-medium">{animal.animal}</h3>
                    {animal.description && (
                      <p className="mt-1 text-[0.8rem] text-[var(--fg-muted)]">{animal.description}</p>
                    )}
                  </StaggerItem>
                )
              })}
            </StaggerGrid>
          </div>
        </section>
      )}

      {relatedPackages.length > 0 && (
        <section className="section-pad">
          <div className="container-wide">
            <FadeIn>
              <h2 className="text-[1.8rem] font-light mb-8" style={{ fontFamily: 'var(--font-display)' }}>
                Safari Packages
              </h2>
            </FadeIn>
            <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPackages.map((safari) => {
                const img = getImageProps(safari.heroImage as Media)
                return (
                  <StaggerItem key={safari.id}>
                    <Link href={`/safaris/${safari.slug}`} className="group block">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <div className="mt-4">
                        <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[var(--accent-warm)]">
                          {safari.category}
                        </p>
                        <h3
                          className="mt-1 text-[1.2rem] font-light"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {safari.title}
                        </h3>
                        {safari.tagline && (
                          <p className="mt-1 text-[0.8rem] text-[var(--fg-muted)]">{safari.tagline}</p>
                        )}
                      </div>
                    </Link>
                  </StaggerItem>
                )
              })}
            </StaggerGrid>
          </div>
        </section>
      )}

      {/* Always-visible CTA section */}
      <section className="section-pad">
        <div className="container-narrow text-center">
          <FadeIn>
            <span className="eyebrow">Ready to Visit</span>
            <h2 className="mt-4 text-[clamp(1.8rem,3vw,2.5rem)] font-light" style={{ fontFamily: 'var(--font-display)' }}>
              Begin your {destination.name} journey
            </h2>
            <p className="mt-4 text-[var(--fg-muted)] max-w-md mx-auto">
              Speak to a safari specialist about a custom itinerary or browse our crafted experiences.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="inline-block text-[0.7rem] tracking-[0.25em] uppercase px-10 py-4 bg-[var(--accent)] text-ivory hover:bg-[var(--accent-hover)] transition-colors rounded-sm">
                Plan a Safari
              </Link>
              <Link href="/safaris" className="inline-block text-[0.7rem] tracking-[0.25em] uppercase px-10 py-4 border border-[var(--fg)] hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors rounded-sm">
                Browse Safaris
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
