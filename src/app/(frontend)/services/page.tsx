import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { getImageProps, getImageUrl } from '@/lib/media'
import { getSiteSettings } from '@/lib/queries'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerGrid } from '@/components/motion/StaggerGrid'
import { StaggerItem } from '@/components/motion/StaggerItem'
import type { Media, Service } from '@/payload-types'

export const metadata = {
  title: 'Our Services — ZebraTrek Safaris',
  description: 'From airport transfers to air safaris, beach holidays to city tours — we handle every aspect of your East Africa experience.',
}

async function getServices() {
  const payload = await getPayload({ config })
  const result = await payload.find({ collection: 'services', sort: 'order', limit: 50 })
  return result.docs as Service[]
}

async function getHeroImage() {
  const payload = await getPayload({ config })
  // Try to find a hero image — prefer about-hero, fall back to contact-hero, then any landscape
  for (const slug of ['about-hero.jpg', 'contact-hero.jpg', 'savanna-sunrise.jpg', 'game-drive.jpg']) {
    const r = await payload.find({ collection: 'media', where: { filename: { contains: slug } }, limit: 1 })
    if (r.docs[0]) return r.docs[0] as Media
  }
  return null
}

export default async function ServicesPage() {
  const [services, settings, heroMedia] = await Promise.all([getServices(), getSiteSettings(), getHeroImage()])
  const brandPattern = getImageUrl((settings as any).brandPattern)
  const heroImg = heroMedia ? getImageProps(heroMedia) : null
  const total = services.length.toString().padStart(2, '0')

  return (
    <>
      {/* Hero with background image — matches destinations pattern */}
      <section className="relative h-[55vh] min-h-[420px] flex items-end pb-16 overflow-hidden">
        {heroImg?.src && (
          <Image src={heroImg.src} alt={heroImg.alt} fill className="object-cover" priority sizes="100vw" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
        <div className="container-wide relative z-10 text-ivory">
          <p className="eyebrow text-ivory/60">{total} Services</p>
          <h1
            className="mt-3 text-[clamp(2rem,4vw,3.5rem)] font-light max-w-3xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Your complete East Africa travel partner
          </h1>
          <p className="mt-4 text-ivory/75 max-w-xl text-[1rem]">
            Beyond world-class safaris — from the moment you land to the moment you leave.
          </p>
        </div>
      </section>

      {/* Uniform 3-column grid (responsive) */}
      <section className="section-pad">
        <div className="container-wide">
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, i) => {
              const img = getImageProps(service.image as Media)
              const num = (i + 1).toString().padStart(2, '0')
              return (
                <StaggerItem key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group relative block overflow-hidden rounded-sm aspect-[4/5]"
                  >
                    {img.src ? (
                      <Image
                        src={img.src}
                        alt={img.alt || service.name}
                        fill
                        className="object-cover group-hover:scale-[1.04] transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : brandPattern ? (
                      <>
                        <div className="absolute inset-0 bg-[var(--bg-alt)]" />
                        <Image src={brandPattern} alt="" fill className="object-cover opacity-15" sizes="33vw" />
                      </>
                    ) : (
                      <div className="absolute inset-0 bg-[var(--bg-alt)]" />
                    )}

                    {/* Dark scrim — always dark for image legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5 group-hover:from-black/90 transition-all duration-500" />

                    {/* Counter */}
                    <span className="absolute top-5 right-5 text-[0.6rem] tracking-[0.15em] text-ivory/50 z-10">
                      {num} / {total}
                    </span>

                    {/* Content — always light text since it's over a dark scrim */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7 z-10">
                      <span className="block text-[0.6rem] tracking-[0.25em] text-[var(--accent-warm)] mb-2 font-medium">
                        {num}
                      </span>
                      <h2
                        className="text-[clamp(1.3rem,2.2vw,1.7rem)] text-ivory leading-tight mb-2"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {service.name}
                      </h2>
                      <div className="h-[1px] w-0 group-hover:w-10 bg-[var(--accent)] transition-all duration-500 mb-3" />
                      <p className="text-[0.8rem] text-ivory/75 leading-relaxed line-clamp-2 max-w-sm">
                        {service.shortDescription}
                      </p>
                    </div>
                  </Link>
                </StaggerItem>
              )
            })}
          </StaggerGrid>
        </div>
      </section>

      {/* CTA — themed */}
      <section className="section-pad bg-[var(--bg-alt)] border-t border-[var(--border)]/30">
        <div className="container-narrow text-center">
          <FadeIn>
            <h2
              className="text-[clamp(1.8rem,3.5vw,2.8rem)] text-[var(--fg)] leading-tight font-light"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Need something custom?
            </h2>
            <p className="mt-5 text-[var(--fg-muted)] max-w-lg mx-auto leading-relaxed">
              Every trip is different. Tell us what you need and we&apos;ll put together a tailored itinerary and quote within 24 hours.
            </p>
            <Link
              href="/contact"
              className="inline-block mt-10 text-[0.65rem] tracking-[0.25em] uppercase px-12 py-4 border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-ivory transition-all duration-300 rounded-sm"
            >
              Get a Quote
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
