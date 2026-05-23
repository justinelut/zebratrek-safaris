import Image from 'next/image'
import Link from 'next/link'
import { getSafarisPage, getSafaris } from '@/lib/queries'
import { getImageProps } from '@/lib/media'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerGrid } from '@/components/motion/StaggerGrid'
import { StaggerItem } from '@/components/motion/StaggerItem'
import { Price } from '@/components/Price'
import type { Media } from '@/payload-types'

export async function generateMetadata() {
  const page = await getSafarisPage()
  return { title: `${page.hero?.headline || 'Safaris'} — ZebraTrek Safaris` }
}

const categories = ['Classic Safari', 'Luxury Safari', 'Adventure Safari', 'Family Safari', 'Photography Safari', 'Honeymoon Safari']

export default async function SafarisPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const params = await searchParams
  const [page, { docs: safaris }] = await Promise.all([
    getSafarisPage(),
    getSafaris({ category: params.category }),
  ])

  const heroImg = getImageProps(page.hero?.image as Media)

  return (
    <>
      <section className="relative h-[50vh] min-h-[400px] flex items-end pb-16 overflow-hidden">
        {heroImg.src && <Image src={heroImg.src} alt={heroImg.alt} fill className="object-cover" priority sizes="100vw" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <FadeIn className="container-wide relative z-10 text-ivory">
          <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-light" style={{ fontFamily: 'var(--font-display)' }}>
            {page.hero?.headline || 'Our Safaris'}
          </h1>
          {page.hero?.subheadline && <p className="mt-3 text-ivory/70 max-w-xl">{page.hero.subheadline}</p>}
        </FadeIn>
      </section>

      <section className="section-pad">
        <div className="container-wide">
          <FadeIn delay={0.1}>
            <div className="flex flex-wrap gap-3 mb-12">
              <Link href="/safaris" className={`text-[0.7rem] tracking-[0.15em] uppercase px-4 py-2 border rounded-sm transition-colors ${!params.category ? 'bg-[var(--fg)] text-[var(--bg)]' : 'border-[var(--border)] hover:border-[var(--fg)]'}`}>
                All
              </Link>
              {categories.map((cat) => (
                <Link key={cat} href={`/safaris?category=${encodeURIComponent(cat)}`} className={`text-[0.7rem] tracking-[0.15em] uppercase px-4 py-2 border rounded-sm transition-colors ${params.category === cat ? 'bg-[var(--fg)] text-[var(--bg)]' : 'border-[var(--border)] hover:border-[var(--fg)]'}`}>
                  {cat.replace(' Safari', '')}
                </Link>
              ))}
            </div>
          </FadeIn>

          {safaris.length === 0 ? (
            <p className="text-center text-[var(--fg-muted)] py-20">{page.emptyStateText || 'No safaris found for this category.'}</p>
          ) : (
            <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {safaris.map((safari) => {
                const img = getImageProps(safari.heroImage as Media)
                return (
                  <StaggerItem key={safari.id}>
                    <Link href={`/safaris/${safari.slug}`} className="group">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                        <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 33vw" />
                      </div>
                      <div className="mt-4">
                        <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[var(--accent-warm)]">{safari.category}</p>
                        <h2 className="mt-1 text-[1.2rem] font-light" style={{ fontFamily: 'var(--font-display)' }}>{safari.title}</h2>
                        <p className="mt-1 text-[0.8rem] text-[var(--fg-muted)]">{safari.duration}{safari.priceFrom ? <> · <Price amount={safari.priceFrom} baseCurrency={safari.currency} showFrom /></> : ''}</p>
                      </div>
                    </Link>
                  </StaggerItem>
                )
              })}
            </StaggerGrid>
          )}
        </div>
      </section>
    </>
  )
}
