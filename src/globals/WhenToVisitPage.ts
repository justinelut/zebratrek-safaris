import type { GlobalConfig } from 'payload'

export const WhenToVisitPage: GlobalConfig = {
  slug: 'when-to-visit-page',
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
    { name: 'intro', type: 'textarea' },
    {
      name: 'months',
      type: 'array',
      fields: [
        { name: 'month', type: 'text' },
        { name: 'weather', type: 'text' },
        { name: 'wildlife', type: 'text' },
        { name: 'crowds', type: 'text' },
        { name: 'rating', type: 'number', min: 1, max: 5 },
      ],
    },
    {
      name: 'seasons',
      type: 'array',
      fields: [
        { name: 'name', type: 'text' },
        { name: 'months', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'highlights', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
