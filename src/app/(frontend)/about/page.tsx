import Image from 'next/image'
import { getAboutPage, getTeamMembers } from '@/lib/queries'
import { getImageProps } from '@/lib/media'
import { RichText } from '@/components/RichText'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerGrid } from '@/components/motion/StaggerGrid'
import { StaggerItem } from '@/components/motion/StaggerItem'
import type { Media } from '@/payload-types'

export async function generateMetadata() {
  const page = await getAboutPage()
  return { title: `${page.heroHeadline || 'About'} — ZebraTrek Safaris` }
}

export default async function AboutPage() {
  const [page, team] = await Promise.all([getAboutPage(), getTeamMembers()])

  const heroImg = getImageProps(page.heroImage as Media)
  const founderImg = getImageProps(page.founderImage as Media)

  return (
    <>
      <section className="relative h-[50vh] min-h-[400px] flex items-end pb-16 overflow-hidden">
        {heroImg.src && <Image src={heroImg.src} alt={heroImg.alt} fill className="object-cover" priority sizes="100vw" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="container-wide relative z-10 text-ivory">
          <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-light" style={{ fontFamily: 'var(--font-display)' }}>{page.heroHeadline || 'Our Story'}</h1>
          {page.heroSubheadline && <p className="mt-3 text-ivory/70 max-w-xl">{page.heroSubheadline}</p>}
        </div>
      </section>

      {(page.storyHeadline || page.storyBody) && (
        <section className="section-pad">
          <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <span className="eyebrow">Our Story</span>
              <h2 className="mt-4 text-[clamp(1.8rem,3vw,2.5rem)] font-light" style={{ fontFamily: 'var(--font-display)' }}>{page.storyHeadline}</h2>
              {page.storyBody && <div className="mt-6"><RichText content={page.storyBody as any} /></div>}
            </FadeIn>
            {founderImg.src && (
              <FadeIn delay={0.2}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                  <Image src={founderImg.src} alt={founderImg.alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                </div>
              </FadeIn>
            )}
          </div>
        </section>
      )}

      {page.values && page.values.length > 0 && (
        <section className="section-pad bg-cream dark:bg-[var(--bg-alt)]">
          <div className="container-wide">
            <div className="text-center mb-12">
              <span className="eyebrow">Our Values</span>
            </div>
            <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {page.values.map((value, i) => (
                <StaggerItem key={i} className="text-center">
                  <h3 className="text-[1.1rem] font-medium">{value.title}</h3>
                  {value.description && <p className="mt-3 text-[0.85rem] text-[var(--fg-muted)] leading-relaxed">{value.description}</p>}
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </section>
      )}

      {page.events && page.events.length > 0 && (
        <section className="section-pad">
          <div className="container-narrow">
            <h2 className="text-center text-[1.8rem] font-light mb-12" style={{ fontFamily: 'var(--font-display)' }}>Our Journey</h2>
            <StaggerGrid className="space-y-6 border-l-2 border-[var(--accent-warm)] pl-8">
              {page.events.map((event, i) => (
                <StaggerItem key={i}>
                  <span className="text-[0.7rem] tracking-[0.2em] uppercase text-[var(--accent-warm)]">{event.year}</span>
                  <p className="mt-1 text-[0.9rem]">{event.event}</p>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </section>
      )}

      {team.length > 0 && (
        <section className="section-pad bg-cream dark:bg-[var(--bg-alt)]">
          <div className="container-wide">
            <div className="text-center mb-12">
              <span className="eyebrow">The Team</span>
              <h2 className="mt-4 text-[clamp(1.8rem,3vw,2.5rem)] font-light" style={{ fontFamily: 'var(--font-display)' }}>Meet Your Guides</h2>
            </div>
            <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {team.map((member) => {
                const img = getImageProps(member.portrait as Media)
                return (
                  <StaggerItem key={member.id} className="text-center">
                    {img.src && (
                      <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden mb-4">
                        <Image src={img.src} alt={member.name} fill className="object-cover" sizes="160px" />
                      </div>
                    )}
                    <h3 className="text-[1rem] font-medium">{member.name}</h3>
                    <p className="text-[0.8rem] text-[var(--fg-muted)]">{member.role}</p>
                    {member.yearsExperience && <p className="text-[0.7rem] text-[var(--accent-warm)] mt-1">{member.yearsExperience}+ years experience</p>}
                  </StaggerItem>
                )
              })}
            </StaggerGrid>
          </div>
        </section>
      )}

      {page.ctaHeadline && (
        <FadeIn>
          <section className="section-pad">
            <div className="container-narrow text-center">
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-light" style={{ fontFamily: 'var(--font-display)' }}>{page.ctaHeadline}</h2>
              {page.ctaBody && <p className="mt-4 text-[var(--fg-muted)]">{page.ctaBody}</p>}
              {page.ctaLink && (
                <a href={page.ctaLink} className="inline-block mt-8 text-[0.7rem] tracking-[0.25em] uppercase border border-[var(--fg)] px-10 py-4 hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-all duration-500">
                  {page.ctaText || 'Get in Touch'}
                </a>
              )}
            </div>
          </section>
        </FadeIn>
      )}
    </>
  )
}
