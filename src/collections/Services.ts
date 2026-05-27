import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'order', 'featured'] },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
    { name: 'featured', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
    { name: 'icon', type: 'text', admin: { description: 'Lucide icon name (e.g. "Plane", "Bus", "Palmtree")' } },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'shortDescription', type: 'textarea', required: true },
    { name: 'body', type: 'richText' },
    { name: 'highlights', type: 'array', fields: [{ name: 'text', type: 'text' }] },
    { name: 'ctaText', type: 'text', defaultValue: 'Enquire Now' },
    { name: 'ctaLink', type: 'text', defaultValue: '/contact' },
  ],
}
