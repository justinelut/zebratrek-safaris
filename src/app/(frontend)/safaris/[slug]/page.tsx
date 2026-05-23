import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getSafariBySlug } from '@/lib/queries'
import { getImageProps } from '@/lib/media'
import { generatePageMetadata } from '@/lib/seo'
import { RichText } from '@/components/RichText'
import { Price } from '@/components/Price'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerGrid } from '@/components/motion/StaggerGrid'
import { StaggerItem } from '@/components/motion/StaggerItem'
import type { Media, Destination } from '@/payload-types'

type Params = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params) {
  const { slug } = await params
  const safari = await getSafariBySlug(slug)
  if (!safari) return {}
  return generatePageMetadata(safari as any, { title: `${safari.title} — ZebraTrek Safaris`, description: safari.tagline || '' })
}

export default async function SafariDetailPage({ params }: Params) {
  const { slug } = await params
  const safari = await getSafariBySlug(slug)
  if (!safari) notFound()

  const heroImg = getImageProps(safari.heroImage as Media)
  const destinations = (safari.destinations || []).filter((d): d is Destination => typeof d !== 'string')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: safari.title,
    description: safari.tagline,
    touristType: safari.category,
    offers: safari.priceFrom ? { '@type': 'Offer', price: safari.priceFrom, priceCurrency: safari.currency || 'USD' } : undefined,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative h-[60vh] min-h-[500px] flex items-end pb-16 overflow-hidden">
        <Image src={heroImg.src} alt={heroImg.alt} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <FadeIn className="container-wide relative z-10 text-ivory">
          <p className="eyebrow text-ivory/60">{safari.category}</p>
          <h1 className="mt-3 text-[clamp(2.2rem,5vw,4rem)] font-light" style={{ fontFamily: 'var(--font-display)' }}>{safari.title}</h1>
          {safari.tagline && <p className="mt-3 text-[1.05rem] text-ivory/70 max-w-xl">{safari.tagline}</p>}
          <div className="mt-6 flex flex-wrap gap-6 text-[0.8rem] text-ivory/60">
            {safari.duration && <span>{safari.duration}</span>}
            {safari.groupSize && <span>Max {safari.groupSize} guests</span>}
            {safari.difficulty && <span>{safari.difficulty}</span>}
            {safari.priceFrom && <span><Price amount={safari.priceFrom} baseCurrency={safari.currency} showFrom /></span>}
          </div>
        </FadeIn>
      </section>

      <section className="section-pad">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            {safari.description && (
              <FadeIn>
                <RichText content={safari.description as any} />
              </FadeIn>
            )}

            {safari.itinerary && safari.itinerary.length > 0 && (
              <div className="mt-16">
                <FadeIn>
                  <h2 className="text-[1.8rem] font-light mb-8" style={{ fontFamily: 'var(--font-display)' }}>Itinerary</h2>
                </FadeIn>
                <StaggerGrid className="space-y-8">
                  {safari.itinerary.map((day) => (
                    <StaggerItem key={day.id}>
                      <div className="border-l-2 border-[var(--accent-warm)] pl-6">
                        <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[var(--accent-warm)]">Day {day.day}</p>
                        <h3 className="mt-1 text-[1.1rem] font-medium">{day.title}</h3>
                        {day.description && <p className="mt-2 text-[0.9rem] text-[var(--fg-muted)] leading-relaxed">{day.description}</p>}
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerGrid>
              </div>
            )}
          </div>

          <aside>
            <FadeIn delay={0.2} className="space-y-8">
              {safari.highlights && safari.highlights.length > 0 && (
                <div className="p-6 bg-cream dark:bg-[var(--bg-alt)] rounded-sm">
                  <h3 className="text-[0.7rem] tracking-[0.2em] uppercase mb-4">Highlights</h3>
                  <ul className="space-y-2">
                    {safari.highlights.map((h) => <li key={h.id} className="text-[0.85rem] text-[var(--fg-muted)]">• {h.highlight}</li>)}
                  </ul>
                </div>
              )}

              {safari.included && safari.included.length > 0 && (
                <div className="p-6 bg-cream dark:bg-[var(--bg-alt)] rounded-sm">
                  <h3 className="text-[0.7rem] tracking-[0.2em] uppercase mb-4">Included</h3>
                  <ul className="space-y-2">
                    {safari.included.map((item) => <li key={item.id} className="text-[0.85rem] text-[var(--fg-muted)]">✓ {item.item}</li>)}
                  </ul>
                </div>
              )}

              {safari.excluded && safari.excluded.length > 0 && (
                <div className="p-6 bg-cream dark:bg-[var(--bg-alt)] rounded-sm">
                  <h3 className="text-[0.7rem] tracking-[0.2em] uppercase mb-4">Not Included</h3>
                  <ul className="space-y-2">
                    {safari.excluded.map((item) => <li key={item.id} className="text-[0.85rem] text-[var(--fg-muted)]">✗ {item.item}</li>)}
                  </ul>
                </div>
              )}
            </FadeIn>

            <FadeIn delay={0.4} className="mt-8 space-y-4">
              <Link
                href={`/book/${safari.slug}`}
                className="block w-full text-center text-[0.7rem] tracking-[0.25em] uppercase py-4 bg-[var(--accent)] text-ivory hover:bg-[var(--accent-hover)] transition-colors duration-300 rounded-sm"
              >
                Book This Safari
              </Link>
              <Link
                href={`/contact?safari=${safari.slug}`}
                className="block w-full text-center text-[0.7rem] tracking-[0.25em] uppercase py-4 border border-[var(--fg)] hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors duration-300 rounded-sm"
              >
                Enquire First
              </Link>
            </FadeIn>
          </aside>
        </div>
      </section>

      {safari.gallery && safari.gallery.length > 0 && (
        <section className="section-pad bg-cream dark:bg-[var(--bg-alt)]">
          <div className="container-wide">
            <FadeIn>
              <h2 className="text-[1.8rem] font-light mb-8" style={{ fontFamily: 'var(--font-display)' }}>Gallery</h2>
            </FadeIn>
            <StaggerGrid className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {safari.gallery.map((item) => {
                const img = getImageProps(item.image as Media)
                return (
                  <StaggerItem key={item.id}>
                    <div className="relative aspect-square overflow-hidden rounded-sm">
                      <Image src={img.src} alt={item.caption || img.alt} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
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
