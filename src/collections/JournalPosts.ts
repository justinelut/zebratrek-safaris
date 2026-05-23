import type { CollectionConfig } from 'payload'

export const JournalPosts: CollectionConfig = {
  slug: 'journal-posts',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'category', 'featured', 'publishedAt'] },
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
    { name: 'summary', type: 'textarea', required: true },
    { name: 'heroImage', type: 'upload', relationTo: 'media', required: true },
    { name: 'body', type: 'richText', required: true },
    { name: 'category', type: 'select', required: true, options: ['Wildlife', 'Travel Tips', 'Conservation', 'Behind the Scenes', 'Guest Stories'] },
    { name: 'author', type: 'relationship', relationTo: 'users' },
    { name: 'publishedAt', type: 'date', admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } } },
    { name: 'readTime', type: 'number', admin: { position: 'sidebar', description: 'Minutes' } },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
  ],
}
