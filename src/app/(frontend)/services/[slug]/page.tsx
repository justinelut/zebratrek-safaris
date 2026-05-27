import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { getImageProps } from '@/lib/media'
import { RichText } from '@/components/RichText'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerGrid } from '@/components/motion/StaggerGrid'
import { StaggerItem } from '@/components/motion/StaggerItem'
import type { Media, Service } from '@/payload-types'
import { Check } from 'lucide-react'

type Params = { params: Promise<{ slug: string }> }

async function getService(slug: string) {
  const payload = await getPayload({ config })
  const result = await payload.find({ collection: 'services', where: { slug: { equals: slug } }, limit: 1 })
  return result.docs[0] as Service | undefined
}

async function getRelatedServices(currentSlug: string) {
  const payload = await getPayload({ config })
  const result = await payload.find({ collection: 'services', where: { slug: { not_equals: currentSlug } }, sort: 'order', limit: 3 })
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
  const [service, related] = await Promise.all([getService(slug), getRelatedServices(slug)])
  if (!service) notFound()

  const img = getImageProps(service.image as Media)

  return (
    <>
      {/* Hero — large image, no icon */}
      <section className="relative h-[55vh] min-h-[420px] flex items-end pb-14 overflow-hidden">
        {img.src && <Image src={img.src} alt={img.alt} fill className="object-cover" priority sizes="100vw" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="container-wide relative z-10 text-ivory">
          <span className="eyebrow text-ivory/60">Service</span>
          <h1
            className="mt-3 text-[clamp(2.2rem,4.5vw,3.5rem)] font-light leading-[1.1]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {service.name}
          </h1>
          <p className="mt-4 text-ivory/75 max-w-xl text-[1.05rem] leading-relaxed">{service.shortDescription}</p>
        </div>
      </section>

      {/* Content + Sidebar */}
      <section className="section-pad">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-3 gap-16">
          <FadeIn className="lg:col-span-2">
            {service.body ? (
              <RichText content={service.body as any} />
            ) : (
              <p className="text-[1.05rem] leading-relaxed text-[var(--fg-muted)]">{service.shortDescription}</p>
            )}
          </FadeIn>

          <FadeIn delay={0.2} className="space-y-8">
            {/* What's Included */}
            {service.highlights && service.highlights.length > 0 && (
              <div className="p-7 bg-[var(--bg-alt)] rounded-sm border border-[var(--border)]">
                <h3 className="text-[0.75rem] tracking-[0.2em] uppercase mb-5 text-[var(--accent)] font-medium">What&apos;s Included</h3>
                <ul className="space-y-3">
                  {service.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-[0.88rem] leading-relaxed">
                      <Check className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" />
                      <span>{h.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA */}
            <div className="p-7 bg-[var(--accent)] rounded-sm text-center">
              <p className="text-ivory/80 text-[0.9rem] mb-5">Interested in this service?</p>
              <Link
                href={service.ctaLink || '/contact'}
                className="inline-block w-full text-[0.7rem] tracking-[0.2em] uppercase px-8 py-4 bg-ivory text-[var(--fg)] hover:bg-ivory/90 transition-colors rounded-sm font-medium"
              >
                {service.ctaText || 'Enquire Now'}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Related Services */}
      {related.length > 0 && (
        <section className="section-pad bg-cream dark:bg-[var(--bg-alt)]">
          <div className="container-wide">
            <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-light mb-10" style={{ fontFamily: 'var(--font-display)' }}>
              Other Services
            </h2>
            <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((s) => {
                const sImg = getImageProps(s.image as Media)
                return (
                  <StaggerItem key={s.id}>
                    <Link href={`/services/${s.slug}`} className="group block">
                      <div className="relative aspect-[16/10] overflow-hidden rounded-sm">
                        {sImg.src ? (
                          <Image
                            src={sImg.src}
                            alt={sImg.alt || s.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full bg-[var(--bg-alt)]" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-5 text-ivory">
                          <h3 className="text-[1.1rem] font-light" style={{ fontFamily: 'var(--font-display)' }}>{s.name}</h3>
                        </div>
                      </div>
                    </Link>
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
