import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Site Settings',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Brand',
          fields: [
            { name: 'companyName', type: 'text', defaultValue: 'ZebraTrek Safaris', required: true },
            { name: 'tagline', type: 'text', defaultValue: 'Where Every Trail Tells a Story' },
            { name: 'logo', type: 'upload', relationTo: 'media' },
            { name: 'favicon', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Contact',
          fields: [
            { name: 'phone', type: 'text' },
            { name: 'whatsAppNumber', type: 'text' },
            { name: 'email', type: 'email', defaultValue: 'info@zebratrailssafari.com' },
            { name: 'officeAddress', type: 'text', defaultValue: 'Nairobi, Kenya' },
          ],
        },
        {
          label: 'Navigation',
          fields: [
            {
              name: 'navigation',
              type: 'array',
              minRows: 1,
              maxRows: 8,
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'href', type: 'text', required: true },
              ],
            },
            { name: 'mobileCtaText', type: 'text', defaultValue: 'Plan your safari' },
            { name: 'mobileCtaLink', type: 'text', defaultValue: '/contact' },
          ],
        },
        {
          label: 'Hero Defaults',
          fields: [
            { name: 'heroHeadline', type: 'text', defaultValue: 'Where Every Trail Tells a Story' },
            { name: 'heroSubheadline', type: 'textarea', defaultValue: "Curated wildlife encounters across Kenya's finest conservancies. Small groups. Expert guides. Unforgettable moments." },
          ],
        },
        {
          label: 'Social',
          fields: [
            {
              name: 'socialLinks',
              type: 'group',
              fields: [
                { name: 'instagram', type: 'text' },
                { name: 'facebook', type: 'text' },
                { name: 'youtube', type: 'text' },
                { name: 'tripAdvisor', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            { name: 'footerTagline', type: 'textarea', defaultValue: "Intimate wildlife encounters across East Africa's most pristine wilderness. Conservation-driven. Expert-led." },
            { name: 'conservationStatement', type: 'textarea', defaultValue: '5% of every journey protects East African wildlife' },
            {
              name: 'footerColumns',
              type: 'array',
              maxRows: 3,
              fields: [
                { name: 'heading', type: 'text', required: true },
                {
                  name: 'links',
                  type: 'array',
                  minRows: 1,
                  maxRows: 6,
                  fields: [
                    { name: 'label', type: 'text', required: true },
                    { name: 'href', type: 'text', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            { name: 'defaultMetaTitle', type: 'text', defaultValue: 'ZebraTrek Safaris — Luxury African Safari Experiences' },
            { name: 'defaultMetaDescription', type: 'textarea', defaultValue: "Intimate wildlife encounters across East Africa's most pristine wilderness. Expert-led. Conservation-driven. Unforgettable." },
            { name: 'openGraphImage', type: 'upload', relationTo: 'media' },
          ],
        },
      ],
    },
  ],
}
