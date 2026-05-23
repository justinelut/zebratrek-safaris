import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: { useAsTitle: 'guestName', defaultColumns: ['guestName', 'rating', 'featured', 'tripDate'] },
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    { name: 'guestName', type: 'text', required: true },
    { name: 'guestCountry', type: 'text' },
    { name: 'tripType', type: 'text' },
    { name: 'tripDate', type: 'date' },
    { name: 'rating', type: 'number', min: 1, max: 5 },
    { name: 'safari', type: 'relationship', relationTo: 'safari-packages' },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'guestImage', type: 'upload', relationTo: 'media' },
    { name: 'status', type: 'select', defaultValue: 'pending', options: ['pending', 'approved', 'rejected'], admin: { position: 'sidebar' } },
  ],
}
