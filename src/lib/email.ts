import { Resend } from 'resend'
import { getPayload } from './payload'

const FROM = process.env.EMAIL_FROM || 'ZebraTrek Safaris <bookings@zebratreksafaris.com>'
const FALLBACK_TEAM_EMAIL = process.env.TEAM_EMAIL || 'info@zebratreksafaris.com'

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  return new Resend(key)
}

/** Fetches the configured contact email from Payload Settings global to use as reply-to. */
async function getReplyTo(): Promise<string | undefined> {
  try {
    const payload = await getPayload()
    const settings = await payload.findGlobal({ slug: 'settings' })
    return (settings as any)?.email || undefined
  } catch {
    return undefined
  }
}

/** Returns email addresses of all admin users in the dashboard. */
async function getAdminEmails(): Promise<string[]> {
  try {
    const payload = await getPayload()
    const result = await payload.find({ collection: 'users', limit: 100, overrideAccess: true })
    const emails = result.docs.map((u: any) => u.email).filter(Boolean)
    return emails.length > 0 ? emails : [FALLBACK_TEAM_EMAIL]
  } catch {
    return [FALLBACK_TEAM_EMAIL]
  }
}

export async function sendEnquiryConfirmation(to: string, name: string) {
  const resend = getResend()
  if (!resend) return
  const replyTo = await getReplyTo()
  await resend.emails.send({
    replyTo,
    from: FROM,
    to,
    subject: 'We received your safari enquiry',
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="font-size: 24px; font-weight: 400; color: #1A1208;">Thank you, ${name}</h1>
        <p style="color: #6B5A3A; line-height: 1.7; margin-top: 16px;">
          We've received your enquiry and our team is already reviewing it. You can expect a personalised response within 24 hours.
        </p>
        <p style="color: #6B5A3A; line-height: 1.7;">
          In the meantime, feel free to explore our <a href="${process.env.NEXT_PUBLIC_SERVER_URL}/safaris" style="color: #B8860B;">safari experiences</a> or reach us on WhatsApp for immediate questions.
        </p>
        <hr style="border: none; border-top: 1px solid #C4B89A; margin: 32px 0;" />
        <p style="font-size: 12px; color: #C4B89A;">ZebraTrek Safaris · Mombasa, Kenya</p>
      </div>
    `,
  })
}

export async function sendEnquiryNotification(enquiry: { name: string; email: string; phone?: string; country?: string; travelDates?: string; budget?: string; specialRequests?: string }) {
  const resend = getResend()
  if (!resend) return
  const adminEmails = await getAdminEmails()
  // Admin-facing — reply-to is the customer so admin can reply directly to them
  await resend.emails.send({
    replyTo: enquiry.email,
    from: FROM,
    to: adminEmails,
    subject: `New enquiry from ${enquiry.name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; padding: 20px;">
        <h2 style="color: #1A1208;">New Safari Enquiry</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr><td style="padding: 8px 0; color: #6B5A3A; width: 120px;">Name</td><td style="padding: 8px 0;">${enquiry.name}</td></tr>
          <tr><td style="padding: 8px 0; color: #6B5A3A;">Email</td><td style="padding: 8px 0;">${enquiry.email}</td></tr>
          ${enquiry.phone ? `<tr><td style="padding: 8px 0; color: #6B5A3A;">Phone</td><td style="padding: 8px 0;">${enquiry.phone}</td></tr>` : ''}
          ${enquiry.country ? `<tr><td style="padding: 8px 0; color: #6B5A3A;">Country</td><td style="padding: 8px 0;">${enquiry.country}</td></tr>` : ''}
          ${enquiry.travelDates ? `<tr><td style="padding: 8px 0; color: #6B5A3A;">Dates</td><td style="padding: 8px 0;">${enquiry.travelDates}</td></tr>` : ''}
          ${enquiry.budget ? `<tr><td style="padding: 8px 0; color: #6B5A3A;">Budget</td><td style="padding: 8px 0;">${enquiry.budget}</td></tr>` : ''}
          ${enquiry.specialRequests ? `<tr><td style="padding: 8px 0; color: #6B5A3A;">Requests</td><td style="padding: 8px 0;">${enquiry.specialRequests}</td></tr>` : ''}
        </table>
        <p style="margin-top: 24px;"><a href="${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/safari-enquiries" style="color: #B8860B;">View in admin →</a></p>
      </div>
    `,
  })
}

export async function sendBookingConfirmation(to: string, name: string, ref: string, safariTitle: string) {
  const resend = getResend()
  if (!resend) return
  const replyTo = await getReplyTo()
  await resend.emails.send({
    replyTo,
    from: FROM,
    to,
    subject: `Booking request received — ${ref}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="font-size: 24px; font-weight: 400; color: #1A1208;">Booking Request Received</h1>
        <p style="color: #6B5A3A; line-height: 1.7; margin-top: 16px;">
          Thank you, ${name}. We've received your booking request for <strong>${safariTitle}</strong>.
        </p>
        <p style="background: #eff3cf; padding: 16px; border-radius: 4px; margin: 24px 0;">
          <strong>Reference:</strong> ${ref}<br/>
          Please keep this for your records.
        </p>
        <p style="color: #6B5A3A; line-height: 1.7;">
          Our team will prepare a detailed, personalised quote and send it to you within 24 hours. This will include accommodation options, pricing breakdown, and a suggested itinerary.
        </p>
        <hr style="border: none; border-top: 1px solid #C4B89A; margin: 32px 0;" />
        <p style="font-size: 12px; color: #C4B89A;">ZebraTrek Safaris · Mombasa, Kenya</p>
      </div>
    `,
  })
}

export async function sendBookingNotification(booking: { bookingRef: string; guestName: string; guestEmail: string; safariTitle: string; startDate: string; endDate: string; numberOfAdults: number; accommodation?: string }) {
  const resend = getResend()
  if (!resend) return
  const adminEmails = await getAdminEmails()
  // Admin-facing — reply-to is the guest so admin can reply directly to them
  await resend.emails.send({
    replyTo: booking.guestEmail,
    from: FROM,
    to: adminEmails,
    subject: `New booking request: ${booking.bookingRef} — ${booking.guestName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; padding: 20px;">
        <h2 style="color: #1A1208;">New Booking Request</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr><td style="padding: 8px 0; color: #6B5A3A; width: 130px;">Reference</td><td style="padding: 8px 0; font-weight: bold;">${booking.bookingRef}</td></tr>
          <tr><td style="padding: 8px 0; color: #6B5A3A;">Guest</td><td style="padding: 8px 0;">${booking.guestName} (${booking.guestEmail})</td></tr>
          <tr><td style="padding: 8px 0; color: #6B5A3A;">Safari</td><td style="padding: 8px 0;">${booking.safariTitle}</td></tr>
          <tr><td style="padding: 8px 0; color: #6B5A3A;">Dates</td><td style="padding: 8px 0;">${booking.startDate} → ${booking.endDate}</td></tr>
          <tr><td style="padding: 8px 0; color: #6B5A3A;">Guests</td><td style="padding: 8px 0;">${booking.numberOfAdults} adults</td></tr>
          <tr><td style="padding: 8px 0; color: #6B5A3A;">Accommodation</td><td style="padding: 8px 0;">${booking.accommodation || 'Not specified'}</td></tr>
        </table>
        <p style="margin-top: 24px;"><a href="${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/bookings" style="color: #B8860B;">View in admin →</a></p>
      </div>
    `,
  })
}

export async function sendTestimonialNotification(guestName: string, quote: string) {
  const resend = getResend()
  if (!resend) return
  const adminEmails = await getAdminEmails()
  const replyTo = await getReplyTo()
  await resend.emails.send({
    replyTo,
    from: FROM,
    to: adminEmails,
    subject: `New testimonial from ${guestName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; padding: 20px;">
        <h2 style="color: #1A1208;">New Testimonial Submitted</h2>
        <p style="color: #6B5A3A;"><strong>${guestName}</strong> shared their experience:</p>
        <blockquote style="border-left: 3px solid #B8860B; padding-left: 16px; margin: 16px 0; color: #6B5A3A; font-style: italic;">${quote}</blockquote>
        <p style="margin-top: 24px;"><a href="${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/testimonials" style="color: #B8860B;">Review in admin →</a></p>
      </div>
    `,
  })
}
