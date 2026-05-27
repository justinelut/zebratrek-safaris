'use server'

import { getPayload } from '@/lib/payload'
import { sendTestimonialNotification } from '@/lib/email'

type FormState = { success: boolean; error?: string }

export async function submitTestimonial(_prev: FormState, formData: FormData): Promise<FormState> {
  const guestName = (formData.get('guestName') as string)?.trim()
  const guestCountry = (formData.get('guestCountry') as string)?.trim()
  const tripType = (formData.get('tripType') as string)?.trim()
  const rating = parseInt(formData.get('rating') as string) || 5
  const quote = (formData.get('quote') as string)?.trim()

  if (!guestName || !quote) return { success: false, error: 'Name and your experience are required.' }

  try {
    const payload = await getPayload()
    await payload.create({
      collection: 'testimonials',
      data: { guestName, guestCountry, tripType, rating, quote, status: 'pending' },
      overrideAccess: true,
    })

    try {
      await sendTestimonialNotification(guestName, quote)
    } catch (emailErr) {
      console.error('Testimonial notification email failed:', emailErr)
    }

    return { success: true }
  } catch (err) {
    console.error('Testimonial submission failed:', err)
    return { success: false, error: 'Something went wrong. Please try again.' }
  }
}
