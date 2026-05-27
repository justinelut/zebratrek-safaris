import type { CollectionConfig } from 'payload'
import { sendBookingConfirmation, sendBookingNotification } from '@/lib/email'

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  admin: { useAsTitle: 'bookingRef', defaultColumns: ['bookingRef', 'guestName', 'safari', 'status', 'startDate'] },
  access: { read: ({ req: { user } }) => Boolean(user), create: ({ req: { user } }) => Boolean(user) },
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation === 'create') {
          try {
            const safari = doc.safari && typeof doc.safari === 'object' ? doc.safari : await req.payload.findByID({ collection: 'safari-packages', id: doc.safari, overrideAccess: true })
            const safariTitle = safari?.title || 'Safari'
            await sendBookingConfirmation(doc.guestEmail, doc.guestName, doc.bookingRef, safariTitle)
            await sendBookingNotification({ bookingRef: doc.bookingRef, guestName: doc.guestName, guestEmail: doc.guestEmail, safariTitle, startDate: doc.startDate, endDate: doc.endDate, numberOfAdults: doc.numberOfAdults, accommodation: doc.accommodation })
          } catch (err) {
            console.error('Booking afterChange email failed:', err)
          }
        }
      },
    ],
  },
  fields: [
    { name: 'bookingRef', type: 'text', required: true, unique: true, admin: { readOnly: true, position: 'sidebar' } },
    { name: 'status', type: 'select', defaultValue: 'enquiry', options: ['enquiry', 'quoted', 'deposit-paid', 'confirmed', 'in-progress', 'completed', 'cancelled', 'refunded'], admin: { position: 'sidebar' } },
    { name: 'assignedTo', type: 'relationship', relationTo: 'users', admin: { position: 'sidebar' } },
    { name: 'source', type: 'select', defaultValue: 'website', options: ['website', 'whatsapp', 'email', 'referral', 'agent'], admin: { position: 'sidebar' } },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Guest',
          fields: [
            { name: 'guestName', type: 'text', required: true },
            { name: 'guestEmail', type: 'email', required: true },
            { name: 'guestPhone', type: 'text' },
            { name: 'guestCountry', type: 'text' },
            { name: 'passportName', type: 'text' },
            { name: 'dietaryRequirements', type: 'text' },
            { name: 'medicalConditions', type: 'textarea' },
          ],
        },
        {
          label: 'Trip',
          fields: [
            { name: 'safari', type: 'relationship', relationTo: 'safari-packages', required: true },
            { name: 'destination', type: 'relationship', relationTo: 'destinations' },
            { name: 'startDate', type: 'date', required: true },
            { name: 'endDate', type: 'date', required: true },
            { name: 'numberOfAdults', type: 'number', required: true, min: 1 },
            { name: 'numberOfChildren', type: 'number', defaultValue: 0 },
            { name: 'childrenAges', type: 'array', fields: [{ name: 'age', type: 'number' }] },
            { name: 'accommodation', type: 'select', options: ['Standard', 'Luxury', 'Ultra-Luxury'] },
            { name: 'extras', type: 'array', fields: [{ name: 'extra', type: 'select', options: ['Hot Air Balloon', 'Photography Guide', 'Private Vehicle', 'Bush Dinner', 'Spa Treatment', 'Walking Safari', 'Night Drive', 'Cultural Visit'] }] },
          ],
        },
        {
          label: 'Pricing',
          fields: [
            { name: 'basePrice', type: 'number' },
            { name: 'extrasTotal', type: 'number' },
            { name: 'discount', type: 'number' },
            { name: 'discountReason', type: 'text' },
            { name: 'totalPrice', type: 'number' },
            { name: 'currency', type: 'select', defaultValue: 'USD', options: ['USD', 'EUR', 'GBP', 'KES'] },
            { name: 'depositAmount', type: 'number' },
            { name: 'depositPaid', type: 'checkbox', defaultValue: false },
            { name: 'depositReference', type: 'text' },
            { name: 'balanceDue', type: 'date' },
            { name: 'balancePaidDate', type: 'date' },
            { name: 'balanceReference', type: 'text' },
            { name: 'paymentMethod', type: 'select', options: ['Bank Transfer', 'Card', 'PayPal'] },
            { name: 'invoiceSent', type: 'checkbox', defaultValue: false },
            { name: 'receiptSent', type: 'checkbox', defaultValue: false },
          ],
        },
        {
          label: 'Timeline',
          fields: [
            { name: 'timeline', type: 'array', fields: [
              { name: 'date', type: 'date', required: true },
              { name: 'event', type: 'text', required: true },
              { name: 'note', type: 'textarea' },
            ]},
            { name: 'documents', type: 'array', fields: [
              { name: 'document', type: 'upload', relationTo: 'media', required: true },
              { name: 'label', type: 'text' },
            ]},
          ],
        },
        {
          label: 'Notes',
          fields: [
            { name: 'specialRequests', type: 'textarea' },
            { name: 'internalNotes', type: 'richText' },
          ],
        },
      ],
    },
  ],
}
