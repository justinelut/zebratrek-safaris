import type { CollectionConfig } from 'payload'

export const Seasons: CollectionConfig = {
  slug: 'seasons',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'year', 'startDate', 'endDate', 'priceMultiplier'] },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'year', type: 'number', required: true },
    { name: 'startDate', type: 'date', required: true },
    { name: 'endDate', type: 'date', required: true },
    { name: 'priceMultiplier', type: 'number', required: true, defaultValue: 1, admin: { description: '1.0 = base, 1.5 = peak (+50%), 0.8 = low (-20%)' } },
    { name: 'description', type: 'text' },
  ],
}
