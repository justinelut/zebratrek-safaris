import type { MetadataRoute } from 'next'
import { getPayload } from '@/lib/payload'

const BASE = process.env.NEXT_PUBLIC_SERVER_URL || 'https://zebratrek.com'

export const revalidate = 3600 // ISR: revalidate sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/safaris`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/destinations`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/about`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/team`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/conservation`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/gallery`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/journal`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/contact`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/plan-your-safari`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/when-to-visit`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/what-to-expect`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/faq`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/share-your-experience`, changeFrequency: 'yearly', priority: 0.4 },
  ]

  try {
    const payload = await getPayload()

    const [safaris, destinations, posts, pages] = await Promise.all([
      payload.find({ collection: 'safari-packages', where: { status: { equals: 'published' } }, limit: 200, depth: 0 }),
      payload.find({ collection: 'destinations', limit: 200, depth: 0 }),
      payload.find({ collection: 'journal-posts', where: { _status: { equals: 'published' } }, limit: 500, depth: 0 }),
      payload.find({ collection: 'pages', limit: 100, depth: 0 }),
    ])

    const dynamic: MetadataRoute.Sitemap = [
      ...safaris.docs.map((s: any) => ({ url: `${BASE}/safaris/${s.slug}`, lastModified: s.updatedAt, changeFrequency: 'weekly' as const, priority: 0.8 })),
      ...safaris.docs.map((s: any) => ({ url: `${BASE}/book/${s.slug}`, lastModified: s.updatedAt, changeFrequency: 'monthly' as const, priority: 0.6 })),
      ...destinations.docs.map((d: any) => ({ url: `${BASE}/destinations/${d.slug}`, lastModified: d.updatedAt, changeFrequency: 'monthly' as const, priority: 0.7 })),
      ...posts.docs.map((p: any) => ({ url: `${BASE}/journal/${p.slug}`, lastModified: p.updatedAt, changeFrequency: 'monthly' as const, priority: 0.6 })),
      ...pages.docs.map((p: any) => ({ url: `${BASE}/${p.slug}`, lastModified: p.updatedAt, changeFrequency: 'yearly' as const, priority: 0.3 })),
    ]

    return [...staticPages, ...dynamic]
  } catch (e) {
    console.error('Sitemap generation error:', e)
    return staticPages
  }
}
