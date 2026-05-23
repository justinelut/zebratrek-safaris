import type { GlobalConfig } from 'payload'

export const GalleryPage: GlobalConfig = {
  slug: 'gallery-page',
  fields: [
    { name: 'headline', type: 'text' },
    { name: 'subheadline', type: 'textarea' },
  ],
}
