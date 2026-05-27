import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { getImageProps } from '@/lib/media'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerGrid } from '@/components/motion/StaggerGrid'
import { StaggerItem } from '@/components/motion/StaggerItem'
import type { Media, Service } from '@/payload-types'
import { Plane, Bus, Car, Palmtree, Globe, Map, Compass } from 'lucide-react'

const iconMap: Record<string, any> = { Plane, Bus, Car, Palmtree, Globe, Map, Compass }

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
  const services = await getServices()

  return (
    <>
      <section className="section-pad pt-40">
        <div className="container-wide">
          <FadeIn>
            <span className="eyebrow">What We Offer</span>
            <h1
              className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-light max-w-3xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Your complete East Africa travel partner
            </h1>
            <p className="mt-5 text-[1.05rem] text-[var(--fg-muted)] max-w-2xl leading-relaxed font-light">
              Beyond world-class safaris, we handle every detail of your journey — from the moment you land to the moment you leave. Airport transfers, domestic flights, beach extensions, city tours, and everything in between.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-wide">
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const img = getImageProps(service.image as Media)
              const Icon = iconMap[service.icon || ''] || Compass
              return (
                <StaggerItem key={service.id}>
                  <Link href={`/services/${service.slug}`} className="group block h-full">
                    <article className="relative flex flex-col h-full bg-[var(--bg-alt)] rounded-sm overflow-hidden border border-[var(--border)] hover:border-[var(--accent)] transition-colors duration-300">
                      {img.src && (
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>
                      )}
                      <div className="flex-1 p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="w-9 h-9 rounded-full bg-[var(--accent)]/10 flex items-center justify-center">
                            <Icon className="w-4 h-4 text-[var(--accent)]" />
                          </span>
                          <h2 className="text-[1.15rem] font-medium">{service.name}</h2>
                        </div>
                        <p className="text-[0.85rem] text-[var(--fg-muted)] leading-relaxed line-clamp-3">
                          {service.shortDescription}
                        </p>
                      </div>
                      <div className="px-6 pb-5">
                        <span className="text-[0.7rem] tracking-[0.2em] uppercase text-[var(--accent)] group-hover:text-[var(--accent-hover)] transition-colors">
                          Learn more →
                        </span>
                      </div>
                    </article>
                  </Link>
                </StaggerItem>
              )
            })}
          </StaggerGrid>
        </div>
      </section>

      <section className="section-pad bg-cream dark:bg-[var(--bg-alt)]">
        <div className="container-narrow text-center">
          <FadeIn>
            <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-light" style={{ fontFamily: 'var(--font-display)' }}>
              Need something custom?
            </h2>
            <p className="mt-4 text-[var(--fg-muted)] max-w-lg mx-auto">
              Every trip is different. Tell us what you need and we'll put together a tailored itinerary and quote within 24 hours.
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
