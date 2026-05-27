import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { getImageProps } from '@/lib/media'
import { RichText } from '@/components/RichText'
import { FadeIn } from '@/components/motion/FadeIn'
import type { Media, Service } from '@/payload-types'
import { Check } from 'lucide-react'

type Params = { params: Promise<{ slug: string }> }

async function getService(slug: string) {
  const payload = await getPayload({ config })
  const result = await payload.find({ collection: 'services', where: { slug: { equals: slug } }, limit: 1 })
  return result.docs[0] as Service | undefined
}

async function getAllServices() {
  const payload = await getPayload({ config })
  const result = await payload.find({ collection: 'services', sort: 'order', limit: 20 })
  return result.docs as Service[]
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params
  const service = await getService(slug)
  if (!service) return {}
  return { title: `${service.name} — ZebraTrek Safaris`, description: service.shortDescription }
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params
  const [service, allServices] = await Promise.all([getService(slug), getAllServices()])
  if (!service) notFound()

  const img = getImageProps(service.image as Media)
  const currentIndex = allServices.findIndex((s) => s.slug === slug)
  const position = (currentIndex + 1).toString().padStart(2, '0')
  const related = allServices.filter((s) => s.slug !== slug).slice(0, 3)

  return (
    <>
      {/* Hero — 60vh+ */}
      <section className="relative h-[65vh] min-h-[500px] flex items-end pb-16 overflow-hidden">
        {img.src && (
          <Image src={img.src} alt={img.alt} fill className="object-cover" priority sizes="100vw" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208] via-[#1A1208]/40 to-transparent" />
        <div className="mx-auto max-w-[90rem] px-6 md:px-10 relative z-10 w-full">
          <FadeIn>
            <span className="text-[0.6rem] tracking-[0.3em] uppercase text-[#C4B89A]/70 block mb-3">
              Service · {position}
            </span>
            <h1
              className="text-[clamp(2.4rem,5vw,4rem)] leading-[1.05] text-[#eff3cf] max-w-3xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {service.name}
            </h1>
            <p className="mt-5 text-[#C4B89A] max-w-xl text-[1.05rem] leading-relaxed">{service.shortDescription}</p>
          </FadeIn>
        </div>
      </section>

      {/* Two-column body */}
      <section className="py-24 md:py-32 bg-[#1A1208]">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10 grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main content */}
          <FadeIn className="lg:col-span-2">
            <div className="text-[#eff3cf]">
              {service.body ? (
                <RichText content={service.body as any} />
              ) : (
                <p className="text-[1.1rem] leading-relaxed text-[#C4B89A]">{service.shortDescription}</p>
              )}
            </div>
          </FadeIn>

          {/* Sidebar */}
          <FadeIn delay={0.15} className="space-y-6">
            {service.highlights && service.highlights.length > 0 && (
              <div className="p-7 bg-[#2C2416] rounded-sm border border-[#4A5240]">
                <h3 className="text-[0.7rem] tracking-[0.25em] uppercase mb-5 text-[#B8860B] font-medium">
                  What&apos;s Included
                </h3>
                <ul className="space-y-3">
                  {service.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-[0.88rem] leading-relaxed text-[#eff3cf]">
                      <Check className="w-4 h-4 text-[#D4A843] mt-0.5 shrink-0" />
                      <span>{h.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="p-7 bg-[#2C2416] rounded-sm border border-[#4A5240] text-center">
              <p className="text-[#C4B89A] text-[0.88rem] mb-5">Interested in this service?</p>
              <Link
                href={service.ctaLink || '/contact'}
                className="inline-block w-full text-[0.65rem] tracking-[0.2em] uppercase px-8 py-4 border border-[#B8860B] text-[#D4A843] hover:bg-[#B8860B] hover:text-[#eff3cf] transition-all duration-300 rounded-sm font-medium"
              >
                {service.ctaText || 'Enquire Now'}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Related services */}
      {related.length > 0 && (
        <section className="py-24 bg-[#1A1208] border-t border-[#4A5240]/30">
          <div className="mx-auto max-w-[90rem] px-6 md:px-10">
            <h2
              className="text-[clamp(1.4rem,2.5vw,2rem)] text-[#eff3cf] mb-12"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Other Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((s) => {
                const sImg = getImageProps(s.image as Media)
                return (
                  <Link key={s.id} href={`/services/${s.slug}`} className="group relative block h-[280px] overflow-hidden rounded-sm">
                    {sImg.src ? (
                      <Image
                        src={sImg.src}
                        alt={sImg.alt || s.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[#2C2416]" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208]/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                      <h3
                        className="text-[1.15rem] text-[#eff3cf] leading-tight"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {s.name}
                      </h3>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
