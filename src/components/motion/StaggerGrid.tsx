'use client'

import { motion } from 'motion/react'
import { ReactNode } from 'react'

export function StaggerGrid({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
