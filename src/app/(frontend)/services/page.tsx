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
  const result = await payload.find({ collection: 'services', sort: 'order', limit: 20 })
  return result.docs as Service[]
}

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([getServices(), getSiteSettings()])
  const brandPattern = getImageUrl((settings as any).brandPattern)

  return (
    <>
      {/* Hero — full-width editorial */}
      <section className="relative min-h-[50vh] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[var(--bg-alt)]" />
        <div className="container-wide relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-end pt-40">
          <FadeIn>
            <span className="eyebrow">What We Offer</span>
            <h1
              className="mt-4 text-[clamp(2.2rem,4.5vw,3.8rem)] font-light leading-[1.1]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Your complete East Africa travel partner
            </h1>
            <p className="mt-6 text-[1.05rem] text-[var(--fg-muted)] max-w-lg leading-relaxed font-light">
              Beyond world-class safaris, we handle every detail of your journey — from the moment you land to the moment you leave. Airport transfers, domestic flights, beach extensions, city tours, and everything in between.
            </p>
          </FadeIn>
          <FadeIn delay={0.2} className="hidden lg:block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              {services[0] && getImageProps(services[0].image as Media).src ? (
                <Image
                  src={getImageProps(services[0].image as Media).src}
                  alt="Safari services"
                  fill
                  className="object-cover"
                  sizes="50vw"
                  priority
                />
              ) : brandPattern ? (
                <Image src={brandPattern} alt="" fill className="object-cover opacity-30" sizes="50vw" />
              ) : (
                <div className="w-full h-full bg-[var(--accent)]/5" />
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Services grid — image-led editorial cards */}
      <section className="section-pad">
        <div className="container-wide">
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const img = getImageProps(service.image as Media)
              return (
                <StaggerItem key={service.id}>
                  <Link href={`/services/${service.slug}`} className="group block h-full">
                    <article className="relative flex flex-col h-full overflow-hidden rounded-sm">
                      {/* Image area — portrait aspect */}
                      <div className="relative aspect-[4/5] overflow-hidden">
                        {img.src ? (
                          <Image
                            src={img.src}
                            alt={img.alt || service.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : brandPattern ? (
                          <Image src={brandPattern} alt="" fill className="object-cover opacity-20" sizes="33vw" />
                        ) : (
                          <div className="w-full h-full bg-[var(--bg-alt)]" />
                        )}
                        {/* Gradient overlay with title */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-ivory">
                          <h2
                            className="text-[clamp(1.3rem,2vw,1.6rem)] font-light leading-tight"
                            style={{ fontFamily: 'var(--font-display)' }}
                          >
                            {service.name}
                          </h2>
                          <span className="inline-block mt-3 text-[0.65rem] tracking-[0.2em] uppercase text-ivory/70 group-hover:text-[var(--accent)] transition-colors duration-300">
                            Explore →
                          </span>
                        </div>
                      </div>
                      {/* Description below image */}
                      <div className="p-5 bg-[var(--bg-alt)] flex-1 border border-t-0 border-[var(--border)] group-hover:border-[var(--accent)]/30 transition-colors duration-300">
                        <p className="text-[0.85rem] text-[var(--fg-muted)] leading-relaxed line-clamp-3">
                          {service.shortDescription}
                        </p>
                      </div>
                    </article>
                  </Link>
                </StaggerItem>
              )
            })}
          </StaggerGrid>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-cream dark:bg-[var(--bg-alt)]">
        <div className="container-narrow text-center">
          <FadeIn>
            <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-light" style={{ fontFamily: 'var(--font-display)' }}>
              Need something custom?
            </h2>
            <p className="mt-4 text-[var(--fg-muted)] max-w-lg mx-auto">
              Every trip is different. Tell us what you need and we&apos;ll put together a tailored itinerary and quote within 24 hours.
            </p>
            <Link
              href="/contact"
              className="inline-block mt-8 text-[0.7rem] tracking-[0.25em] uppercase px-10 py-4 bg-[var(--accent)] text-ivory hover:bg-[var(--accent-hover)] transition-colors rounded-sm"
            >
              Get a Quote
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
