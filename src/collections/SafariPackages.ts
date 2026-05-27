import type { CollectionConfig } from 'payload'

export const SafariPackages: CollectionConfig = {
  slug: 'safari-packages',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'category', 'status', 'featured', 'priceFrom'] },
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
    { name: 'status', type: 'select', defaultValue: 'draft', options: ['draft', 'published'], admin: { position: 'sidebar' } },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'tagline', type: 'text' },
    { name: 'heroImage', type: 'upload', relationTo: 'media', required: true },
    {
      type: 'row',
      fields: [
        { name: 'duration', type: 'text', admin: { width: '25%' } },
        { name: 'groupSize', type: 'text', admin: { width: '25%' } },
        { name: 'priceFrom', type: 'number', admin: { width: '25%' } },
        { name: 'currency', type: 'select', defaultValue: 'USD', options: ['USD', 'EUR', 'GBP', 'KES'], admin: { width: '25%' } },
      ],
    },
    { name: 'category', type: 'select', options: ['Classic Safari', 'Luxury Safari', 'Adventure Safari', 'Family Safari', 'Photography Safari', 'Honeymoon Safari', 'Day Safari', 'Beach Holiday', 'Airport Transfer', 'Group Transport', 'Air Safari', 'City Excursion', 'Bush Tour'] },
    { name: 'difficulty', type: 'select', options: ['Easy', 'Moderate', 'Challenging'] },
    { name: 'bestSeason', type: 'text' },
    { name: 'destinations', type: 'relationship', relationTo: 'destinations', hasMany: true },
    { name: 'accommodation', type: 'textarea', admin: { description: 'Describe the lodges/camps included' } },
    { name: 'description', type: 'richText' },
    {
      name: 'itinerary',
      type: 'array',
      fields: [
        { name: 'day', type: 'number', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'included',
      type: 'array',
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    {
      name: 'excluded',
      type: 'array',
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    {
      name: 'highlights',
      type: 'array',
      fields: [{ name: 'highlight', type: 'text', required: true }],
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text' },
      ],
    },
  ],
}
