import type { GlobalConfig } from 'payload'

export const WhatToExpectPage: GlobalConfig = {
  slug: 'what-to-expect-page',
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
      name: 'sections',
      type: 'array',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'body', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'packingList',
      type: 'array',
      fields: [
        { name: 'category', type: 'text' },
        {
          name: 'items',
          type: 'array',
          fields: [{ name: 'item', type: 'text' }],
        },
      ],
    },
    {
      name: 'dayOnSafari',
      type: 'array',
      fields: [
        { name: 'time', type: 'text' },
        { name: 'activity', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
}
