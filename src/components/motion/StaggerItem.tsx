'use client'

import { motion } from 'motion/react'
import { ReactNode } from 'react'

export function StaggerItem({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
