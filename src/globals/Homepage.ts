import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            { name: 'headline', type: 'text' },
            { name: 'subheadline', type: 'textarea' },
            { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
            { name: 'ctaText', type: 'text', defaultValue: 'Plan Your Safari' },
            { name: 'ctaLink', type: 'text', defaultValue: '/contact' },
          ],
        },
        {
          label: 'Intro',
          fields: [{ name: 'statement', type: 'textarea' }],
        },
        {
          label: 'Philosophy',
          fields: [
            { name: 'philosophyHeadline', type: 'text' },
            { name: 'philosophyBody', type: 'textarea' },
            { name: 'philosophyImage', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Numbers',
          fields: [
            {
              name: 'stats',
              type: 'array',
              fields: [
                { name: 'value', type: 'text' },
                { name: 'label', type: 'text' },
                { name: 'suffix', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'Experiences',
          fields: [
            { name: 'experiencesHeadline', type: 'text' },
            { name: 'experiencesSubheadline', type: 'text' },
          ],
        },
        {
          label: 'Wildlife',
          fields: [
            { name: 'wildlifeHeadline', type: 'text' },
            {
              name: 'animals',
              type: 'array',
              fields: [
                { name: 'name', type: 'text' },
                { name: 'image', type: 'upload', relationTo: 'media' },
              ],
            },
          ],
        },
        {
          label: 'Lodge',
          fields: [
            { name: 'lodgeHeadline', type: 'text' },
            { name: 'lodgeBody', type: 'textarea' },
            { name: 'lodgeImage', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Process',
          fields: [
            { name: 'processHeadline', type: 'text' },
            {
              name: 'steps',
              type: 'array',
              fields: [
                { name: 'number', type: 'number' },
                { name: 'title', type: 'text' },
                { name: 'description', type: 'textarea' },
              ],
            },
          ],
        },
        {
          label: 'Conservation',
          fields: [
            { name: 'conservationHeadline', type: 'text' },
            { name: 'conservationBody', type: 'textarea' },
            { name: 'conservationStat', type: 'text' },
            { name: 'conservationImage', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Closing CTA',
          fields: [
            { name: 'closingHeadline', type: 'text' },
            { name: 'closingBody', type: 'textarea' },
            { name: 'closingCtaText', type: 'text' },
            { name: 'closingCtaLink', type: 'text' },
          ],
        },
        {
          label: 'Pull Quote',
          fields: [
            { name: 'quote', type: 'textarea' },
            { name: 'attribution', type: 'text' },
          ],
        },
        {
          label: 'Image Breaks',
          fields: [
            {
              name: 'images',
              type: 'array',
              fields: [
                { name: 'image', type: 'upload', relationTo: 'media' },
                { name: 'alt', type: 'text' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
