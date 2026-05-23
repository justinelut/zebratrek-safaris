'use client'
import Image from 'next/image'
import { motion } from 'motion/react'
import { getImageProps } from '@/lib/media'
import type { TeamMember, Media } from '@/payload-types'

type Props = { headline: string; team: TeamMember[] }

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }
const item = { hidden: { opacity: 0, y: 30, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } } }

export function GuidesPreview({ headline, team }: Props) {
  if (!team?.length) return null
  return (
    <section className="section-pad">
      <div className="container-wide">
        <div className="text-center mb-12">
          <span className="eyebrow">Our Guides</span>
          <h2 className="mt-4 text-[clamp(1.8rem,3vw,2.8rem)] font-light" style={{ fontFamily: 'var(--font-display)' }}>{headline}</h2>
        </div>
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-10" variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
          {team.map((member) => {
            const img = getImageProps(member.portrait as Media)
            return (
              <motion.div key={member.id} className="text-center" variants={item} whileHover={{ y: -4 }}>
                {img.src && (
                  <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden mb-5">
                    <Image src={img.src} alt={member.name} fill className="object-cover" sizes="192px" />
                  </div>
                )}
                <h3 className="text-[1.1rem] font-medium">{member.name}</h3>
                <p className="text-[0.8rem] text-[var(--fg-muted)] mt-1">{member.role}</p>
                {member.speciality && <p className="text-[0.75rem] text-[var(--accent-warm)] mt-1">{member.speciality}</p>}
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
