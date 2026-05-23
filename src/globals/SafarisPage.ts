import type { GlobalConfig } from 'payload'

export const SafarisPage: GlobalConfig = {
  slug: 'safaris-page',
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'headline', type: 'text' },
        { name: 'subheadline', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    { name: 'emptyStateText', type: 'text' },
  ],
}
