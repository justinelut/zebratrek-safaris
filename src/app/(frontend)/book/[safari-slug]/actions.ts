'use server'

import { getPayload } from '@/lib/payload'

type BookingData = {
  safariId: string
  startDate: string
  endDate: string
  numberOfAdults: string
  numberOfChildren: string
  guestName: string
  guestEmail: string
  guestPhone: string
  guestCountry: string
  accommodation: string
  extras: string[]
  specialRequests: string
}

export async function submitBookingRequest(data: BookingData): Promise<{ success: boolean; ref?: string; error?: string }> {
  if (!data.guestName || !data.guestEmail || !data.startDate || !data.endDate) {
    return { success: false, error: 'Please fill in all required fields.' }
  }

  try {
    const payload = await getPayload()

    const year = new Date().getFullYear()
    const count = await payload.find({ collection: 'bookings', limit: 0, overrideAccess: true })
    const ref = `ZTS-${year}-${String(count.totalDocs + 1).padStart(3, '0')}`

    await payload.create({
      collection: 'bookings',
      overrideAccess: true,
      data: {
        bookingRef: ref,
        status: 'enquiry',
        source: 'website',
        safari: Number(data.safariId),
        startDate: data.startDate,
        endDate: data.endDate,
        numberOfAdults: parseInt(data.numberOfAdults) || 2,
        numberOfChildren: parseInt(data.numberOfChildren) || 0,
        guestName: data.guestName,
        guestEmail: data.guestEmail,
        guestPhone: data.guestPhone,
        guestCountry: data.guestCountry,
        accommodation: data.accommodation as any,
        extras: data.extras.map((extra) => ({ extra })) as any,
        specialRequests: data.specialRequests,
        timeline: [{ date: new Date().toISOString(), event: 'Booking request submitted via website' }],
      },
    })

    return { success: true, ref }
  } catch (err: any) {
    console.error('Booking failed:', err)
    console.error('Booking error stringified:', JSON.stringify(err, Object.getOwnPropertyNames(err), 2))
    console.error('Booking error message:', err?.message)
    console.error('Booking error data:', err?.data)
    return { success: false, error: err?.message ? `Booking failed: ${err.message}` : 'Something went wrong. Please try again or contact us directly.' }
  }
}
