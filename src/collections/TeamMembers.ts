import type { CollectionConfig } from 'payload'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'role', 'featured', 'order'] },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'text' },
    { name: 'bio', type: 'textarea' },
    { name: 'portrait', type: 'upload', relationTo: 'media' },
    { name: 'speciality', type: 'text' },
    { name: 'yearsExperience', type: 'number' },
    { name: 'languages', type: 'array', fields: [{ name: 'language', type: 'text', required: true }] },
    { name: 'certifications', type: 'array', fields: [{ name: 'certification', type: 'text', required: true }] },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'order', type: 'number', admin: { position: 'sidebar' } },
  ],
}
