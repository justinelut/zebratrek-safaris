import Image from 'next/image'
import { getContactPage, getSiteSettings } from '@/lib/queries'
import { getImageProps } from '@/lib/media'
import { ContactForm } from './ContactForm'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerGrid } from '@/components/motion/StaggerGrid'
import { StaggerItem } from '@/components/motion/StaggerItem'
import type { Media } from '@/payload-types'

export async function generateMetadata() {
  const page = await getContactPage()
  return { title: `${page.headline || 'Contact'} — ZebraTrek Safaris` }
}

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ safari?: string }> }) {
  const params = await searchParams
  const [page, settings] = await Promise.all([getContactPage(), getSiteSettings()])

  const heroImg = getImageProps(page.image as Media)

  return (
    <>
      <section className="relative h-[40vh] min-h-[350px] flex items-end pb-16 overflow-hidden">
        {heroImg.src && <Image src={heroImg.src} alt={heroImg.alt} fill className="object-cover" priority sizes="100vw" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="container-wide relative z-10 text-ivory">
          <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-light" style={{ fontFamily: 'var(--font-display)' }}>{page.headline || 'Get in Touch'}</h1>
          {page.subheadline && <p className="mt-3 text-ivory/70 max-w-xl">{page.subheadline}</p>}
        </div>
      </section>

      <section className="section-pad">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-3 gap-16">
          <FadeIn className="lg:col-span-2">
            <h2 className="text-[1.5rem] font-light mb-2" style={{ fontFamily: 'var(--font-display)' }}>{page.formHeadline || 'Tell us about your dream safari'}</h2>
            {page.formSubheadline && <p className="text-[var(--fg-muted)] mb-8">{page.formSubheadline}</p>}
            <ContactForm
              safariSlug={params.safari}
              successMessage={page.successMessage || 'Thank you! We\'ll be in touch within 24 hours.'}
            />
          </FadeIn>

          <FadeIn delay={0.2}>
            <aside className="space-y-8">
              {page.sidebarHeadline && (
                <div>
                  <h3 className="text-[1.1rem] font-medium mb-3">{page.sidebarHeadline}</h3>
                  {page.sidebarBody && <p className="text-[0.85rem] text-[var(--fg-muted)] leading-relaxed">{page.sidebarBody}</p>}
                </div>
              )}

              {page.trustSignals && page.trustSignals.length > 0 && (
                <StaggerGrid className="space-y-4">
                  {page.trustSignals.map((signal, i) => (
                    <StaggerItem key={i} className="p-4 border border-[var(--border)] rounded-sm">
                      <p className="text-[0.85rem] font-medium">{signal.title}</p>
                      {signal.description && <p className="text-[0.75rem] text-[var(--fg-muted)] mt-1">{signal.description}</p>}
                    </StaggerItem>
                  ))}
                </StaggerGrid>
              )}

              <FadeIn delay={0.4}>
                <div className="p-6 bg-cream dark:bg-[var(--bg-alt)] rounded-sm space-y-3">
                  <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[var(--fg-muted)]">Direct Contact</p>
                  {settings.email && <p className="text-[0.85rem]">{settings.email}</p>}
                  {settings.phone && <p className="text-[0.85rem]">{settings.phone}</p>}
                  {settings.officeAddress && <p className="text-[0.85rem] text-[var(--fg-muted)]">{settings.officeAddress}</p>}
                </div>
              </FadeIn>
            </aside>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
