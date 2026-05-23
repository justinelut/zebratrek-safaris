import type { GlobalConfig } from 'payload'

export const DestinationsPage: GlobalConfig = {
  slug: 'destinations-page',
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
    { name: 'introText', type: 'textarea' },
  ],
}
