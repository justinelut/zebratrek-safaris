'use server'

import { getPayload } from '@/lib/payload'

type FormState = { success: boolean; error?: string }

export async function submitEnquiry(_prev: FormState, formData: FormData): Promise<FormState> {
  const honeypot = formData.get('website') as string
  if (honeypot) return { success: false, error: 'Invalid submission.' }

  const name = (formData.get('name') as string)?.trim()
  const email = (formData.get('email') as string)?.trim()
  const phone = (formData.get('phone') as string)?.trim()
  const country = (formData.get('country') as string)?.trim()
  const travelDates = (formData.get('travelDates') as string)?.trim()
  const numberOfGuests = parseInt(formData.get('numberOfGuests') as string) || undefined
  const budget = (formData.get('budget') as string) || undefined
  const specialRequests = (formData.get('specialRequests') as string)?.trim()
  const howDidYouHear = (formData.get('howDidYouHear') as string) || undefined
  const safariSlug = (formData.get('safari') as string)?.trim()

  if (!name || !email) return { success: false, error: 'Name and email are required.' }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { success: false, error: 'Please enter a valid email.' }

  try {
    const payload = await getPayload()

    const data: any = { name, email, phone, country, travelDates, numberOfGuests, budget, specialRequests, howDidYouHear }

    if (safariSlug) {
      const safari = await payload.find({ collection: 'safari-packages', where: { slug: { equals: safariSlug } }, limit: 1 })
      if (safari.docs[0]) data.interestedPackages = [safari.docs[0].id]
    }

    await payload.create({ collection: 'safari-enquiries', data, overrideAccess: true })
    return { success: true }
  } catch (err) {
    console.error('Enquiry submission failed:', err)
    return { success: false, error: 'Something went wrong. Please try again or email us directly.' }
  }
}
