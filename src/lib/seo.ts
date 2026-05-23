import type { Metadata } from 'next'
import type { Media } from '@/payload-types'
import { getImageUrl } from './media'

type SeoFields = {
  meta?: { title?: string | null; description?: string | null; image?: Media | string | null } | null
}

type Defaults = {
  title?: string
  description?: string
  image?: Media | string | null
}

export function generatePageMetadata(seo: SeoFields | null | undefined, defaults: Defaults = {}): Metadata {
  const title = seo?.meta?.title || defaults.title || 'ZebraTrek Safaris'
  const description = seo?.meta?.description || defaults.description || ''
  const image = seo?.meta?.image || defaults.image
  const ogImage = image ? getImageUrl(image as Media) : undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(ogImage && { images: [{ url: ogImage }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
  }
}
