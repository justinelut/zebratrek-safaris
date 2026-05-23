import { notFound } from 'next/navigation'
import { getSafariBySlug } from '@/lib/queries'
import { BookingForm } from './BookingForm'
import type { Media } from '@/payload-types'
import { getImageProps } from '@/lib/media'
import { Price } from '@/components/Price'
import Image from 'next/image'

type Params = { params: Promise<{ 'safari-slug': string }> }

export async function generateMetadata({ params }: Params) {
  const { 'safari-slug': slug } = await params
  const safari = await getSafariBySlug(slug)
  if (!safari) return {}
  return { title: `Book ${safari.title} — ZebraTrek Safaris` }
}

export default async function BookingPage({ params }: Params) {
  const { 'safari-slug': slug } = await params
  const safari = await getSafariBySlug(slug)
  if (!safari) notFound()

  const heroImg = getImageProps(safari.heroImage as Media)

  return (
    <>
      <section className="relative h-[35vh] min-h-[300px] flex items-end pb-12 overflow-hidden">
        <Image src={heroImg.src} alt={heroImg.alt} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="container-wide relative z-10 text-ivory">
          <p className="eyebrow text-ivory/60">Book Your Safari</p>
          <h1 className="mt-2 text-[clamp(1.8rem,3.5vw,2.8rem)] font-light" style={{ fontFamily: 'var(--font-display)' }}>{safari.title}</h1>
          <p className="mt-2 text-[0.85rem] text-ivory/70">{safari.duration} · <Price amount={safari.priceFrom} baseCurrency={safari.currency} showFrom /></p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-wide">
          <BookingForm
            safariId={String(safari.id)}
            safariSlug={safari.slug}
            safariTitle={safari.title}
            basePrice={safari.priceFrom || 3000}
            currency={safari.currency || 'USD'}
            duration={safari.duration || ''}
          />
        </div>
      </section>
    </>
  )
}
