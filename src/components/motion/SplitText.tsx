'use client'

import { motion } from 'motion/react'
import type { ReactNode } from 'react'

type Props = {
  text: string
  className?: string
  delay?: number
  stagger?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

const ease = [0.22, 1, 0.36, 1] as const

export function SplitText({ text, className = '', delay = 0, stagger = 0.05, as = 'h1' }: Props) {
  const words = text.split(' ')
  const Tag = as === 'h1' ? motion.h1 : as === 'h2' ? motion.h2 : as === 'h3' ? motion.h3 : as === 'p' ? motion.p : motion.span

  return (
    <Tag
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      style={{ display: 'inline-block' }}
    >
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'baseline' }}>
          <motion.span
            variants={{
              hidden: { y: '120%', opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.9, ease } },
            }}
            style={{ display: 'inline-block', marginRight: '0.25em' }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
