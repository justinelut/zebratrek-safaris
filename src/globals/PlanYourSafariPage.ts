import type { GlobalConfig } from 'payload'

export const PlanYourSafariPage: GlobalConfig = {
  slug: 'plan-your-safari-page',
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
    {
      name: 'steps',
      type: 'array',
      fields: [
        { name: 'number', type: 'number' },
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'travelStyles',
      type: 'array',
      fields: [
        { name: 'name', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'priceRange', type: 'text' },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      fields: [
        { name: 'headline', type: 'text' },
        { name: 'ctaText', type: 'text' },
        { name: 'ctaLink', type: 'text' },
      ],
    },
  ],
}
