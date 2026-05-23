import { getFAQPage } from '@/lib/queries'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerGrid } from '@/components/motion/StaggerGrid'
import { StaggerItem } from '@/components/motion/StaggerItem'

export async function generateMetadata() {
  const page = await getFAQPage()
  return { title: `${page.hero?.headline || 'FAQ'} — ZebraTrek Safaris` }
}

export default async function FAQPage() {
  const page = await getFAQPage()

  return (
    <>
      <section className="section-pad">
        <div className="container-narrow text-center">
          <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-light" style={{ fontFamily: 'var(--font-display)' }}>{page.hero?.headline || 'Frequently Asked Questions'}</h1>
          {page.hero?.subheadline && <p className="mt-4 text-[var(--fg-muted)] max-w-xl mx-auto">{page.hero.subheadline}</p>}
        </div>
      </section>

      {page.categories && page.categories.length > 0 && (
        <section className="section-pad pt-0">
          <div className="container-narrow space-y-12">
            {page.categories.map((cat, i) => (
              <FadeIn key={cat.id || i}>
                <h2 className="text-[1.2rem] font-light mb-6" style={{ fontFamily: 'var(--font-display)' }}>{cat.name}</h2>
                <StaggerGrid className="space-y-3">
                  {cat.questions?.map((q, j) => (
                    <StaggerItem key={q.id || j}>
                      <details className="group border-b border-[var(--fg)]/10 pb-3">
                        <summary className="cursor-pointer text-[0.9rem] font-medium py-2 list-none flex items-center justify-between">
                          {q.question}
                          <span className="text-[var(--accent-warm)] ml-4 group-open:rotate-45 transition-transform duration-300 text-[1.2rem]">+</span>
                        </summary>
                        <p className="mt-2 text-[0.85rem] text-[var(--fg-muted)] leading-relaxed pb-2">{q.answer}</p>
                      </details>
                    </StaggerItem>
                  ))}
                </StaggerGrid>
              </FadeIn>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
