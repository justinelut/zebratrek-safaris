'use client'

import { motion, useInView, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

type Props = { stats: { value?: string | null; label?: string | null; suffix?: string | null }[] }

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { duration: 2000, bounce: 0 })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (inView) motionValue.set(to)
  }, [inView, to, motionValue])

  useEffect(() => {
    return spring.on('change', (latest) => {
      setDisplay(Math.floor(latest).toLocaleString())
    })
  }, [spring])

  return <span ref={ref}>{display}{suffix}</span>
}

export function Numbers({ stats }: Props) {
  if (!stats?.length) return null
  return (
    <section className="section-pad">
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
              className="text-center"
            >
              <p className="text-[clamp(2.5rem,4vw,3.5rem)] font-light tabular-nums" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
                <CountUp to={parseInt(stat.value || '0')} suffix={stat.suffix || ''} />
              </p>
              <p className="mt-2 text-[0.75rem] tracking-[0.2em] uppercase text-[var(--fg-muted)]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
