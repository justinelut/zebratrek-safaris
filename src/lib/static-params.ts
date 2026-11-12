import { getPayload } from '@/lib/payload'

type SlugCollection = 'safari-packages' | 'destinations' | 'journal-posts' | 'services' | 'pages'

export async function getStaticSlugs(collection: SlugCollection, where?: Record<string, unknown>) {
  const payload = await getPayload()
  const result = await payload.find({
    collection: collection as any,
    ...(where ? { where: where as any } : {}),
    limit: 1000,
    depth: 0,
    pagination: false,
  })

  return result.docs.flatMap((doc: any) => doc.slug ? [{ slug: String(doc.slug) }] : [])
}
