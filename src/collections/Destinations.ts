import type { CollectionConfig } from 'payload'

export const Destinations: CollectionConfig = {
  slug: 'destinations',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'country', 'featured'] },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'tagline', type: 'text' },
    { name: 'country', type: 'select', options: ['Kenya', 'Tanzania', 'Uganda', 'Rwanda'], defaultValue: 'Kenya' },
    { name: 'heroImage', type: 'upload', relationTo: 'media', required: true },
    { name: 'summary', type: 'textarea' },
    { name: 'body', type: 'richText' },
    { name: 'bestTimeToVisit', type: 'text' },
    { name: 'location', type: 'text' },
    {
      name: 'wildlife',
      type: 'array',
      fields: [
        { name: 'animal', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text' },
      ],
    },
    { name: 'relatedPackages', type: 'relationship', relationTo: 'safari-packages', hasMany: true },
  ],
}
