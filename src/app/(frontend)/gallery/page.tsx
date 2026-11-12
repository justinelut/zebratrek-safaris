import Image from 'next/image'
import { getGalleryPage, getGalleryImages } from '@/lib/queries'
import { getImageProps } from '@/lib/media'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerGrid } from '@/components/motion/StaggerGrid'
import { StaggerItem } from '@/components/motion/StaggerItem'
import type { Media } from '@/payload-types'
import type { Metadata } from 'next'
import { ClientCategoryFilter } from '@/components/ClientCategoryFilter'

export function generateMetadata(): Metadata {
  return { title: 'Gallery — ZebraTrek Safaris' }
}

const categories = ['All', 'Wildlife', 'Landscapes', 'Camps', 'Guests', 'Vehicles'] as const

export default async function GalleryPage() {
  const [page, images] = await Promise.all([
    getGalleryPage(),
    getGalleryImages({ limit: 1000 }),
  ])

  return (
    <>
      <section className="relative h-[40vh] min-h-[300px] flex items-end pb-16 overflow-hidden bg-[var(--bg-alt)]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <FadeIn className="container-wide relative z-10 text-ivory">
          <span className="eyebrow">Gallery</span>
          <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-light mt-2" style={{ fontFamily: 'var(--font-display)' }}>
            {page.headline}
          </h1>
          {page.subheadline && <p className="mt-3 text-ivory/70 max-w-xl">{page.subheadline}</p>}
        </FadeIn>
      </section>

      <section className="section-pad">
        <div className="container-wide">
          <ClientCategoryFilter categories={[...categories]} group="gallery" />

          <div data-filter-group="gallery">
            <p data-filter-empty hidden className="text-center text-[var(--fg-muted)] py-20">No photos found for this category.</p>
            <StaggerGrid className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {images.map((img) => {
                const media = (typeof img.image === 'object' ? img.image : null) as Media | null
                if (!media) return null
                return (
                  <StaggerItem key={img.id} filterItem={img.category || ''} className="relative break-inside-avoid mb-4 overflow-hidden rounded-sm group">
                      <Image
                        {...getImageProps(media)}
                        alt={img.caption ?? ''}
                        width={media.width ?? 600}
                        height={media.height ?? 400}
                        className="w-full h-auto"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-3">
                        {img.caption && <p className="text-ivory text-sm">{img.caption}</p>}
                        {img.photographer && <p className="text-ivory/70 text-xs mt-1">📷 {img.photographer}</p>}
                      </div>
                  </StaggerItem>
                )
              })}
            </StaggerGrid>
          </div>
        </div>
      </section>
    </>
  )
}
