'use client'

import { motion, useMotionValue, useSpring } from 'motion/react'
import { useRef, type ReactNode, type MouseEvent } from 'react'
import Link from 'next/link'

type Props = {
  href?: string
  onClick?: () => void
  children: ReactNode
  className?: string
  strength?: number
  innerStrength?: number
}

export function MagneticButton({ href, onClick, children, className = '', strength = 0.4, innerStrength = 0.2 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const innerX = useMotionValue(0)
  const innerY = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 200, damping: 20, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 200, damping: 20, mass: 0.5 })
  const innerSpringX = useSpring(innerX, { stiffness: 250, damping: 15, mass: 0.5 })
  const innerSpringY = useSpring(innerY, { stiffness: 250, damping: 15, mass: 0.5 })

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const offsetX = e.clientX - rect.left - rect.width / 2
    const offsetY = e.clientY - rect.top - rect.height / 2
    x.set(offsetX * strength)
    y.set(offsetY * strength)
    innerX.set(offsetX * innerStrength)
    innerY.set(offsetY * innerStrength)
  }

  const handleMouseLeave = () => {
    x.set(0); y.set(0); innerX.set(0); innerY.set(0)
  }

  const inner = (
    <motion.div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ x: springX, y: springY }} className="inline-block">
      <motion.span style={{ x: innerSpringX, y: innerSpringY, display: 'inline-block' }}>
        {children}
      </motion.span>
    </motion.div>
  )

  if (href) return <Link href={href} className={className}>{inner}</Link>
  return <button onClick={onClick} className={className}>{inner}</button>
}
