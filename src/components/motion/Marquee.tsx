'use client'

import { motion } from 'motion/react'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  speed?: number
  reverse?: boolean
  className?: string
}

export function Marquee({ children, speed = 40, reverse = false, className = '' }: Props) {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-flex gap-12 will-change-transform"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
      >
        {/* duplicate children for seamless loop */}
        <div className="inline-flex gap-12 shrink-0">{children}</div>
        <div className="inline-flex gap-12 shrink-0" aria-hidden="true">{children}</div>
      </motion.div>
    </div>
  )
}
