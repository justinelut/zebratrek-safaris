import { notFound } from 'next/navigation'
import { getPage } from '@/lib/queries'
import { generatePageMetadata } from '@/lib/seo'
import { RichText } from '@/components/RichText'
import { getStaticSlugs } from '@/lib/static-params'

export const dynamicParams = false

type Params = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const reserved = new Set([
    'about', 'book', 'contact', 'conservation', 'destinations', 'faq', 'gallery', 'journal',
    'plan-your-safari', 'safaris', 'services', 'share-your-experience', 'team', 'what-to-expect', 'when-to-visit',
  ])
  const slugs = await getStaticSlugs('pages')
  return slugs.filter(({ slug }) => !reserved.has(slug))
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params
  const page = await getPage(slug)
  if (!page) return {}
  return generatePageMetadata(page as any, { title: `${page.title} — ZebraTrek Safaris` })
}

export default async function GenericPage({ params }: Params) {
  const { slug } = await params
  const page = await getPage(slug)
  if (!page) notFound()

  return (
    <>
      <section className="pt-40 pb-12">
        <div className="container-narrow">
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-light" style={{ fontFamily: 'var(--font-display)' }}>{page.title}</h1>
        </div>
      </section>
      <section className="pb-20">
        <div className="container-narrow">
          <RichText content={page.body as any} />
        </div>
      </section>
    </>
  )
}
