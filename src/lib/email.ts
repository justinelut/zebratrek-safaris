import { Resend } from 'resend'

const FROM = process.env.EMAIL_FROM || 'ZebraTrek Safaris <hello@zebratrek.com>'
const TEAM_EMAIL = process.env.TEAM_EMAIL || 'team@zebratrek.com'

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  return new Resend(key)
}

export async function sendEnquiryConfirmation(to: string, name: string) {
  const resend = getResend()
  if (!resend) return
  await resend.emails.send({
    from: FROM,
    to,
    subject: 'We received your safari enquiry',
    html: `
      <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="font-size: 24px; font-weight: 400; color: #1A2E1A;">Thank you, ${name}</h1>
        <p style="color: #6B7B6B; line-height: 1.7; margin-top: 16px;">
          We've received your enquiry and our team is already reviewing it. You can expect a personalised response within 24 hours.
        </p>
        <p style="color: #6B7B6B; line-height: 1.7;">
          In the meantime, feel free to explore our <a href="${process.env.NEXT_PUBLIC_SERVER_URL}/safaris" style="color: #2D5A27;">safari experiences</a> or reach us on WhatsApp for immediate questions.
        </p>
        <hr style="border: none; border-top: 1px solid #D4CFC4; margin: 32px 0;" />
        <p style="font-size: 12px; color: #A89E8E;">ZebraTrek Safaris · Nairobi, Kenya</p>
      </div>
    `,
  })
}

export async function sendEnquiryNotification(enquiry: { name: string; email: string; phone?: string; country?: string; travelDates?: string; budget?: string; specialRequests?: string }) {
  const resend = getResend()
  if (!resend) return
  await resend.emails.send({
    from: FROM,
    to: TEAM_EMAIL,
    subject: `New enquiry from ${enquiry.name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; padding: 20px;">
        <h2 style="color: #1A2E1A;">New Safari Enquiry</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr><td style="padding: 8px 0; color: #6B7B6B; width: 120px;">Name</td><td style="padding: 8px 0;">${enquiry.name}</td></tr>
          <tr><td style="padding: 8px 0; color: #6B7B6B;">Email</td><td style="padding: 8px 0;">${enquiry.email}</td></tr>
          ${enquiry.phone ? `<tr><td style="padding: 8px 0; color: #6B7B6B;">Phone</td><td style="padding: 8px 0;">${enquiry.phone}</td></tr>` : ''}
          ${enquiry.country ? `<tr><td style="padding: 8px 0; color: #6B7B6B;">Country</td><td style="padding: 8px 0;">${enquiry.country}</td></tr>` : ''}
          ${enquiry.travelDates ? `<tr><td style="padding: 8px 0; color: #6B7B6B;">Dates</td><td style="padding: 8px 0;">${enquiry.travelDates}</td></tr>` : ''}
          ${enquiry.budget ? `<tr><td style="padding: 8px 0; color: #6B7B6B;">Budget</td><td style="padding: 8px 0;">${enquiry.budget}</td></tr>` : ''}
          ${enquiry.specialRequests ? `<tr><td style="padding: 8px 0; color: #6B7B6B;">Requests</td><td style="padding: 8px 0;">${enquiry.specialRequests}</td></tr>` : ''}
        </table>
        <p style="margin-top: 24px;"><a href="${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/safari-enquiries" style="color: #2D5A27;">View in admin →</a></p>
      </div>
    `,
  })
}

export async function sendBookingConfirmation(to: string, name: string, ref: string, safariTitle: string) {
  const resend = getResend()
  if (!resend) return
  await resend.emails.send({
    from: FROM,
    to,
    subject: `Booking request received — ${ref}`,
    html: `
      <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="font-size: 24px; font-weight: 400; color: #1A2E1A;">Booking Request Received</h1>
        <p style="color: #6B7B6B; line-height: 1.7; margin-top: 16px;">
          Thank you, ${name}. We've received your booking request for <strong>${safariTitle}</strong>.
        </p>
        <p style="background: #F0EDE6; padding: 16px; border-radius: 4px; margin: 24px 0;">
          <strong>Reference:</strong> ${ref}<br/>
          Please keep this for your records.
        </p>
        <p style="color: #6B7B6B; line-height: 1.7;">
          Our team will prepare a detailed, personalised quote and send it to you within 24 hours. This will include accommodation options, pricing breakdown, and a suggested itinerary.
        </p>
        <hr style="border: none; border-top: 1px solid #D4CFC4; margin: 32px 0;" />
        <p style="font-size: 12px; color: #A89E8E;">ZebraTrek Safaris · Nairobi, Kenya</p>
      </div>
    `,
  })
}

export async function sendBookingNotification(booking: { bookingRef: string; guestName: string; guestEmail: string; safariTitle: string; startDate: string; endDate: string; numberOfAdults: number; accommodation?: string }) {
  const resend = getResend()
  if (!resend) return
  await resend.emails.send({
    from: FROM,
    to: TEAM_EMAIL,
    subject: `New booking request: ${booking.bookingRef} — ${booking.guestName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; padding: 20px;">
        <h2 style="color: #1A2E1A;">New Booking Request</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr><td style="padding: 8px 0; color: #6B7B6B; width: 130px;">Reference</td><td style="padding: 8px 0; font-weight: bold;">${booking.bookingRef}</td></tr>
          <tr><td style="padding: 8px 0; color: #6B7B6B;">Guest</td><td style="padding: 8px 0;">${booking.guestName} (${booking.guestEmail})</td></tr>
          <tr><td style="padding: 8px 0; color: #6B7B6B;">Safari</td><td style="padding: 8px 0;">${booking.safariTitle}</td></tr>
          <tr><td style="padding: 8px 0; color: #6B7B6B;">Dates</td><td style="padding: 8px 0;">${booking.startDate} → ${booking.endDate}</td></tr>
          <tr><td style="padding: 8px 0; color: #6B7B6B;">Guests</td><td style="padding: 8px 0;">${booking.numberOfAdults} adults</td></tr>
          <tr><td style="padding: 8px 0; color: #6B7B6B;">Accommodation</td><td style="padding: 8px 0;">${booking.accommodation || 'Not specified'}</td></tr>
        </table>
        <p style="margin-top: 24px;"><a href="${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/bookings" style="color: #2D5A27;">View in admin →</a></p>
      </div>
    `,
  })
}
