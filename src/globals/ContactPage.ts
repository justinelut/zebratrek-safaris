import type { GlobalConfig } from 'payload'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
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
          label: 'Form',
          fields: [
            { name: 'formHeadline', type: 'text' },
            { name: 'formSubheadline', type: 'text' },
            { name: 'successMessage', type: 'textarea' },
          ],
        },
        {
          label: 'Sidebar',
          fields: [
            { name: 'sidebarHeadline', type: 'text' },
            { name: 'sidebarBody', type: 'textarea' },
            {
              name: 'trustSignals',
              type: 'array',
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'CTA',
          fields: [
            { name: 'ctaHeadline', type: 'text' },
            { name: 'ctaBody', type: 'textarea' },
          ],
        },
      ],
    },
  ],
}
