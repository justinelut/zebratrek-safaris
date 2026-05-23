import type { GlobalConfig } from 'payload'

export const JournalPage: GlobalConfig = {
  slug: 'journal-page',
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
    { name: 'featuredPostHeadline', type: 'text' },
  ],
}
