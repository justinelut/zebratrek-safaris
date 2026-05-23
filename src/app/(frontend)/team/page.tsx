import Image from 'next/image'
import { getTeamMembers } from '@/lib/queries'
import { getImageProps } from '@/lib/media'
import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerGrid } from '@/components/motion/StaggerGrid'
import { StaggerItem } from '@/components/motion/StaggerItem'
import type { Media } from '@/payload-types'
import type { Metadata } from 'next'

export function generateMetadata(): Metadata {
  return { title: 'Meet The Guides — ZebraTrek Safaris' }
}

export default async function TeamPage() {
  const members = await getTeamMembers()

  const heroMedia = members[0]?.portrait as Media | undefined
  const heroImg = heroMedia ? getImageProps(heroMedia) : null

  return (
    <>
      <section className="relative h-[50vh] min-h-[400px] flex items-end pb-16 overflow-hidden">
        {heroImg?.src && <Image src={heroImg.src} alt={heroImg.alt} fill className="object-cover" priority sizes="100vw" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <FadeIn className="container-wide relative z-10 text-ivory">
          <span className="eyebrow">Our Team</span>
          <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-light mt-2" style={{ fontFamily: 'var(--font-display)' }}>
            Meet Your Guides
          </h1>
        </FadeIn>
      </section>

      <section className="section-pad">
        <div className="container-wide">
          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {members.map((member) => {
              const photo = member.portrait as Media | undefined
              return (
                <StaggerItem key={member.id} className="flex flex-col items-center text-center">
                  {photo && (
                    <div className="rounded-full w-48 h-48 overflow-hidden relative mb-4">
                      <Image {...getImageProps(photo)} alt={member.name} fill className="object-cover" />
                    </div>
                  )}
                  <h2 className="text-xl" style={{ fontFamily: 'var(--font-display)' }}>{member.name}</h2>
                  <p className="eyebrow mt-1">{member.role}</p>
                  {member.speciality && <p className="text-sm text-[var(--fg-muted)] mt-1">{member.speciality}</p>}
                  {member.yearsExperience && <p className="text-sm text-[var(--fg-muted)] mt-1">{member.yearsExperience} years experience</p>}
                  {member.languages && member.languages.length > 0 && (
                    <p className="text-sm text-[var(--fg-muted)] mt-1">
                      {member.languages.map((l: any) => l.language).join(' · ')}
                    </p>
                  )}
                  {member.certifications && member.certifications.length > 0 && (
                    <p className="text-xs text-[var(--accent-warm)] mt-1">
                      {member.certifications.map((c: any) => c.certification).join(' · ')}
                    </p>
                  )}
                  {member.bio && <p className="text-sm text-[var(--fg-muted)] mt-3 max-w-xs">{member.bio}</p>}
                </StaggerItem>
              )
            })}
          </StaggerGrid>
        </div>
      </section>
    </>
  )
}
