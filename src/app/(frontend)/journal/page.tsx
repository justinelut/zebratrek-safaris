import Image from 'next/image'
import Link from 'next/link'
import { getJournalPage, getJournalPosts } from '@/lib/queries'
import { getImageProps } from '@/lib/media'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerGrid } from '@/components/motion/StaggerGrid'
import { StaggerItem } from '@/components/motion/StaggerItem'
import type { Media } from '@/payload-types'

export async function generateMetadata() {
  const page = await getJournalPage()
  return { title: `${page.hero?.headline || 'Journal'} — ZebraTrek Safaris` }
}

const categories = ['Wildlife', 'Travel Tips', 'Conservation', 'Behind the Scenes', 'Guest Stories']

export default async function JournalPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const params = await searchParams
  const [page, { docs: posts }] = await Promise.all([
    getJournalPage(),
    getJournalPosts({ category: params.category }),
  ])

  const heroImg = getImageProps(page.hero?.image as Media)
  const featured = posts[0]
  const remaining = posts.slice(1)

  return (
    <>
      <section className="relative h-[50vh] min-h-[400px] flex items-end pb-16 overflow-hidden">
        {heroImg.src && <Image src={heroImg.src} alt={heroImg.alt} fill className="object-cover" priority sizes="100vw" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="container-wide relative z-10 text-ivory">
          <p className="eyebrow text-ivory/60">Journal</p>
          <h1 className="mt-3 text-[clamp(2rem,4vw,3.5rem)] font-light" style={{ fontFamily: 'var(--font-display)' }}>
            {page.hero?.headline || 'Journal'}
          </h1>
          {page.hero?.subheadline && <p className="mt-3 text-ivory/70 max-w-xl">{page.hero.subheadline}</p>}
        </div>
      </section>

      <section className="section-pad bg-cream dark:bg-[var(--bg-alt)]">
        <div className="container-wide">
          <div className="flex flex-wrap gap-3 mb-12">
            <Link href="/journal" className={`text-[0.7rem] tracking-[0.15em] uppercase px-4 py-2 border rounded-sm transition-colors ${!params.category ? 'bg-[var(--fg)] text-[var(--bg)]' : 'border-[var(--border)] hover:border-[var(--fg)]'}`}>
              All
            </Link>
            {categories.map((cat) => (
              <Link key={cat} href={`/journal?category=${encodeURIComponent(cat)}`} className={`text-[0.7rem] tracking-[0.15em] uppercase px-4 py-2 border rounded-sm transition-colors ${params.category === cat ? 'bg-[var(--fg)] text-[var(--bg)]' : 'border-[var(--border)] hover:border-[var(--fg)]'}`}>
                {cat}
              </Link>
            ))}
          </div>

          {posts.length === 0 ? (
            <p className="text-center text-[var(--fg-muted)] py-20">No posts found for this category.</p>
          ) : (
            <>
              {featured && (() => {
                const img = getImageProps(featured.heroImage as Media)
                return (
                  <FadeIn className="mb-16">
                    <Link href={`/journal/${featured.slug}`} className="group block">
                      <div className="relative aspect-[21/9] overflow-hidden rounded-sm">
                        {img.src && <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="100vw" />}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-8 text-ivory max-w-2xl">
                          <p className="eyebrow text-ivory/60">{featured.category}</p>
                          <h2 className="mt-2 text-[clamp(1.4rem,3vw,2.2rem)] font-light" style={{ fontFamily: 'var(--font-display)' }}>{featured.title}</h2>
                          {featured.summary && <p className="mt-2 text-[0.9rem] text-ivory/70 line-clamp-2">{featured.summary}</p>}
                          <div className="mt-3 flex gap-4 text-[0.75rem] text-ivory/50">
                            {featured.publishedAt && <span>{new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(featured.publishedAt))}</span>}
                            {featured.readTime && <span>{featured.readTime} min read</span>}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </FadeIn>
                )
              })()}

              {remaining.length > 0 && (
                <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {remaining.map((post) => {
                    const img = getImageProps(post.heroImage as Media)
                    return (
                      <StaggerItem key={post.id}>
                        <Link href={`/journal/${post.slug}`} className="group block">
                          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                            {img.src && <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 33vw" />}
                          </div>
                          <div className="mt-4">
                            <p className="eyebrow text-[var(--accent-warm)]">{post.category}</p>
                            <h3 className="mt-1 text-[1.2rem] font-light" style={{ fontFamily: 'var(--font-display)' }}>{post.title}</h3>
                            {post.summary && <p className="mt-2 text-[0.85rem] text-[var(--fg-muted)] line-clamp-2">{post.summary}</p>}
                            <div className="mt-2 flex gap-4 text-[0.75rem] text-[var(--fg-muted)]">
                              {post.publishedAt && <span>{new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(post.publishedAt))}</span>}
                              {post.readTime && <span>{post.readTime} min read</span>}
                            </div>
                          </div>
                        </Link>
                      </StaggerItem>
                    )
                  })}
                </StaggerGrid>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
