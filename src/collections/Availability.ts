import type { CollectionConfig } from 'payload'

export const Availability: CollectionConfig = {
  slug: 'availability',
  admin: { useAsTitle: 'date', defaultColumns: ['safari', 'date', 'status', 'spotsBooked', 'spotsTotal'] },
  access: { read: () => true, create: ({ req: { user } }) => Boolean(user) },
  fields: [
    { name: 'safari', type: 'relationship', relationTo: 'safari-packages', required: true },
    { name: 'date', type: 'date', required: true },
    { name: 'spotsTotal', type: 'number', required: true, defaultValue: 8 },
    { name: 'spotsBooked', type: 'number', defaultValue: 0 },
    { name: 'status', type: 'select', defaultValue: 'available', options: ['available', 'limited', 'full', 'blocked'] },
    { name: 'priceOverride', type: 'number', admin: { description: 'Override base price for this date (leave empty for default)' } },
    { name: 'notes', type: 'text' },
  ],
}
