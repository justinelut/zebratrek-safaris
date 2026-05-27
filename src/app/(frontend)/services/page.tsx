import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { getImageProps, getImageUrl } from '@/lib/media'
import { getSiteSettings } from '@/lib/queries'
import { FadeIn } from '@/components/motion/FadeIn'
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
  const total = services.length.toString().padStart(2, '0')

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-end pb-20 overflow-hidden bg-[#1A1208]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1208] via-[#1A1208]/95 to-[#1A1208]" />
        <div className="mx-auto max-w-[90rem] px-6 md:px-10 relative z-10 w-full pt-44">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
              <div>
                <span className="text-[0.6rem] tracking-[0.3em] uppercase text-[#B8860B] block mb-5">
                  {total} Services
                </span>
                <h1
                  className="text-[clamp(2.4rem,5vw,4.2rem)] leading-[1.05] text-[#eff3cf]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Your complete East Africa travel partner
                </h1>
              </div>
              <div className="lg:pb-2">
                <p className="text-[1rem] text-[#C4B89A] max-w-md leading-relaxed">
                  Beyond world-class safaris, we handle every detail — from the moment you land to the moment you leave.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Magazine-style asymmetric grid */}
      <section className="py-24 md:py-32 bg-[#1A1208]">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10">
          <div className="space-y-5">
            {services.map((service, i) => {
              const img = getImageProps(service.image as Media)
              const num = (i + 1).toString().padStart(2, '0')
              // Alternate: large left / small right, then small left / large right
              const isLarge = i % 3 === 0
              const rowStart = Math.floor(i / 3) * 3

              if (i % 3 === 0) {
                // Start a new row group: large card (2/3) + next card (1/3)
                const next = services[i + 1]
                const nextImg = next ? getImageProps(next.image as Media) : null
                const nextNum = next ? (i + 2).toString().padStart(2, '0') : null
                return (
                  <div key={service.id} className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <ServiceCard
                      service={service}
                      img={img}
                      num={num}
                      total={total}
                      className="md:col-span-2 h-[400px] md:h-[480px]"
                      brandPattern={brandPattern}
                    />
                    {next && nextImg && (
                      <ServiceCard
                        service={next}
                        img={nextImg}
                        num={nextNum!}
                        total={total}
                        className="h-[340px] md:h-[480px]"
                        brandPattern={brandPattern}
                      />
                    )}
                  </div>
                )
              } else if (i % 3 === 1) {
                // Already rendered in the group above
                return null
              } else {
                // Third card in group: full width narrow
                return (
                  <div key={service.id} className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <ServiceCard
                      service={service}
                      img={img}
                      num={num}
                      total={total}
                      className="md:col-span-1 h-[340px] md:h-[380px]"
                      brandPattern={brandPattern}
                    />
                    {/* Empty space for asymmetry */}
                    <div className="hidden md:block md:col-span-2" />
                  </div>
                )
              }
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-[#1A1208] border-t border-[#4A5240]/30">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <FadeIn>
            <h2
              className="text-[clamp(1.8rem,3.5vw,2.8rem)] text-[#eff3cf] leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Need something custom?
            </h2>
            <p className="mt-5 text-[#C4B89A] max-w-lg mx-auto leading-relaxed">
              Every trip is different. Tell us what you need and we&apos;ll put together a tailored itinerary and quote within 24 hours.
            </p>
            <Link
              href="/contact"
              className="inline-block mt-10 text-[0.65rem] tracking-[0.25em] uppercase px-12 py-4 border border-[#B8860B] text-[#D4A843] hover:bg-[#B8860B] hover:text-[#eff3cf] transition-all duration-300 rounded-sm"
            >
              Get a Quote
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  )
}

function ServiceCard({
  service,
  img,
  num,
  total,
  className = '',
  brandPattern,
}: {
  service: Service
  img: { src: string; alt: string }
  num: string
  total: string
  className?: string
  brandPattern: string | null
}) {
  return (
    <Link href={`/services/${service.slug}`} className={`group relative block overflow-hidden rounded-sm ${className}`}>
      {/* Image */}
      {img.src ? (
        <Image
          src={img.src}
          alt={img.alt || service.name}
          fill
          className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 66vw"
        />
      ) : brandPattern ? (
        <Image src={brandPattern} alt="" fill className="object-cover opacity-20" sizes="66vw" />
      ) : (
        <div className="absolute inset-0 bg-[#2C2416]" />
      )}
      {/* Scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208]/90 via-[#1A1208]/40 to-[#1A1208]/10 group-hover:from-[#1A1208]/95 transition-all duration-500" />

      {/* Counter */}
      <span className="absolute top-5 right-5 text-[0.6rem] tracking-[0.15em] text-[#C4B89A]/50 z-10">
        {num} / {total}
      </span>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-7 z-10">
        <span className="block text-[0.6rem] tracking-[0.25em] text-[#B8860B] mb-2 font-medium">{num}</span>
        <h2
          className="text-[clamp(1.3rem,2.5vw,1.8rem)] text-[#eff3cf] leading-tight mb-2"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {service.name}
        </h2>
        <div className="h-[1px] w-0 group-hover:w-10 bg-[#B8860B] transition-all duration-500 mb-3" />
        <p className="text-[0.8rem] text-[#C4B89A] leading-relaxed line-clamp-2 max-w-sm">
          {service.shortDescription}
        </p>
      </div>
    </Link>
  )
}
