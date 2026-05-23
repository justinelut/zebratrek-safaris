import Image from 'next/image'
import Link from 'next/link'
import { getDestinationsPage, getDestinations } from '@/lib/queries'
import { getImageProps } from '@/lib/media'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerGrid } from '@/components/motion/StaggerGrid'
import { StaggerItem } from '@/components/motion/StaggerItem'
import type { Media } from '@/payload-types'

export async function generateMetadata() {
  const page = await getDestinationsPage()
  return { title: `${page.hero?.headline || 'Destinations'} — ZebraTrek Safaris` }
}

export default async function DestinationsPage() {
  const [page, { docs: destinations }] = await Promise.all([
    getDestinationsPage(),
    getDestinations(),
  ])

  const heroImg = getImageProps(page.hero?.image as Media)

  return (
    <>
      <section className="relative h-[50vh] min-h-[400px] flex items-end pb-16 overflow-hidden">
        {heroImg.src && (
          <Image src={heroImg.src} alt={heroImg.alt} fill className="object-cover" priority sizes="100vw" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="container-wide relative z-10 text-ivory">
          <p className="eyebrow text-ivory/60">Explore Africa</p>
          <h1
            className="mt-3 text-[clamp(2rem,4vw,3.5rem)] font-light"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {page.hero?.headline || 'Our Destinations'}
          </h1>
          {page.hero?.subheadline && (
            <p className="mt-3 text-ivory/70 max-w-xl">{page.hero.subheadline}</p>
          )}
        </div>
      </section>

      {page.introText && (
        <section className="section-pad">
          <div className="container-wide">
            <FadeIn>
              <p className="text-[1.1rem] text-[var(--fg-muted)] max-w-3xl">{page.introText}</p>
            </FadeIn>
          </div>
        </section>
      )}

      <section className="section-pad bg-cream dark:bg-[var(--bg-alt)]">
        <div className="container-wide">
          {destinations.length === 0 ? (
            <p className="text-center text-[var(--fg-muted)] py-20">No destinations found.</p>
          ) : (
            <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destinations.map((dest) => {
                const img = getImageProps(dest.heroImage as Media)
                return (
                  <StaggerItem key={dest.id}>
                    <Link href={`/destinations/${dest.slug}`} className="group block">
                      <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        {dest.country && (
                          <span className="absolute top-4 right-4 text-[0.6rem] tracking-[0.15em] uppercase px-3 py-1 bg-black/50 text-ivory rounded-sm backdrop-blur-sm eyebrow">
                            {dest.country}
                          </span>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h2
                            className="text-[1.4rem] font-light text-ivory"
                            style={{ fontFamily: 'var(--font-display)' }}
                          >
                            {dest.name}
                          </h2>
                          {dest.tagline && (
                            <p className="mt-1 text-[0.8rem] text-ivory/70">{dest.tagline}</p>
                          )}
                          <p className="mt-2 text-[0.65rem] tracking-[0.2em] uppercase text-[var(--accent-warm)]">
                            {dest.wildlife?.length || 0} species
                          </p>
                        </div>
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
