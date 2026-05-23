import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getJournalPostBySlug } from '@/lib/queries'
import { getImageProps } from '@/lib/media'
import { generatePageMetadata } from '@/lib/seo'
import { RichText } from '@/components/RichText'
import { FadeIn } from '@/components/motion/FadeIn'
import type { Media, User } from '@/payload-types'

type Params = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params) {
  const { slug } = await params
  const post = await getJournalPostBySlug(slug)
  if (!post) return {}
  return generatePageMetadata(post as any, { title: `${post.title} — ZebraTrek Safaris`, description: post.summary || '' })
}

export default async function JournalPostPage({ params }: Params) {
  const { slug } = await params
  const post = await getJournalPostBySlug(slug)
  if (!post) notFound()

  const heroImg = getImageProps(post.heroImage as Media)
  const author = typeof post.author === 'object' ? (post.author as User) : null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.summary,
    image: heroImg.src,
    datePublished: post.publishedAt,
    author: author ? { '@type': 'Person', name: author.email } : undefined,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative h-[60vh] min-h-[500px] flex items-end pb-16 overflow-hidden">
        {heroImg.src && <Image src={heroImg.src} alt={heroImg.alt} fill className="object-cover" priority sizes="100vw" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="container-narrow relative z-10 text-ivory">
          <p className="eyebrow text-ivory/60">{post.category}</p>
          <h1 className="mt-3 text-[clamp(2.2rem,5vw,4rem)] font-light" style={{ fontFamily: 'var(--font-display)' }}>{post.title}</h1>
          <div className="mt-6 flex flex-wrap gap-6 text-[0.8rem] text-ivory/60">
            {author?.email && <span>By {author.email}</span>}
            {post.publishedAt && <span>{new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(post.publishedAt))}</span>}
            {post.readTime && <span>{post.readTime} min read</span>}
          </div>
        </div>
      </section>

      <section className="section-pad bg-cream dark:bg-[var(--bg-alt)]">
        <div className="container-narrow max-w-prose mx-auto">
          <FadeIn>
            {post.body && <RichText content={post.body as any} />}
          </FadeIn>
          <div className="mt-16 pt-8 border-t border-[var(--border)]">
            <Link href="/journal" className="text-[0.75rem] tracking-[0.15em] uppercase text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors">
              ← Back to Journal
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
