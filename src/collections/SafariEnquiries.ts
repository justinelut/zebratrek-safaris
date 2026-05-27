import type { CollectionConfig } from 'payload'
import { sendEnquiryConfirmation, sendEnquiryNotification } from '@/lib/email'

export const SafariEnquiries: CollectionConfig = {
  slug: 'safari-enquiries',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'email', 'status', 'createdAt'] },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true,
  },
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        if (operation === 'create') {
          try {
            await sendEnquiryConfirmation(doc.email, doc.name)
            await sendEnquiryNotification(doc)
          } catch (err) {
            console.error('Enquiry afterChange email failed:', err)
          }
        }
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'country', type: 'text' },
    { name: 'travelDates', type: 'text' },
    { name: 'numberOfGuests', type: 'number' },
    { name: 'interestedPackages', type: 'relationship', relationTo: 'safari-packages', hasMany: true },
    { name: 'budget', type: 'select', options: ['Under $3,000', '$3,000-$5,000', '$5,000-$10,000', '$10,000-$20,000', '$20,000+'] },
    { name: 'specialRequests', type: 'textarea' },
    { name: 'howDidYouHear', type: 'select', options: ['Google', 'Instagram', 'Facebook', 'Friend/Referral', 'Travel Agent', 'Magazine', 'TripAdvisor', 'Other'] },
    { name: 'honeypot', type: 'text', admin: { hidden: true } },
    { name: 'status', type: 'select', defaultValue: 'new', options: ['new', 'contacted', 'quoted', 'booked', 'completed', 'lost'], admin: { position: 'sidebar' } },
    { name: 'internalNotes', type: 'richText', admin: { description: 'Internal team notes — not visible to guest' } },
  ],
}
