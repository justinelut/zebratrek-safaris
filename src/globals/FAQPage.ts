import type { GlobalConfig } from 'payload'

export const FAQPage: GlobalConfig = {
  slug: 'faq-page',
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'headline', type: 'text' },
        { name: 'subheadline', type: 'textarea' },
      ],
    },
    {
      name: 'categories',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        {
          name: 'questions',
          type: 'array',
          fields: [
            { name: 'question', type: 'text', required: true },
            { name: 'answer', type: 'textarea', required: true },
          ],
        },
      ],
    },
  ],
}
