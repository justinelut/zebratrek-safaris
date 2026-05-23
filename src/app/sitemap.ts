import type { MetadataRoute } from 'next'

const BASE = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export const dynamic = 'force-dynamic'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
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
  ]
}
