import type { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            { name: 'heroHeadline', type: 'text' },
            { name: 'heroSubheadline', type: 'textarea' },
            { name: 'heroImage', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Story',
          fields: [
            { name: 'storyHeadline', type: 'text' },
            { name: 'storyBody', type: 'richText' },
            { name: 'founderImage', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Values',
          fields: [
            {
              name: 'values',
              type: 'array',
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
                { name: 'icon', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'Timeline',
          fields: [
            {
              name: 'events',
              type: 'array',
              fields: [
                { name: 'year', type: 'text', required: true },
                { name: 'event', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'Awards',
          fields: [
            {
              name: 'awards',
              type: 'array',
              fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'year', type: 'text' },
                { name: 'image', type: 'upload', relationTo: 'media' },
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
