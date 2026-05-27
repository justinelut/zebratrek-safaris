import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { getImageProps } from '@/lib/media'
import { RichText } from '@/components/RichText'
import { FadeIn } from '@/components/motion/FadeIn'
import type { Media, Service } from '@/payload-types'
import { Plane, Bus, Car, Palmtree, Globe, Map, Compass, Check } from 'lucide-react'

const iconMap: Record<string, any> = { Plane, Bus, Car, Palmtree, Globe, Map, Compass }

type Params = { params: Promise<{ slug: string }> }

async function getService(slug: string) {
  const payload = await getPayload({ config })
  const result = await payload.find({ collection: 'services', where: { slug: { equals: slug } }, limit: 1 })
  return result.docs[0] as Service | undefined
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params
  const service = await getService(slug)
  if (!service) return {}
  return { title: `${service.name} — ZebraTrek Safaris`, description: service.shortDescription }
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params
  const service = await getService(slug)
  if (!service) notFound()

  const img = getImageProps(service.image as Media)
  const Icon = iconMap[service.icon || ''] || Compass

  return (
    <>
      <section className="relative h-[45vh] min-h-[360px] flex items-end pb-14 overflow-hidden">
        {img.src && <Image src={img.src} alt={img.alt} fill className="object-cover" priority sizes="100vw" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
        <div className="container-wide relative z-10 text-ivory">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Icon className="w-5 h-5 text-ivory" />
            </span>
            <span className="eyebrow text-ivory/70">Service</span>
          </div>
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-light" style={{ fontFamily: 'var(--font-display)' }}>
            {service.name}
          </h1>
          <p className="mt-3 text-ivory/75 max-w-xl text-[1rem]">{service.shortDescription}</p>
        </div>
      </section>

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
            {service.highlights && service.highlights.length > 0 && (
              <div className="p-6 bg-[var(--bg-alt)] rounded-sm border border-[var(--border)]">
                <h3 className="text-[0.7rem] tracking-[0.2em] uppercase mb-4 text-[var(--accent)]">What's Included</h3>
                <ul className="space-y-3">
                  {service.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-[0.85rem]">
                      <Check className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" />
                      <span>{h.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="p-6 bg-[var(--bg-alt)] rounded-sm border border-[var(--border)] text-center">
              <p className="text-[0.85rem] text-[var(--fg-muted)] mb-4">Interested in this service?</p>
              <Link
                href={service.ctaLink || '/contact'}
                className="inline-block w-full text-[0.7rem] tracking-[0.2em] uppercase px-8 py-4 bg-[var(--accent)] text-ivory hover:bg-[var(--accent-hover)] transition-colors rounded-sm"
              >
                {service.ctaText || 'Enquire Now'}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
