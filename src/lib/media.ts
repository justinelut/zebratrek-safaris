import type { Media } from '@/payload-types'

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || ''

export function getImageUrl(media: Media | string | number | null | undefined): string {
  if (!media) return ''
  if (typeof media === 'string') return media
  if (typeof media === 'number') return ''
  if (!media.url) return ''
  if (media.url.startsWith('http')) return media.url
  return media.url
}

export function getImageProps(media: Media | string | number | null | undefined): {
  src: string
  width: number
  height: number
  alt: string
} {
  if (!media || typeof media === 'string' || typeof media === 'number') {
    return { src: typeof media === 'string' ? media : '', width: 1200, height: 800, alt: '' }
  }
  return {
    src: getImageUrl(media),
    width: media.width || 1200,
    height: media.height || 800,
    alt: media.alt || '',
  }
}
