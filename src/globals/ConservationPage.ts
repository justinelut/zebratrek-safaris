import type { GlobalConfig } from 'payload'

export const ConservationPage: GlobalConfig = {
  slug: 'conservation-page',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            { name: 'headline', type: 'text' },
            { name: 'subheadline', type: 'textarea' },
            { name: 'image', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Mission',
          fields: [
            { name: 'missionHeadline', type: 'text' },
            { name: 'body', type: 'richText' },
          ],
        },
        {
          label: 'Stats',
          fields: [
            {
              name: 'stats',
              type: 'array',
              fields: [
                { name: 'value', type: 'text' },
                { name: 'label', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'Partnerships',
          fields: [
            {
              name: 'partnerships',
              type: 'array',
              fields: [
                { name: 'name', type: 'text' },
                { name: 'description', type: 'text' },
                { name: 'url', type: 'text' },
                { name: 'logo', type: 'upload', relationTo: 'media' },
              ],
            },
          ],
        },
        {
          label: 'CTA',
          fields: [
            { name: 'ctaHeadline', type: 'text' },
            { name: 'ctaBody', type: 'textarea' },
            { name: 'ctaText', type: 'text' },
            { name: 'ctaLink', type: 'text' },
          ],
        },
      ],
    },
  ],
}
