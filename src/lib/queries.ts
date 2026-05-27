import { getPayload } from './payload'
import type { Setting, Homepage, AboutPage, ContactPage, SafarisPage, DestinationsPage, ConservationPage, PlanYourSafariPage, WhenToVisitPage, WhatToExpectPage, GalleryPage, JournalPage, FaqPage, SafariPackage, Destination, TeamMember, Testimonial, JournalPost, GalleryImage, Page, Availability } from '@/payload-types'

// ─── Globals ─────────────────────────────────────────────

export async function getSiteSettings(): Promise<Setting> {
  const payload = await getPayload()
  return payload.findGlobal({ slug: 'settings' })
}

export async function getHomepage(): Promise<Homepage> {
  const payload = await getPayload()
  return payload.findGlobal({ slug: 'homepage' })
}

export async function getAboutPage(): Promise<AboutPage> {
  const payload = await getPayload()
  return payload.findGlobal({ slug: 'about-page' })
}

export async function getContactPage(): Promise<ContactPage> {
  const payload = await getPayload()
  return payload.findGlobal({ slug: 'contact-page' })
}

export async function getSafarisPage(): Promise<SafarisPage> {
  const payload = await getPayload()
  return payload.findGlobal({ slug: 'safaris-page' })
}

export async function getDestinationsPage(): Promise<DestinationsPage> {
  const payload = await getPayload()
  return payload.findGlobal({ slug: 'destinations-page' })
}

export async function getConservationPage(): Promise<ConservationPage> {
  const payload = await getPayload()
  return payload.findGlobal({ slug: 'conservation-page' })
}

export async function getPlanYourSafariPage(): Promise<PlanYourSafariPage> {
  const payload = await getPayload()
  return payload.findGlobal({ slug: 'plan-your-safari-page' })
}

export async function getWhenToVisitPage(): Promise<WhenToVisitPage> {
  const payload = await getPayload()
  return payload.findGlobal({ slug: 'when-to-visit-page' })
}

export async function getWhatToExpectPage(): Promise<WhatToExpectPage> {
  const payload = await getPayload()
  return payload.findGlobal({ slug: 'what-to-expect-page' })
}

export async function getGalleryPage(): Promise<GalleryPage> {
  const payload = await getPayload()
  return payload.findGlobal({ slug: 'gallery-page' })
}

export async function getJournalPage(): Promise<JournalPage> {
  const payload = await getPayload()
  return payload.findGlobal({ slug: 'journal-page' })
}

export async function getFAQPage(): Promise<FaqPage> {
  const payload = await getPayload()
  return payload.findGlobal({ slug: 'faq-page' })
}

// ─── Collections ─────────────────────────────────────────

type QueryOptions = { featured?: boolean; limit?: number; category?: string; page?: number }

export async function getSafaris(opts: QueryOptions = {}): Promise<{ docs: SafariPackage[]; totalPages: number }> {
  const payload = await getPayload()
  const where: any = { status: { equals: 'published' } }
  if (opts.featured) where.featured = { equals: true }
  if (opts.category) where.category = { equals: opts.category }
  const result = await payload.find({ collection: 'safari-packages', where, limit: opts.limit || 50, page: opts.page || 1, depth: 1 })
  return { docs: result.docs, totalPages: result.totalPages }
}

export async function getSafariBySlug(slug: string): Promise<SafariPackage | null> {
  const payload = await getPayload()
  const result = await payload.find({ collection: 'safari-packages', where: { slug: { equals: slug } }, limit: 1, depth: 2 })
  return result.docs[0] || null
}

export async function getDestinations(opts: QueryOptions = {}): Promise<{ docs: Destination[]; totalPages: number }> {
  const payload = await getPayload()
  const where: any = {}
  if (opts.featured) where.featured = { equals: true }
  if (opts.category) where.country = { equals: opts.category }
  const result = await payload.find({ collection: 'destinations', where, limit: opts.limit || 12, page: opts.page || 1, depth: 1 })
  return { docs: result.docs, totalPages: result.totalPages }
}

export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  const payload = await getPayload()
  const result = await payload.find({ collection: 'destinations', where: { slug: { equals: slug } }, limit: 1, depth: 2 })
  return result.docs[0] || null
}

export async function getTeamMembers(opts: QueryOptions = {}): Promise<TeamMember[]> {
  const payload = await getPayload()
  const where: any = {}
  if (opts.featured) where.featured = { equals: true }
  const result = await payload.find({ collection: 'team-members', where, limit: opts.limit || 20, sort: 'order', depth: 1 })
  return result.docs
}

export async function getTestimonials(opts: QueryOptions = {}): Promise<Testimonial[]> {
  const payload = await getPayload()
  const where: any = { status: { equals: 'approved' } }
  if (opts.featured) where.featured = { equals: true }
  const result = await payload.find({ collection: 'testimonials', where, limit: opts.limit || 10, depth: 1 })
  return result.docs
}

export async function getJournalPosts(opts: QueryOptions = {}): Promise<{ docs: JournalPost[]; totalPages: number }> {
  const payload = await getPayload()
  const where: any = { _status: { equals: 'published' } }
  if (opts.featured) where.featured = { equals: true }
  if (opts.category) where.category = { equals: opts.category }
  const result = await payload.find({ collection: 'journal-posts', where, limit: opts.limit || 9, page: opts.page || 1, sort: '-publishedAt', depth: 1 })
  return { docs: result.docs, totalPages: result.totalPages }
}

export async function getJournalPostBySlug(slug: string): Promise<JournalPost | null> {
  const payload = await getPayload()
  const result = await payload.find({ collection: 'journal-posts', where: { slug: { equals: slug } }, limit: 1, depth: 2 })
  return result.docs[0] || null
}

export async function getGalleryImages(opts: QueryOptions = {}): Promise<GalleryImage[]> {
  const payload = await getPayload()
  const where: any = {}
  if (opts.featured) where.featured = { equals: true }
  if (opts.category) where.category = { equals: opts.category }
  const result = await payload.find({ collection: 'gallery-images', where, limit: opts.limit || 50, sort: 'order', depth: 1 })
  return result.docs
}

export async function getPage(slug: string): Promise<Page | null> {
  const payload = await getPayload()
  const result = await payload.find({ collection: 'pages', where: { slug: { equals: slug } }, limit: 1, depth: 1 })
  return result.docs[0] || null
}

export async function getAvailability(safariId: string, month?: string): Promise<Availability[]> {
  const payload = await getPayload()
  const where: any = { safari: { equals: safariId } }
  if (month) {
    const start = new Date(`${month}-01`)
    const end = new Date(start.getFullYear(), start.getMonth() + 1, 0)
    where.date = { greater_than_equal: start.toISOString(), less_than_equal: end.toISOString() }
  }
  const result = await payload.find({ collection: 'availability', where, limit: 60, sort: 'date' })
  return result.docs
}
