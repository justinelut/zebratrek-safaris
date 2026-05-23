import type { CollectionConfig } from 'payload'

export const GalleryImages: CollectionConfig = {
  slug: 'gallery-images',
  admin: { useAsTitle: 'caption', defaultColumns: ['caption', 'category', 'featured', 'order'] },
  fields: [
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'caption', type: 'text' },
    { name: 'category', type: 'select', required: true, options: ['Wildlife', 'Landscapes', 'Camps', 'Guests', 'Vehicles'] },
    { name: 'location', type: 'text' },
    { name: 'photographer', type: 'text' },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'order', type: 'number', admin: { position: 'sidebar' } },
  ],
}
